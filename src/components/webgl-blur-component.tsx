import html2canvas from 'html2canvas';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface MousePosition {
  x: number;
  y: number;
}

function WebGLBlurEffect() {
  const [imageSrc, setImageSrc] = React.useState<string>("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAAA10dzkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAEAAElEQVR4nOzdd3hU1f8H8M+Z2Z2Z");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const mouseRef = useRef<MousePosition>({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef<number | null>(null);
  const capturedImageRef = useRef<HTMLImageElement>(null);

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
      console.error('WebGL not supported');
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

  async function captureContent(): Promise<void> {
    if (!contentRef.current) return;

    try {
      // Test html2canvas first
      console.log('Starting html2canvas capture...');

      // Create a simple test canvas first
      const testCanvas = document.createElement('canvas');
      testCanvas.width = 400;
      testCanvas.height = 300;
      const ctx = testCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, 400, 300);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(50, 50, 300, 200);
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.fillText('Test Canvas', 150, 150);
      }

      // First test: try to capture using the test canvas
      const glCanvas = canvasRef.current;
      const gl = glRef.current;

      if (!gl || !glCanvas) {
        console.error('WebGL context not ready');
        return;
      }

      console.log('Using test canvas for now...');
      glCanvas.width = testCanvas.width;
      glCanvas.height = testCanvas.height;

      gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, testCanvas);

      console.log('Texture loaded successfully, starting animation...');
      startAnimation();

      // Now try html2canvas in the background and log the result
      setTimeout(async () => {
        try {
          console.log('html2canvas loaded:', html2canvas, contentRef.current);

          // const htmlCanvas = await html2canvas(contentRef.current);
          const htmlCanvas = await html2canvas(document.querySelector("#home-hero")! as HTMLElement, { backgroundColor: "#151516" });
          console.log('html2canvas capture successful:', htmlCanvas.width, 'x', htmlCanvas.height);

          // Show the captured image
          setImageSrc(htmlCanvas.toDataURL());

          // Replace with HTML captured content in WebGL
          glCanvas.width = htmlCanvas.width;
          glCanvas.height = htmlCanvas.height;
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

  return (
    <div className="flex flex-col items-center p-10 gap-10 bg-gray-900 min-h-screen text-white font-sans">
      <div
        ref={contentRef}
        className="bg-gray-800 p-10 w-3/5 rounded-lg"
      >
        <h1 className="text-3xl font-bold mb-4">Hello WebGL React Component!</h1>
        <h2 className="text-2xl mb-4">Interactive Blur Effect</h2>
        <p className="text-lg leading-relaxed">
          This React component recreates the WebGL blur shader effect.
          Move your mouse over the canvas below to see the interactive radial blur in action.
          The effect creates a beautiful "magnetic" blur that follows your cursor!
        </p>
        <div className="mt-6 p-4 bg-gray-700 rounded">
          <h3 className="text-xl mb-2">Features:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Real-time WebGL rendering</li>
            <li>Mouse-interactive blur effect</li>
            <li>Smooth radial falloff</li>
            <li>Canvas capture of HTML content</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-10 items-start">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg">WebGL Blur Effect</h3>
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            className="border border-gray-500 rounded-lg block cursor-none rotate-x-180"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg">Original html2canvas Capture</h3>
          {/* <Image */}
          {/*   src={imageSrc} */}
          {/*   fill */}
          {/*   objectFit='contain' */}
          {/*   // width={400} */}
          {/*   // height={300} */}
          {/*   ref={capturedImageRef} */}
          {/*   className="border border-gray-500 rounded-lg" */}
          {/*   // style={{ maxWidth: '100%', height: 'auto' }} */}
          {/*   alt="Captured content" */}
          {/* /> */}
        </div>
      </div>

      <div className="text-sm text-gray-400">
        Check the browser console for html2canvas debugging info
      </div>
    </div>
  );
}

export default WebGLBlurEffect;
