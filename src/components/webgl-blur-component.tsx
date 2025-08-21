"use client"

import { toCanvas } from 'html-to-image';
import html2canvas from 'html2canvas';
import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import domtoimage from 'dom-to-image';
import { domToCanvas } from 'modern-screenshot';

interface MousePosition {
  x: number;
  y: number;
}

function WebGLBlurEffect({ children, className }: { children: React.ReactNode, className?: string },) {
  const [imageUrl, setImageUrl] = React.useState<string>("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAAC3b1YQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAGdEVYdFNvZnR3YXJlAFBhaW50Lk5ldHdvcmtzIFZlcnNpb24gMy4xLjAsIGh0dHA6Ly9wYWludC5uZXQvAAB2aUlEQVR4nO3dX2hcVZ3H8e+7p");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const mouseRef = useRef<MousePosition>({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef<number | null>(null);

  const vsSource = `
    attribute vec2 aPos;
    attribute vec2 aUV;
    varying vec2 vTextureCoord;
    void main() {
      vTextureCoord = aUV;
      gl_Position = vec4(aPos, 0.0, 1.0);
    }
  `;

  const fsSource = `
    precision mediump float;
    varying vec2 vTextureCoord;
    uniform float uTime;
    uniform float uAlpha;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform sampler2D uTex;

    float random(vec3 scale,float seed){
      return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);
    }

    vec4 boxBlur(sampler2D tex,vec2 uv,vec2 delta){
      vec4 color=vec4(0.0);
      float total=0.0;
      float offset=random(vec3(12.9898,78.233,151.7182),0.0);
      for(float t=-20.0;t<=20.0;t++){
        float percent=(t+offset-0.8)/20.0;
        float weight=1.0-abs(percent);
        vec4 bsample=texture2D(tex,uv+delta*percent);
        bsample.xyz*=bsample.w;
        color+=bsample*weight;
        total+=weight;
      }
      color/=total;
      color.xyz/=color.w+1e-5;
      return uAlpha*color;
    }

    void main(){
      vec2 st=(gl_FragCoord.xy-0.5*uResolution)/min(uResolution.x,uResolution.y);
      vec2 mouse=(uMouse-0.5*uResolution)/min(uResolution.x,uResolution.y);
      vec2 delta=(mouse-st)*pow(clamp(0.5-length(st-mouse)/0.5,0.0,1.0),0.82);
      vec4 bBox=boxBlur(uTex,vTextureCoord,delta);
      gl_FragColor=bBox;
    }
  `;

  function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) {
      console.error('Unable to create shader');
      return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function initWebGL(): boolean {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl');

    if (!gl || !canvas) {
      console.error('WebGL not supported or canvas is null', gl, canvas);
      return false;
    }

    glRef.current = gl;

    // Create and link shader program
    const program = gl.createProgram();
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader || !program) {
      console.error('Shader creation failed');
      return false;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return false;
    }

    gl.useProgram(program);
    programRef.current = program;

    // Create position buffer
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Create UV buffer
    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 0, 1, 0, 0, 1,
      0, 1, 1, 0, 1, 1
    ]), gl.STATIC_DRAW);

    const aUV = gl.getAttribLocation(program, 'aUV');
    gl.enableVertexAttribArray(aUV);
    gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);

    // Create texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    textureRef.current = texture;

    return true;
  }

  function blockToCanvas1(block: HTMLElement): Promise<HTMLCanvasElement> {
    return html2canvas(block, {
      height: block.clientHeight, width: block.clientWidth,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight
    })
  }
  function blockToCanvas2(block: HTMLElement): Promise<HTMLCanvasElement> {
    return toCanvas(block, {
      // backgroundColor: '#your-bg-color',
      pixelRatio: window.devicePixelRatio, // Для четкости на Retina
      cacheBust: true, // Обновить кэш изображений
      skipFonts: false, // Включить все шрифты
      includeQueryParams: true,
      skipAutoScale: false,
      width: block.offsetWidth, // Точная ширина
      height: block.offsetHeight, // Точная высота
      style: {
        transform: 'scale(1)', // Без масштабирования
        transformOrigin: 'top left'
      }
    });
  }
  function blockToCanvas3(block: HTMLElement) {
    return domtoimage.toPixelData(block, {
      bgcolor: '#your-bg-color',
      width: block.offsetWidth,
      height: block.offsetHeight,
      style: {
        'transform': 'scale(1)',
        'transform-origin': 'top left'
      },
      quality: 1.0, // Максимальное качество
      imagePlaceholder: undefined, // Не заменять изображения
      cacheBust: true
    });
  }
  function blockToCanvas4(block: HTMLElement): Promise<HTMLCanvasElement> {
    return domToCanvas(block, {
      backgroundColor: '#your-bg-color',
      width: block.offsetWidth,
      height: block.offsetHeight,
      scale: window.devicePixelRatio,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        width: block.offsetWidth + 'px',
        height: block.offsetHeight + 'px'
      },
      // includeStyleProperties: ['transform', 'opacity', 'filter']
    });
  }

  async function captureContent(): Promise<void> {
    if (!contentRef.current) return console.error('Content reference is null');

    try {
      // Test html2canvas first
      console.log('Starting html2canvas capture...');
      const glCanvas = canvasRef.current;
      const gl = glRef.current;

      if (!gl || !glCanvas) {
        console.error('WebGL context not ready');
        return;
      }

      console.log('Using test canvas for now...');
      glCanvas.width = contentRef.current.getBoundingClientRect().width;
      glCanvas.height = contentRef.current.getBoundingClientRect().height;

      gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
      // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, testCanvas);

      console.log('Texture loaded successfully, starting animation...');
      startAnimation();

      // Now try html2canvas in the background and log the result
      setTimeout(async () => {
        try {
          console.log('html2canvas loaded:', html2canvas, contentRef.current);

          if (!contentRef.current) {
            console.error('Content reference is null');
            return;
          }
          // const url = block(contentRef.current);
          const htmlCanvas = await blockToCanvas4(contentRef.current);
          console.log('html2canvas capture successful:', htmlCanvas.width, 'x', htmlCanvas.height);
          setImageUrl(htmlCanvas.toDataURL());
          contentRef.current.children[0]?.classList.add("opacity-0")

          // Replace with HTML captured content in WebGL
          glCanvas.width = htmlCanvas.width;
          glCanvas.height = htmlCanvas.height;
          glCanvas.classList.remove("hidden")
          gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, htmlCanvas);
          console.log('Switched to html2canvas texture');

        } catch (htmlError) {
          console.error('html2canvas failed:', htmlError);
        }
      }, 1000);

    } catch (error) {
      console.error('Error in captureContent:', error);
    }
  }

  function draw(time: number): void {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;

    if (!gl || !program || !canvas) return;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set uniforms
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uAlphaLoc = gl.getUniformLocation(program, 'uAlpha');
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');

    gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
    gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
    gl.uniform1f(uAlphaLoc, 1.0);
    gl.uniform1f(uTimeLoc, time * 0.001);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animationIdRef.current = requestAnimationFrame(draw);
  }

  function startAnimation(): void {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    animationIdRef.current = requestAnimationFrame(draw);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>): void {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    console.log('Mouse move:', e.clientX, e.clientY, 'Canvas rect:', rect.left, rect.top);
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top; // flip Y coordinate
  }

  useEffect(() => {
    async function initializeEffect(): Promise<void> {
      if (initWebGL()) {
        // Small delay to ensure content is rendered
        setTimeout(captureContent, 100);
      }
    }

    initializeEffect();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  // if (React.isValidElement(children)) {
  //   children = React.cloneElement(children, { ref: contentRef });
  // }
  //
  // // Если children — массив
  // if (Array.isArray(children)) {
  //   children = React.Children.map(children, (child, index) =>
  //     index === 0 && React.isValidElement(child)
  //       ? React.cloneElement(child, { ref: contentRef })
  //       : child
  //   )
  // };


  return (
    // <div className={cn("relative", className)}>
    <div ref={contentRef} className={cn("relative", className)}>
      {children}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="rotate-x-180 absolute top-0 left-0 right-0 h-full z-100 w-full max-w-full max-h-full hidden"
      />
      {/* <img src={imageUrl} className="hidden" /> */}
    </div>
  );
  // return (
  //   <>{children}</>
  // )
}

export default WebGLBlurEffect;
