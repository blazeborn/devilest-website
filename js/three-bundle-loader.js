// Three.js Bundle Loader
// This script dynamically loads all Three.js dependencies in the optimal order

(function() {
    'use strict';
    
    const THREE_VERSION = '0.128.0';
    const CDN_BASE = 'https://cdn.jsdelivr.net/npm/three@' + THREE_VERSION;
    
    // All required Three.js scripts in dependency order
    const scripts = [
        CDN_BASE + '/build/three.min.js',
        CDN_BASE + '/examples/js/postprocessing/EffectComposer.js',
        CDN_BASE + '/examples/js/postprocessing/RenderPass.js',
        CDN_BASE + '/examples/js/postprocessing/ShaderPass.js',
        CDN_BASE + '/examples/js/shaders/CopyShader.js',
        CDN_BASE + '/examples/js/shaders/LuminosityHighPassShader.js',
        CDN_BASE + '/examples/js/postprocessing/UnrealBloomPass.js'
    ];
    
    let loadedCount = 0;
    
    // Load scripts sequentially
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
                loadedCount++;
                console.log(`✓ Loaded Three.js dependency ${loadedCount}/${scripts.length}`);
                resolve();
            };
            script.onerror = () => reject(new Error(`Failed to load: ${url}`));
            document.head.appendChild(script);
        });
    }
    
    // Load all scripts in sequence
    async function loadThreeJS() {
        try {
            for (const scriptUrl of scripts) {
                await loadScript(scriptUrl);
            }
            console.log('✓ Three.js bundle fully loaded!');
            
            // Dispatch custom event when Three.js is ready
            window.dispatchEvent(new CustomEvent('threejs-ready'));
        } catch (error) {
            console.error('Failed to load Three.js bundle:', error);
        }
    }
    
    // Start loading
    loadThreeJS();
})();
