#ifdef GL_ES
precision mediump float;
#define GLSLIFY 1
#endif
varying vec3 vVertexPosition;varying vec2 vTextureCoord;uniform float uTime,uAlpha;uniform vec2 uIntensity,uResolution,uMouse;uniform sampler2D planeTexture;float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}vec4 boxBlur(sampler2D tex,vec2 uv,vec2 delta){vec4 color=vec4(0);float total=0.,offset=random(vec3(12.9898,78.233,151.7182),0.);for(float t=-20.;t<=20.;t++){float percent=(t+offset-.8)/20.,weight=1.-abs(percent);vec4 bsample=texture2D(tex,uv+delta*percent);bsample.xyz*=bsample.w;color+=bsample*weight;total+=weight;}color/=total;color.xyz/=color.w+1e-5;return uAlpha*color;}void main(){vec2 st=(gl_FragCoord.xy-.5*uResolution)/min(uResolution.x,uResolution.y),mouse=(uMouse-.5*uResolution)/min(uResolution.x,uResolution.y);vec4 bBox=boxBlur(planeTexture,vTextureCoord,vec2((mouse-st)*pow(clamp(.5-length(st-mouse)/.5,0.,1.),.82)));gl_FragColor=bBox;}
