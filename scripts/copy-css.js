const fs = require('fs');
const path = require('path');

// Function to ensure directory exists
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// Main function to copy CSS files
async function copyCssFiles() {
  console.log('Running post-build CSS copy script...');
  
  // Check if .next/static/css directory exists
  const cssSourceDir = path.join(process.cwd(), '.next', 'static', 'css');
  if (!fs.existsSync(cssSourceDir)) {
    console.log('No CSS files found in .next/static/css');
    return;
  }

  // Ensure the out/_next/static/css directory exists
  const cssTargetDir = path.join(process.cwd(), 'out', '_next', 'static', 'css');
  ensureDirectoryExistence(path.join(cssTargetDir, 'dummy.txt'));

  // Copy all CSS files
  const cssFiles = fs.readdirSync(cssSourceDir);
  for (const file of cssFiles) {
    if (file.endsWith('.css')) {
      const sourcePath = path.join(cssSourceDir, file);
      const targetPath = path.join(cssTargetDir, file);
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied CSS file: ${file}`);
    }
  }

  // Create a global.css file in the out directory to ensure CSS is loaded
  const globalCssContent = `
/* This file ensures CSS is properly loaded in the static export */
@import url('/_next/static/css/app/layout.css');
`;
  
  const globalCssPath = path.join(process.cwd(), 'out', 'global.css');
  fs.writeFileSync(globalCssPath, globalCssContent);
  console.log('Created global.css file in out directory');

  // Update HTML files to include the global.css file
  const htmlFiles = findAllHtmlFiles(path.join(process.cwd(), 'out'));
  for (const htmlFile of htmlFiles) {
    let htmlContent = fs.readFileSync(htmlFile, 'utf8');
    
    // Add link to global.css if not already present
    if (!htmlContent.includes('href="/simple-calculation/global.css"')) {
      htmlContent = htmlContent.replace(
        '</head>',
        '<link rel="stylesheet" href="/simple-calculation/global.css" />\n</head>'
      );
      fs.writeFileSync(htmlFile, htmlContent);
      console.log(`Updated HTML file: ${path.relative(process.cwd(), htmlFile)}`);
    }
  }

  console.log('Post-build CSS copy completed successfully');
}

// Function to find all HTML files in a directory recursively
function findAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Run the main function
copyCssFiles().catch(error => {
  console.error('Error in post-build script:', error);
  process.exit(1);
});
