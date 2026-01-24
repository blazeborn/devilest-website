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
