# Devilest Website

Professional game studio website with modular architecture, optimized performance, and automated deployment.

## Overview

A modern, high-performance website for Devilest Game Studio featuring:
- Modular CSS/JS architecture
- Lazy-loaded Three.js fire shader effect
- Automated build and deployment pipeline
- Professional project showcase carousel
- Responsive design with mobile-first approach

## Tech Stack

**Frontend:**
- HTML5, CSS3 (CSS Variables)
- Vanilla JavaScript (ES6+)
- Three.js (r128) for WebGL effects

**Build System:**
- Node.js
- Terser (JS minification)
- CleanCSS (CSS minification)

**Deployment:**
- GitHub Actions
- GitHub Pages

## Project Structure

```
devilest-website/
├── index.html                    # Main website
├── package.json                  # npm dependencies
├── build.js                      # Build/minification script
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions workflow
│
├── css/
│   ├── variables.css            # Design tokens & CSS variables
│   ├── base.css                 # Reset, common styles, utilities
│   └── components/
│       ├── navbar.css           # Navigation with scroll effects
│       ├── hero.css             # Hero section
│       ├── about.css            # About/studio section
│       ├── project.css          # Project showcase section
│       └── contact.css          # Contact section
│
├── js/
│   ├── three-bundle-loader.js   # Three.js dependency manager
│   ├── navigation.js            # Menu, scroll, navbar effects
│   ├── animations.js            # Fade-in intersection observer
│   ├── projects.js              # Inline projects carousel (renders projects.json)
│   └── fire-shader-lazy.js      # Lazy-loaded fire effect (~250 lines)
│
├── Projects/
│   └── projects.json            # Project data for carousel
│
├── imgs/                        # Images and assets
│
└── dist/                        # Auto-generated production files
    └── (minified versions)
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/devilest-website.git
cd devilest-website

# Install dependencies
npm install
```

### Development

```bash
# Open index.html in browser
# Edit files in css/, js/, etc.
# Changes reflect immediately
```

### Building for Production

```bash
# Build minified production files
npm run build

# Output goes to dist/ folder
# Files minified by ~30% (9KB saved)
```

### Deployment

**Automatic (GitHub Actions):**
1. Edit source files
2. Commit and push to `main` branch
3. GitHub Actions automatically builds and deploys

**Manual:**
```bash
npm run build
git add dist/
git commit -m "Update production build"
git push
```

## Features

### Performance Optimizations

**Modularization:**
- Reduced index.html from 800 to 130 lines (83.75% reduction)
- Separated concerns into 7 CSS and 5 JS modules
- Browser caching for individual components

**Lazy Loading:**
- Fire shader only loads when hero section is visible
- ~500ms faster initial page load
- Three.js dependencies load sequentially

**Minification:**
- CSS minified by 22-34%
- JS minified by 27-55%
- Total savings: 8.79KB (29.9%)

### Interactive Features

**Navigation:**
- Transparent navbar on scroll down
- Logo fades out when scrolling
- Menu remains visible
- Mobile hamburger menu

**Fire Shader:**
- WebGL-powered fire effect with bloom
- 6 animated fire meshes
- Orange gradient (#CD3A1A brand color)
- Dynamic lighting and particle effects

**Project Carousel:**
- Steam-inspired layout
- Media gallery (images, GIFs, videos)
- Responsive design
- Customizable CTA buttons

## Project Data

Edit `Projects/projects.json` to update project information:

```json
[{
  "title": "Your Game Title",
  "genre": "Action RPG",
  "status": "In Development",
  "description": "Game description...",
  "features": [...],
  "info": {...},
  "media": [...],
  "cta": {
    "text": "Wishlist Now",
    "url": "https://store.epicgames.com/your-game",
    "color": "#0078f2"
  }
}]
```

## Customization

### Colors

Edit `css/variables.css`:

```css
:root {
  --brand-red: #CD3A1A;
  --bg-primary: #161616;
  --text-primary: #fff;
}
```

### Content

Edit HTML sections in `index.html` or update `Projects/projects.json` for project data.

### Fire Shader Settings

Edit `js/fire-shader-lazy.js`:

```javascript
const numFires = 6;           // Number of fire meshes
const bloomStrength = 0.8;     // Bloom intensity
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

**Before Optimization:**
- index.html: 800 lines
- Total size: 29.42 KB
- Initial load: ~2s
- Script requests: 11

**After Optimization:**
- index.html: 130 lines
- Total size: 20.63 KB
- Initial load: ~1.5s
- Script requests: 5

## GitHub Actions Workflow

Automatic deployment on push to `main`:

1. Checkout code
2. Setup Node.js
3. Install dependencies (`npm install`)
4. Build production files (`npm run build`)
5. Deploy `dist/` to GitHub Pages

## Troubleshooting

**Fire shader not loading:**
- Check browser console for Three.js errors
- Ensure all Three.js dependencies load
- Hard refresh: Ctrl + Shift + R

**Navbar not updating:**
- Clear browser cache
- Check if source files were updated before building
- Verify GitHub Actions completed successfully

**Build failing:**
- Check `package.json` exists in root
- Verify Node.js version (18+)
- Check GitHub Actions logs for errors

## Contributing

This is a private studio website. For internal development:

1. Create feature branch
2. Make changes to source files (not `dist/`)
3. Test locally
4. Run `npm run build` to verify build works
5. Commit and push
6. GitHub Actions handles deployment

## License

Private/Proprietary - Devilest Game Studio

## Credits

**Development:** Vitor Silvestre
**Studio:** Devilest
**Fire Shader:** Three.js WebGL with custom shaders
**Build System:** Node.js, Terser, CleanCSS
**Deployment:** GitHub Actions

---

**Live Site:** https://yourusername.github.io/devilest-website/
**Studio:** Devilest - Rock n Roll Game Development