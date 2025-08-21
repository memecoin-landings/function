import { RefObject } from "react";
import { compileShader, fsSource, vsSource } from "./shaders";

export default function initWebGL(
  canvas: HTMLCanvasElement,
  glRef: RefObject<WebGLRenderingContext | null>,
  programRef: RefObject<WebGLProgram | null>,
  textureRef: RefObject<WebGLTexture | null>,
): boolean {
  const gl = canvas?.getContext("webgl");

  if (!gl || !canvas) {
    console.error("WebGL not supported or canvas is null", gl, canvas);
    return false;
  }

  // Create and link shader program
  const program = gl.createProgram();
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if (!vertexShader || !fragmentShader || !program) {
    console.error("Shader creation failed");
    return false;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program linking error:", gl.getProgramInfoLog(program));
    return false;
  }

  gl.useProgram(program);

  // Create position buffer
  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // Create UV buffer
  const uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
    gl.STATIC_DRAW,
  );

  const aUV = gl.getAttribLocation(program, "aUV");
  gl.enableVertexAttribArray(aUV);
  gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);

  // Create texture
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  glRef.current = gl;
  programRef.current = program;
  textureRef.current = texture;
  return true;
}
