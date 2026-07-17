#!/bin/bash
# Build Script for Devilest Website
# Minifies CSS and JS files for production

echo "🔧 Starting build process..."

# Create dist directory for production files
mkdir -p dist
mkdir -p dist/css
mkdir -p dist/css/components
mkdir -p dist/js

echo "📁 Created dist directories"

# Function to minify CSS (using simple sed commands)
minify_css() {
    input_file=$1
    output_file=$2
    
    # Remove comments, extra whitespace, and newlines
    sed 's|/\*[^*]*\*||g' "$input_file" | \
    tr '\n' ' ' | \
    sed 's/  */ /g' | \
    sed 's/ *{ */{/g' | \
    sed 's/ *} */}/g' | \
    sed 's/ *: */:/g' | \
    sed 's/ *; */;/g' | \
    sed 's/ *, */,/g' > "$output_file"
    
    echo "  ✓ Minified: $input_file → $output_file"
}

# Function to minify JS (basic - for better minification use a proper tool)
minify_js() {
    input_file=$1
    output_file=$2
    
    # Remove comments and extra whitespace
    sed 's|//.*$||g' "$input_file" | \
    sed 's|/\*[^*]*\*/||g' | \
    tr '\n' ' ' | \
    sed 's/  */ /g' > "$output_file"
    
    echo "  ✓ Minified: $input_file → $output_file"
}

echo ""
echo "📦 Minifying CSS files..."

# Minify CSS files
minify_css "css/variables.css" "dist/css/variables.min.css"
minify_css "css/base.css" "dist/css/base.min.css"
minify_css "css/components/navbar.css" "dist/css/components/navbar.min.css"
minify_css "css/components/hero.css" "dist/css/components/hero.min.css"
minify_css "css/components/about.css" "dist/css/components/about.min.css"
minify_css "css/components/project.css" "dist/css/components/project.min.css"
minify_css "css/components/contact.css" "dist/css/components/contact.min.css"

echo ""
echo "📦 Minifying JS files..."

# Minify JS files
minify_js "js/navigation.js" "dist/js/navigation.min.js"
minify_js "js/animations.js" "dist/js/animations.min.js"
minify_js "js/projects.js" "dist/js/projects.min.js"
minify_js "js/three-bundle-loader.js" "dist/js/three-bundle-loader.min.js"
minify_js "js/fire-shader-lazy.js" "dist/js/fire-shader-lazy.min.js"

echo ""
echo "📄 Creating production index.html..."

# Copy and update index.html with minified references
cp index.html dist/index.html
sed -i 's/\.css/\.min\.css/g' dist/index.html
sed -i 's/\.js/\.min\.js/g' dist/index.html

echo ""
echo "📊 Build Statistics:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Calculate size savings
calc_savings() {
    original_size=$(du -sh "$1" | cut -f1)
    minified_size=$(du -sh "$2" | cut -f1)
    echo "  $1: $original_size → $minified_size"
}

calc_savings "css/" "dist/css/"
calc_savings "js/" "dist/js/"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Build complete! Production files in ./dist/"
echo ""
echo "📝 Next steps:"
echo "  1. Copy imgs/ folder to dist/"
echo "  2. Copy Projects/ folder to dist/"
echo "  3. Deploy dist/ folder to your hosting"
echo ""
