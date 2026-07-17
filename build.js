// Build Script for Devilest Website
// Minifies CSS and JS files for production
// 
// Installation: npm install --save-dev terser clean-css-cli
// Usage: node build.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Starting build process...\n');

// Create dist directories
const dirs = [
    'dist',
    'dist/css',
    'dist/css/components',
    'dist/js'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

console.log('📁 Created dist directories\n');

// CSS files to minify
const cssFiles = [
    { src: 'css/variables.css', dest: 'dist/css/variables.min.css' },
    { src: 'css/base.css', dest: 'dist/css/base.min.css' },
    { src: 'css/components/navbar.css', dest: 'dist/css/components/navbar.min.css' },
    { src: 'css/components/hero.css', dest: 'dist/css/components/hero.min.css' },
    { src: 'css/components/about.css', dest: 'dist/css/components/about.min.css' },
    { src: 'css/components/project.css', dest: 'dist/css/components/project.min.css' },
    { src: 'css/components/contact.css', dest: 'dist/css/components/contact.min.css' }
];

// JS files to minify
const jsFiles = [
    { src: 'js/i18n.js', dest: 'dist/js/i18n.min.js' },
    { src: 'js/navigation.js', dest: 'dist/js/navigation.min.js' },
    { src: 'js/animations.js', dest: 'dist/js/animations.min.js' },
    { src: 'js/projects.js', dest: 'dist/js/projects.min.js' },
    { src: 'js/contact.js', dest: 'dist/js/contact.min.js' },
    { src: 'js/three-bundle-loader.js', dest: 'dist/js/three-bundle-loader.min.js' },
    { src: 'js/fire-shader-lazy.js', dest: 'dist/js/fire-shader-lazy.min.js' }
];

console.log('📦 Minifying CSS files...');

// Minify CSS files
cssFiles.forEach(file => {
    try {
        execSync(`npx cleancss -o ${file.dest} ${file.src}`);
        
        const originalSize = fs.statSync(file.src).size;
        const minifiedSize = fs.statSync(file.dest).size;
        const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
        
        console.log(`  ✓ ${file.src} → ${file.dest} (${savings}% smaller)`);
    } catch (error) {
        console.error(`  ✗ Failed to minify ${file.src}`);
    }
});

console.log('\n📦 Minifying JS files...');

// Minify JS files
jsFiles.forEach(file => {
    try {
        execSync(`npx terser ${file.src} -o ${file.dest} -c -m`);
        
        const originalSize = fs.statSync(file.src).size;
        const minifiedSize = fs.statSync(file.dest).size;
        const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
        
        console.log(`  ✓ ${file.src} → ${file.dest} (${savings}% smaller)`);
    } catch (error) {
        console.error(`  ✗ Failed to minify ${file.src}`);
    }
});

console.log('\n📄 Creating production index.html...');

// Copy and update index.html with minified references
let indexContent = fs.readFileSync('index.html', 'utf8');

// Replace .css with .min.css, preserving any ?v= cache-busting query.
indexContent = indexContent.replace(/href="([^"?]+)\.css(\?[^"]*)?"/g, 'href="$1.min.css$2"');

// Replace .js with .min.js (but not for CDN scripts), same query handling.
indexContent = indexContent.replace(/src="js\/([^"?]+)\.js(\?[^"]*)?"/g, 'src="js/$1.min.js$2"');

fs.writeFileSync('dist/index.html', indexContent);
console.log('  ✓ Created dist/index.html');

console.log('\n📊 Build Statistics:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// Calculate total size savings
let originalTotal = 0;
let minifiedTotal = 0;

[...cssFiles, ...jsFiles].forEach(file => {
    originalTotal += fs.statSync(file.src).size;
    minifiedTotal += fs.statSync(file.dest).size;
});

const totalSavings = ((1 - minifiedTotal / originalTotal) * 100).toFixed(1);
const sizeReduction = (originalTotal - minifiedTotal) / 1024;

console.log(`  Original size:  ${(originalTotal / 1024).toFixed(2)} KB`);
console.log(`  Minified size:  ${(minifiedTotal / 1024).toFixed(2)} KB`);
console.log(`  Savings:        ${sizeReduction.toFixed(2)} KB (${totalSavings}%)`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

console.log('\n📁 Copying assets...');

// Copy folders and files
function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) {
        console.log(`  ⚠️  ${src} not found, skipping`);
        return;
    }
    
    if (fs.statSync(src).isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(file => {
            copyRecursive(path.join(src, file), path.join(dest, file));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

try {
    copyRecursive('imgs', 'dist/imgs');
    console.log('  ✓ Copied imgs/');
    
    copyRecursive('Projects', 'dist/Projects');
    console.log('  ✓ Copied Projects/');
} catch (error) {
    console.error('  ✗ Error copying files:', error.message);
}

console.log('\n✅ Build complete! Production files in ./dist/\n');
console.log('📝 Ready to deploy:');
console.log('  - All files copied to dist/');
console.log('  - Just commit and push to deploy!\n');