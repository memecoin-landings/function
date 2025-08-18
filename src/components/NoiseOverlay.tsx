import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface NoiseOverlayProps {
  children: ReactNode;
  className?: string;
}

interface WebGLRefs {
  gl: WebGLRenderingContext | null;
  program: WebGLProgram | null;
  animationId: number | null;
  startTime: number;
  currentMouse?: MousePosition;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function NoiseOverlay({ children, className = '' }: NoiseOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const webglRefs = useRef<WebGLRefs>({
    gl: null,
    program: null,
    animationId: null,
    startTime: Date.now(),
    currentMouse: { x: 0.5, y: 0.5 },
  });

  const vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 v_texCoord;
    
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = (a_position + 1.0) / 2.0;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    varying vec2 v_texCoord;
    
    float random(vec3 scale, float seed) {
      return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
    }
    
    // Generate procedural background instead of texture sampling
    vec4 sampleBackground(vec2 uv) {
      // Navy to black gradient
      vec3 gradientTop = vec3(0.0, 0.0, 0.2); // #000033
      vec3 gradientBottom = vec3(0.0, 0.0, 0.067); // #000011
      vec3 gradient = mix(gradientBottom, gradientTop, uv.y);
      
      // Add subtle noise texture
      float noise = random(vec3(uv * 200.0, u_time * 0.001), 0.0);
      gradient += noise * 0.015;
      
      return vec4(gradient, 1.0);
    }
    
    vec4 boxBlur(vec2 uv, vec2 delta) {
      vec4 color = vec4(0);
      float total = 0.;
      float offset = random(vec3(12.9898, 78.233, 151.7182), 0.);
      
      for (float t = -20.; t <= 20.; t++) {
        float percent = (t + offset - .8) / 20.;
        float weight = 1. - abs(percent);
        vec4 bsample = sampleBackground(uv + delta * percent);
        bsample.xyz *= bsample.w;
        color += bsample * weight;
        total += weight;
      }
      
      color /= total;
      color.xyz /= color.w + 1e-5;
      return color;
    }
    
    void main() {
      // Exact implementation from reference
      vec2 st = (gl_FragCoord.xy - .5 * u_resolution) / min(u_resolution.x, u_resolution.y);
      vec2 mouse = (u_mouse * u_resolution - .5 * u_resolution) / min(u_resolution.x, u_resolution.y);
      
      vec4 bBox = boxBlur(v_texCoord, vec2((mouse - st) * pow(clamp(.5 - length(st - mouse) / .5, 0., 1.), .82)));
      
      // Apply effect with subtle opacity
      float distanceFromMouse = length(st - mouse);
      float effectStrength = pow(clamp(.5 - distanceFromMouse / .5, 0., 1.), .82);
      float alpha = effectStrength * 0.25; // 0-25% opacity based on distance from cursor
      
      gl_FragColor = vec4(bBox.rgb, alpha);
    }
  `;

  const createShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) {
      console.error('Failed to create shader');
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
  };

  const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null => {
    const program = gl.createProgram();
    if (!program) {
      console.error('Failed to create program');
      return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  };

  const initWebGL = (): boolean => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas ref not available');
      return false;
    }

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return false;
    }

    webglRefs.current.gl = gl;

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return false;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return false;

    webglRefs.current.program = program;

    // Set up vertex buffer for full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Clear to transparent
    gl.clearColor(0, 0, 0, 0);

    return true;
  };

  const resizeCanvas = (): void => {
    const canvas = canvasRef.current;
    const gl = webglRefs.current.gl;

    if (!canvas || !gl) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const animate = (): void => {
    const gl = webglRefs.current.gl;
    const program = webglRefs.current.program;

    if (!gl || !program) return;

    const currentTime = Date.now() - webglRefs.current.startTime;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    // Set uniforms
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    if (timeLocation) gl.uniform1f(timeLocation, currentTime);
    if (resolutionLocation) gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    if (mouseLocation) {
      // Get current mouse position from ref instead of stale closure
      const currentMouse = webglRefs.current.currentMouse || { x: 0.5, y: 0.5 };
      gl.uniform2f(mouseLocation, currentMouse.x, currentMouse.y);
      console.log('Uniforms set:', { resolution: [gl.canvas.width, gl.canvas.height], mouse: [currentMouse.x, currentMouse.y] });
    }

    // Draw full-screen quad
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    webglRefs.current.animationId = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const success = initWebGL();
    if (success) {
      resizeCanvas();
      animate();
    }

    const handleResize = (): void => resizeCanvas();

    const handleMouseMove = (event: MouseEvent): void => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1.0 - (event.clientY - rect.top) / rect.height; // Flip Y for WebGL coords

      // console.log('Mouse updated:', { x, y, event: { clientX: event.clientX, clientY: event.clientY } });
      // Update both state and ref for immediate access in animation loop
      setMousePos({ x, y });
      webglRefs.current.currentMouse = { x, y };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (webglRefs.current.animationId) {
        cancelAnimationFrame(webglRefs.current.animationId);
      }
    };
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    const parentElement = canvasRef.current?.parentElement;
    if (parentElement) {
      resizeObserver.observe(parentElement);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className={`relative ${className}`}>
      {children}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    </div>
  );
}
