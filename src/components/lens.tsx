import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

const vertexShaderSrc = `
  attribute vec2 aPos;
  varying vec2 vUv;
  void main() {
    vUv = (aPos + 1.0) * 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`;

const fragmentShaderSrc = `
  precision mediump float;
  uniform sampler2D uTex;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 d = uv - uMouse;
    float dist = length(d);

    if(dist < 0.2) {
      uv += d * 0.2; // distortion effect
    }

    gl_FragColor = texture2D(uTex, uv);
  }
`;

function compileShader(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

function createProgram(gl, vsSrc, fsSrc) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program));
  }
  return program;
}

export default function LensWrapper({ children }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const [glState, setGlState] = useState(null);
  const mouseRef = useRef([0.5, 0.5]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
    const gl = canvas.getContext("webgl");

    const program = createProgram(gl, vertexShaderSrc, fragmentShaderSrc);
    gl.useProgram(program);

    const posLoc = gl.getAttribLocation(program, "aPos");
    const mouseLoc = gl.getUniformLocation(program, "uMouse");

    const quad = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    function updateTexture(image) {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    }

    html2canvas(wrapper).then(capture => {
      updateTexture(capture);
    });

    function render() {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2fv(mouseLoc, mouseRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }

    render();

    setGlState({ gl, updateTexture });
  }, []);

  useEffect(() => {
    const handleMouse = e => {
      const rect = wrapperRef.current.getBoundingClientRect();
      mouseRef.current = [
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      ];
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative", display: "inline-block" }}>
      <div>{children}</div>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      />
    </div>
  );
}

// Example usage:
//
// function App() {
//   return (
//     <LensWrapper>
//       <div style={{ padding: 40, background: "#fafafa", borderRadius: 10 }}>
//         <h1>Header Text</h1>
//         <h2>Subheader Text</h2>
//         <p>This is some paragraph text that will be distorted by a lens effect.</p>
//       </div>
//     </LensWrapper>
//   );
// }
