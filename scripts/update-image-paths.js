const fs = require('fs');
const path = require('path');

// Files to update
const filesToUpdate = [
  path.join(__dirname, '../src/data/destinations.ts'),
  path.join(__dirname, '../src/data/testimonials.ts'),
];

function updateImagePaths(content) {
  // Replace .png with .webp in image paths (handles various quote styles)
  let updated = content;
  
  // Match patterns like: image: '/path/to/file.png'
  updated = updated.replace(/image:\s*['"`]([^'"`]+)\.png['"`]/g, (match, path) => {
    return match.replace('.png', '.webp');
  });
  
  // Also handle direct .png references
  updated = updated.replace(/(['"`][^'"`]*\/[^'"`]+)\.png(['"`])/g, '$1.webp$2');
  
  return updated;
}

filesToUpdate.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    content = updateImagePaths(content);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated ${path.basename(filePath)}`);
    } else {
      console.log(`⊘ No changes needed in ${path.basename(filePath)}`);
    }
  }
});

console.log('\n✓ Image path updates complete!');
