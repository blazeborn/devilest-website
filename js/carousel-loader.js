// Projects Carousel Loader Module

window.addEventListener('load', () => {
    const projectsIframe = document.getElementById('projects-iframe');
    
    if (!projectsIframe) {
        console.warn('Projects iframe not found');
        return;
    }
    
    projectsIframe.src = 'projects-carousel.html'; 
    
    projectsIframe.onload = function() {
        setTimeout(() => {
            try {
                const iframeDoc = projectsIframe.contentDocument || projectsIframe.contentWindow.document;
                projectsIframe.style.height = iframeDoc.body.scrollHeight + 'px';
            } catch (e) {
                // Fallback height if cross-origin issues
                projectsIframe.style.height = '800px';
                console.warn('Could not calculate iframe height, using fallback');
            }
        }, 500);
    };
});
