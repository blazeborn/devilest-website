# Projects Carousel - Game Studio Showcase

A professional game store-inspired carousel for showcasing game projects with media galleries, project information, and customizable call-to-action buttons.

## Features

- **Game store-style layout** with media showcase and project information sidebar
- **Media carousel** with thumbnail navigation supporting images, videos, and GIFs
- **Responsive design** with professional 8px grid system alignment
- **Customizable CTA buttons** for different project types (Wishlist, Demo, etc.)
- **Professional typography** and consistent spacing
- **Autoplay videos** with thumbnail previews
- **Keyboard navigation** support

## File Structure

```
your-website/
├── index.html (main website)
├── projects-carousel.html (carousel component)
└── Projects/
    ├── projects.json (project data)
    └── media/ (optional media files)
        ├── underworld/
        │   ├── screenshot1.jpg
        │   ├── combat.gif
        │   └── trailer.mp4
        └── spacecalamity/
            └── concept1.jpg
```

## Setup

1. **Place the carousel file**: Put `projects-carousel.html` in your website directory

2. **Create Projects folder**: Create a `Projects` folder with your `projects.json` file

3. **Embed in main site**: Load the carousel via iframe in your main website:

```html
<iframe src="projects-carousel.html" 
        style="width: 100%; height: 850px; border: none;">
</iframe>
```

## JSON Configuration

### Basic Project Structure

```json
[
  {
    "title": "Your Game Title",
    "genre": "Action RPG",
    "status": "In Development",
    "statusClass": "development",
    "description": "Your game description here...",
    "features": [
      {"title": "Feature Name", "desc": "Feature description"},
      {"title": "Another Feature", "desc": "Another description"}
    ],
    "info": {
      "platform": "PC (Windows)",
      "engine": "Unreal Engine 5",
      "players": "Single Player",
      "status": "Active Development"
    },
    "tech": ["UE5", "Ability System", "MVVM"]
  }
]
```

### Adding Media Gallery

Add a `media` array to include screenshots, GIFs, and videos:

```json
{
  "title": "Your Game",
  "media": [
    {
      "type": "screenshot",
      "path": "Projects/media/yourgame/screenshot1.jpg",
      "title": "Combat System"
    },
    {
      "type": "gif", 
      "path": "Projects/media/yourgame/combat.gif",
      "title": "Combat Demo"
    },
    {
      "type": "video",
      "path": "Projects/media/yourgame/trailer.mp4",
      "thumbnail": "Projects/media/yourgame/video_thumb.jpg",
      "title": "Gameplay Trailer"
    }
  ]
}
```

#### Media Properties

- **`type`**: `"screenshot"`, `"gif"`, `"video"`, `"concept"`, `"diagram"`
- **`path`**: File path or URL to the media
- **`title`**: Display name for the media
- **`thumbnail`** (videos only): Custom thumbnail image for video previews

### Adding Call-to-Action Buttons

Add customizable CTA buttons for different project needs:

```json
{
  "title": "Your Game",
  "cta": {
    "text": "Wishlist Now",
    "url": "https://store.epicgames.com/your-game",
    "color": "#1b74e4"
  }
}
```

#### CTA Examples

**Published Game:**
```json
"cta": {
  "text": "Play Demo Now",
  "url": "https://your-demo-link.com",
  "color": "#22c55e"
}
```

**Epic Games Store:**
```json
"cta": {
  "text": "Get on Epic Games", 
  "url": "https://store.epicgames.com/your-game",
  "color": "#0078f2"
}
```

**Steam:**
```json
"cta": {
  "text": "Wishlist on Steam", 
  "url": "https://store.steampowered.com/app/your-id",
  "color": "#1b74e4"
}
```

**Itch.io:**
```json
"cta": {
  "text": "Download on Itch.io",
  "url": "https://your-username.itch.io/your-game",
  "color": "#fa5c5c"
}
```

**Academic Project:**
```json
"cta": {
  "text": "Read Research",
  "url": "https://your-research-paper.com", 
  "color": "#a855f7"
}
```

### Status Classes

Use `statusClass` for proper color coding:

- **`development`**: Blue (In Development)
- **`prototype`**: Orange (Early Prototype)  
- **`academic`**: Purple (Academic Project)
- **`published`**: Green (Published/Released)

## Media Setup Options

### Option 1: Local Media Files
Create folder structure and place your media files:
```
Projects/media/yourgame/screenshot1.jpg
```

### Option 2: External URLs
Use direct links to images/videos:
```json
"path": "https://your-cdn.com/image.jpg"
```

### Option 3: Placeholder Images (for testing)
Use placeholder services:
```json
"path": "https://picsum.photos/800/600?random=1"
```

## Features

### Media Carousel
- Click thumbnail buttons to switch main display
- Automatic video playback (muted by default)
- Support for images, GIFs, and videos
- Rectangular thumbnail previews
- Type indicators (SS1, GIF, VID, etc.)

### Navigation
- Project carousel with arrow buttons
- Project name navigation dots
- Keyboard support (left/right arrows)
- Mobile-responsive design

### Professional Layout
- 8px grid system for perfect alignment
- Consistent typography scale
- Professional spacing and margins
- Modern game store-inspired dark theme with red accents

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Hardware-accelerated transitions
- Accessibility features included

## Customization

### Colors
Edit CSS variables in the `:root` section:
```css
:root {
  --accent-primary: #dc2626; /* Main red accent */
  --bg-primary: #0a0a0a;     /* Background */
  --text-primary: #f9fafb;   /* Main text */
}
```

### Layout
Modify grid template columns for different layouts:
```css
.carousel-slide {
  grid-template-columns: 2fr 1fr; /* Adjust ratio */
}
```

## Troubleshooting

**Media not showing:**
- Check file paths are correct
- Ensure Projects folder is accessible
- Verify JSON syntax is valid

**Videos not playing:**
- Check video URL is direct file link
- Ensure video format is MP4
- Add `thumbnail` property for video previews

**CTA button not appearing:**
- Verify `cta` object exists in JSON
- Check URL format is correct
- Ensure no JSON syntax errors

## Performance Tips

- Optimize image sizes (recommended: 800x600 for main display)
- Use appropriate video compression
- Consider lazy loading for large media collections
- Test on mobile devices for responsive behavior

## License

This carousel system is designed for game studios and developers to showcase their projects professionally.
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
├── index.html                    # Main website (130 lines)
├── projects-carousel.html        # Project showcase component
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
│   ├── carousel-loader.js       # Project carousel iframe handler
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