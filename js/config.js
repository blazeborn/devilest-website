// Site Configuration

const SITE_CONFIG = {
    // Site Metadata
    title: 'Devilest - Independent Game Studio',
    
    // Asset Paths
    assets: {
        logoSmall: 'imgs/DevilestLogo_v2_Small.png',
        logoLarge: 'imgs/DevilestLogo_v2_Large.png',
        founderImage: 'imgs/Founder.png',
        fireTexture: 'imgs/fire.png'
    },
    
    // External Resources
    carouselUrl: 'projects-carousel.html',
    dataUrl: 'data.json',
    
    // Animation Settings
    animations: {
        fadeInThreshold: 0.1,
        fadeInRootMargin: '0px 0px -50px 0px'
    },
    
    // Fire Shader Settings
    fireShader: {
        numFires: 6,
        containerHeight: 300,
        bloomStrength: 0.8,
        bloomRadius: 0.1,
        bloomThreshold: 0.7
    },
    
    // Navigation
    navLinks: [
        { text: 'Home', href: '#home' },
        { text: 'Studio', href: '#about' },
        { text: 'Game', href: '#project' },
        { text: 'Contact', href: '#contact' }
    ]
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.SITE_CONFIG = SITE_CONFIG;
}
