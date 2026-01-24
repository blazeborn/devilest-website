// Fire Shader Module - Lazy Loaded
// Only initializes when hero section becomes visible

(function() {
    'use strict';
    
    let fireInitialized = false;
    
    // Wait for Three.js to be ready
    function waitForThreeJS() {
        return new Promise((resolve) => {
            if (typeof THREE !== 'undefined') {
                resolve();
            } else {
                window.addEventListener('threejs-ready', resolve, { once: true });
            }
        });
    }
    
    // Initialize fire shader
    async function initFireShader() {
        if (fireInitialized) return;
        fireInitialized = true;
        
        console.log('🔥 Initializing fire shader...');
        
        await waitForThreeJS();
        
        const container = document.getElementById('flameContainer');
        
        if (!container) {
            console.error('flameContainer not found!');
            return;
        }
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, window.innerWidth / 300, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, 300);
        renderer.setClearColor(0x161616, 1);
        container.appendChild(renderer.domElement);
        
        camera.position.set(0, -1, 10);
        camera.lookAt(0, -1, 0);

        // Add ambient lighting
        const ambientLight = new THREE.AmbientLight(0xff6600, 0.3);
        scene.add(ambientLight);

        const fireLights = [];
        
        // Load texture
        const texture = new THREE.TextureLoader().load('imgs/fire.png', (tex) => {
            tex.magFilter = tex.minFilter = THREE.LinearFilter;
            tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
            console.log('🔥 Fire texture loaded');
        });

        // Simplex noise shader code
        const snoise = `
            vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
            vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
            vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
            vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
            float snoise(vec3 v){
                const vec2 C=vec2(1./6.,1./3.);
                const vec4 D=vec4(0.,.5,1.,2.);
                vec3 i=floor(v+dot(v,C.yyy));
                vec3 x0=v-i+dot(i,C.xxx);
                vec3 g=step(x0.yzx,x0.xyz);
                vec3 l=1.-g;
                vec3 i1=min(g.xyz,l.zxy);
                vec3 i2=max(g.xyz,l.zxy);
                vec3 x1=x0-i1+C.xxx;
                vec3 x2=x0-i2+C.yyy;
                vec3 x3=x0-D.yyy;
                i=mod289(i);
                vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
                float n_=.142857142857;
                vec3 ns=n_*D.wyz-D.xzx;
                vec4 j=p-49.*floor(p*ns.z*ns.z);
                vec4 x_=floor(j*ns.z);
                vec4 y_=floor(j-7.*x_);
                vec4 x=x_*ns.x+ns.yyyy;
                vec4 y=y_*ns.x+ns.yyyy;
                vec4 h=1.-abs(x)-abs(y);
                vec4 b0=vec4(x.xy,y.xy);
                vec4 b1=vec4(x.zw,y.zw);
                vec4 s0=floor(b0)*2.+1.;
                vec4 s1=floor(b1)*2.+1.;
                vec4 sh=-step(h,vec4(0.));
                vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
                vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
                vec3 p0=vec3(a0.xy,h.x);
                vec3 p1=vec3(a0.zw,h.y);
                vec3 p2=vec3(a1.xy,h.z);
                vec3 p3=vec3(a1.zw,h.w);
                vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
                p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
                vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
                m=m*m;
                return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
            }`;

        // Create multiple fires
        const fireGeo = new THREE.BoxGeometry(1, 1, 1);
        const numFires = 6;
        const fireMeshes = [];

        for (let i = 0; i < numFires; i++) {
            const fireMat = new THREE.ShaderMaterial({
                uniforms: {
                    fireTex: { value: texture },
                    time: { value: 0 },
                    seed: { value: Math.random() * 19.19 },
                    invModelMatrix: { value: new THREE.Matrix4() },
                    scale: { value: new THREE.Vector3(1, 1, 1) },
                    noiseScale: { value: new THREE.Vector4(1, 2, 1, 0.3) },
                    magnitude: { value: 2.5 },
                    lacunarity: { value: 3.0 },
                    gain: { value: 0.6 }
                },
                vertexShader: `
                    varying vec3 vWorldPos;
                    void main() {
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
                    }`,
                fragmentShader: `
                    ${snoise}
                    #define ITERATIONS 10
                    #define OCTAVES 3
                    uniform sampler2D fireTex;
                    uniform float time;
                    uniform float seed;
                    uniform mat4 invModelMatrix;
                    uniform vec3 scale;
                    uniform vec4 noiseScale;
                    uniform float magnitude;
                    uniform float lacunarity;
                    uniform float gain;
                    varying vec3 vWorldPos;
                    
                    float turbulence(vec3 p) {
                        float sum = 0.0;
                        float freq = 1.0;
                        float amp = 1.0;
                        for(int i = 0; i < OCTAVES; i++) {
                            sum += abs(snoise(p * freq)) * amp;
                            freq *= lacunarity;
                            amp *= gain;
                        }
                        return sum;
                    }
                    
                    vec4 samplerFire(vec3 p, vec4 scale) {
                        vec2 st = vec2(sqrt(dot(p.xz, p.xz)), p.y);
                        if(st.x <= 0.0 || st.x >= 1.0 || st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
                        p.y -= (seed + time) * scale.w;
                        p *= scale.xyz;
                        st.y += sqrt(st.y) * magnitude * turbulence(p);
                        if(st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
                        return texture2D(fireTex, st);
                    }
                    
                    vec3 localize(vec3 p) {
                        return (invModelMatrix * vec4(p, 1.0)).xyz;
                    }
                    
                    void main() {
                    vec3 rayPos = vWorldPos;
                    vec3 rayDir = normalize(rayPos - cameraPosition);
                    float rayLen = 0.0288 * length(scale);
                    vec4 col = vec4(0.0);
                    
                    for(int i = 0; i < ITERATIONS; i++) {
                        rayPos += rayDir * rayLen;
                        vec3 lp = localize(rayPos);
                        lp.y += 0.5;
                        lp.xz *= 2.0;
                        col += samplerFire(lp, noiseScale);
                    }
                    
                    col.a = col.r;
                    
                    // Apply gradient with dominant orange
                    float intensity = col.r;
                    vec3 gradientColor;
                    vec3 coreOrange = vec3(0.804, 0.227, 0.102); // #CD3A1A
                    
                    if (intensity < 0.2) {
                        gradientColor = mix(vec3(0.0, 0.0, 0.0), coreOrange * 0.5, intensity / 0.2);
                    } else if (intensity < 0.5) {
                        gradientColor = mix(coreOrange * 0.5, coreOrange, (intensity - 0.2) / 0.3);
                    } else if (intensity < 0.7) {
                        gradientColor = mix(coreOrange, coreOrange * 1.3, (intensity - 0.5) / 0.2);
                    } else if (intensity < 0.85) {
                        gradientColor = mix(coreOrange * 1.3, vec3(1.0, 0.7, 0.2), (intensity - 0.7) / 0.15);
                    } else {
                        gradientColor = mix(vec3(1.0, 0.7, 0.2), vec3(1.0, 1.0, 0.8), (intensity - 0.85) / 0.15);
                    }
                    
                    col.rgb = gradientColor * 1.8;
                    gl_FragColor = col;
                }`,
                transparent: true,
                depthWrite: false,
                depthTest: false
            });

            const fireMesh = new THREE.Mesh(fireGeo, fireMat);
            fireMesh.scale.set(22, 9, 12);
            
            const xPos = (i - (numFires - 1) / 2) * 20;
            fireMesh.position.set(xPos, -2, -3);
            
            scene.add(fireMesh);
            fireMeshes.push(fireMesh);

            // Add point light
            const fireLight = new THREE.PointLight(0xff4400, 2, 50);
            fireLight.position.set(xPos, -2, 0);
            scene.add(fireLight);
            fireLights.push(fireLight);
        }

        // Setup bloom
        const renderScene = new THREE.RenderPass(scene, camera);
        const bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, 300),
            0.8,
            0.1,
            0.7
        );

        const composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        console.log('🔥 Fire meshes with bloom added:', numFires);

        // Animate
        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();
            
            fireMeshes.forEach((fireMesh, index) => {
                fireMesh.updateMatrixWorld();
                fireMesh.material.uniforms.invModelMatrix.value.copy(fireMesh.matrixWorld).invert();
                fireMesh.material.uniforms.time.value = time;
                fireMesh.material.uniforms.scale.value.copy(fireMesh.scale);
                
                const flicker = 1.5 + Math.sin(time * 3 + index) * 0.3;
                fireLights[index].intensity = flicker;
            });
            
            composer.render();
        }
        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / 300;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, 300);
            composer.setSize(window.innerWidth, 300);
        });
        
        console.log('🔥 Fire shader fully initialized!');
    }
    
    // Lazy load: Initialize when hero section is visible
    const heroSection = document.getElementById('home');
    
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initFireShader();
                    observer.disconnect(); // Only initialize once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '100px' // Start loading 100px before visible
        });
        
        observer.observe(heroSection);
    } else {
        // Fallback: load immediately if hero section not found
        window.addEventListener('load', initFireShader);
    }
})();
