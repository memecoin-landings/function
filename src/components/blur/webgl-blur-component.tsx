"use client"

import React, { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { domToCanvas } from 'modern-screenshot';
import initWebGL from './webgl-utils';
import { AnimatableObject, createAnimatable } from 'animejs';

interface MousePosition {
  x: number;
  y: number;
}

interface BlurParams {
  blurRadius?: number;
  blurOffset?: number;
  mouseRadius?: number;
  effectPower?: number;
  centerPoint?: number;
}

function WebGLBlurEffect({
  children,
  className,
  blurRadius = 20.0,
  blurOffset = 0.8,
  mouseRadius = 0.75,
  effectPower = 0.82,
  centerPoint = 0.5
}: {
  children: React.ReactNode,
  className?: string
} & BlurParams) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const mouseRef = useRef<MousePosition>({ x: -1000, y: -1000 });
  const animationIdRef = useRef<number | null>(null);


  function blockToCanvas(block: HTMLElement): Promise<HTMLCanvasElement> {
    return domToCanvas(block, {
      width: block.offsetWidth,
      height: block.offsetHeight,
      scale: window.devicePixelRatio,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        width: block.offsetWidth + 'px',
        height: block.offsetHeight + 'px'
      },
    });
  }

  function hideContent() {
    contentRef.current?.classList.add("hide-children-except-last")
  }

  function showContent() {
    contentRef.current?.classList.remove("hide-children-except-last")
  }

  async function captureContent(): Promise<void> {
    if (!contentRef.current) return console.error('Content reference is null');

    try {
      console.log('Starting html2canvas capture...');
      const glCanvas = canvasRef.current;
      const gl = glRef.current;

      if (!gl || !glCanvas) {
        console.error('WebGL context not ready');
        return;
      }

      if (!contentRef.current) {
        console.error('Content reference is null');
        return;
      }
      const htmlCanvas = await blockToCanvas(contentRef.current);
      console.log('html2canvas capture successful:', htmlCanvas.width, 'x', htmlCanvas.height);
      hideContent();

      // Replace with HTML captured content in WebGL
      glCanvas.width = htmlCanvas.width;
      glCanvas.height = htmlCanvas.height;
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, htmlCanvas);

      startAnimation();

    } catch (error) {
      console.error('Error in captureContent:', error);
    }
  }

  const draw = useCallback((time: number): void => {
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
    const uBlurRadiusLoc = gl.getUniformLocation(program, 'uBlurRadius');
    const uBlurOffsetLoc = gl.getUniformLocation(program, 'uBlurOffset');
    const uMouseRadiusLoc = gl.getUniformLocation(program, 'uMouseRadius');
    const uEffectPowerLoc = gl.getUniformLocation(program, 'uEffectPower');
    const uCenterPointLoc = gl.getUniformLocation(program, 'uCenterPoint');

    gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
    // console.log(mouseRef.current)
    if (mouseRef.current)
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
    gl.uniform1f(uAlphaLoc, 1.0);
    gl.uniform1f(uTimeLoc, time * 0.001);
    gl.uniform1f(uBlurRadiusLoc, blurRadius);
    gl.uniform1f(uBlurOffsetLoc, blurOffset);
    gl.uniform1f(uMouseRadiusLoc, mouseRadius);
    gl.uniform1f(uEffectPowerLoc, effectPower);
    gl.uniform1f(uCenterPointLoc, centerPoint);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animationIdRef.current = requestAnimationFrame(draw);
  }, [blurRadius, blurOffset, mouseRadius, effectPower, centerPoint]);

  const startAnimation = useCallback((): void => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    animationIdRef.current = requestAnimationFrame(draw);
  }, [draw]);

  let animatableMouse: AnimatableObject;

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>): void {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    const newX = (e.clientX - rect.left) * window.devicePixelRatio;
    const newY = (e.clientY - rect.top) * window.devicePixelRatio;

    if (!animatableMouse) {
      mouseRef.current = { x: newX, y: newY }
      animatableMouse = createAnimatable(mouseRef.current, {
        x: 750,
        y: 750,
        ease: 'out(5)',
      });
    }
    if (!canvas || !animatableMouse['x'] || !animatableMouse['y']) return;

    // console.log('Mouse move:', e.clientX, e.clientY, 'Canvas rect:', rect.left, rect.top, rect.width, rect.height, "position: ", newX, newY);
    animatableMouse['x'](newX)
    animatableMouse['y'](newY)
  }

  // Пока так но по моему стоит оптимизировать и дебаунсить ресайз
  function handleResize(): void {
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!canvas || !content) return;

    canvas.width = content.offsetWidth * window.devicePixelRatio;
    canvas.height = content.offsetHeight * window.devicePixelRatio;
    hideContent()
    captureContent();
    showContent();

    // Update WebGL viewport
    const gl = glRef.current;
    if (gl) {
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
  }

  useEffect(() => {
    async function initializeEffect(): Promise<void> {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('Canvas reference is null');
        return;
      }
      if (!initWebGL(canvas, glRef, programRef, textureRef)) {
        console.error('Failed to initialize WebGL');
      }
      // Small delay to ensure content is rendered
      // setTimeout(captureContent, 100);
      captureContent();
      // handleMouseMove()
    }
    window.addEventListener('resize', handleResize);

    initializeEffect();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  // Перезапускаем анимацию при изменении параметров блюра
  useEffect(() => {
    if (glRef.current && programRef.current) {
      startAnimation();
    }
  }, [blurRadius, blurOffset, mouseRadius, effectPower, centerPoint]);

  return (
    <div ref={contentRef} className={cn("relative", className)}>
      {children}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="rotate-x-180 absolute top-0 left-0 right-0 h-full w-full max-w-full max-h-full"
      />
    </div>
  );
}

export default WebGLBlurEffect;
