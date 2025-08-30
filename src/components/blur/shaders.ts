export function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    console.error("Unable to create shader");
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
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
    uniform float uBlurRadius;
    uniform float uBlurOffset;
    uniform float uMouseRadius;
    uniform float uEffectPower;
    uniform float uCenterPoint;

    float random(vec3 scale,float seed){
      return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);
    }

    vec4 boxBlur(sampler2D tex,vec2 uv,vec2 delta){
      vec4 color=vec4(0.0);
      float total=0.0;
      float offset=random(vec3(12.9898,78.233,151.7182),0.0);
      
      // Используем константный максимум для цикла
      for(float t=-50.0;t<=50.0;t++){
        // Пропускаем итерации за пределами нужного радиуса
        if(abs(t) > uBlurRadius) continue;
        
        float percent=(t+offset-uBlurOffset)/uBlurRadius;
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
      vec2 delta=(mouse-st)*pow(clamp(uCenterPoint-length(st-mouse)/uMouseRadius,0.0,1.0),uEffectPower);
      vec4 bBox=boxBlur(uTex,vTextureCoord,delta);
      gl_FragColor=bBox;
    }
  `;

export { fsSource, vsSource };
