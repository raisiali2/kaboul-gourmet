/**
 * update-button-styles.js
 * 
 * This script updates all button styles in CSS files to use the new 3px border styling.
 * It searches for button selectors and updates their styling to match Galvin's design.
 */

const fs = require('fs');
const path = require('path');

// Directories to search for CSS files
const searchDirs = [
  path.join(__dirname, 'src', 'styles'),
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'components', 'sections'),
  path.join(__dirname, 'src', 'components', 'layout')
];

// Button selectors to look for
const buttonSelectors = [
  '.btn-primary',
  '.btn-secondary',
  '.btn-text',
  '.slide-button',
  '.book-btn',
  'button[type="submit"]',
  'input[type="submit"]',
  '.uk-button'
];

// New button styles
const buttonStyleUpdates = {
  '.btn-primary, .slide-button, .book-btn, button[type="submit"], input[type="submit"], .uk-button': `
  display: inline-block;
  background-color: var(--color-gold);
  color: var(--color-white);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  letter-spacing: 2px;
  padding: calc(var(--button-padding-v) - 3px) calc(var(--button-padding-h) - 3px);
  text-transform: uppercase;
  border: 3px solid var(--color-gold);
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  min-width: 160px;
  line-height: 1.5;
  `,

  '.btn-primary:hover, .slide-button:hover, .book-btn:hover, button[type="submit"]:hover, input[type="submit"]:hover, .uk-button:hover': `
  background-color: transparent;
  color: var(--color-gold);
  `,

  '.btn-secondary': `
  display: inline-block;
  background-color: transparent;
  color: var(--color-gold);
  border: 3px solid var(--color-gold);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  letter-spacing: 2px;
  padding: calc(var(--button-padding-v) - 3px) calc(var(--button-padding-h) - 3px);
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  min-width: 160px;
  line-height: 1.5;
  `,

  '.btn-secondary:hover': `
  background-color: var(--color-gold);
  color: var(--color-white);
  `
};

// Function to process a CSS file and update button styles
function updateButtonStyles(filePath) {
  try {
    console.log(`Processing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Add import for variables.css if it's not already there
    if (!content.includes('@import') && !content.includes('variables.css') && !filePath.includes('variables.css')) {
      const relativePath = getRelativePathToVariables(filePath);
      content = `@import '${relativePath}';\n\n${content}`;
      modified = true;
      console.log(`  Added variables.css import`);
    }
    
    // Check for each button selector and update styles
    for (const [selector, styles] of Object.entries(buttonStyleUpdates)) {
      // Split the selector to check for individual selectors
      const individualSelectors = selector.split(', ');
      
      for (const indSelector of individualSelectors) {
        if (content.includes(indSelector)) {
          // Found a button selector, now check if it has a border property
          const regexPattern = new RegExp(`${indSelector}\\s*{[^}]*}`, 'g');
          const match = content.match(regexPattern);
          
          if (match) {
            // Check if the border is not 3px
            if (!match[0].includes('border: 3px') && !match[0].includes('border:3px')) {
              console.log(`  Updating style for ${indSelector}`);
              
              // Determine which style to apply based on the selector
              let styleToApply = styles;
              
              // Update the button style
              const updatedStyle = `${indSelector} {\n  ${styleToApply.trim().replace(/\n/g, '\n  ')}\n}`;
              content = content.replace(regexPattern, updatedStyle);
              modified = true;
            }
          }
        }
      }
    }
    
    // Write changes back to the file
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  Updated button styles in ${path.basename(filePath)}`);
    } else {
      console.log(`  No changes needed for ${path.basename(filePath)}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

// Get relative path to variables.css
function getRelativePathToVariables(filePath) {
  // Count the directory levels deep from src
  const relativePath = path.relative(path.dirname(filePath), path.join(__dirname, 'src', 'styles', 'variables.css'));
  return relativePath.replace(/\\/g, '/');
}

// Process all CSS files in the given directories
function processDirectory(directory) {
  try {
    if (!fs.existsSync(directory)) {
      console.log(`Directory does not exist: ${directory}`);
      return;
    }
    
    console.log(`Scanning directory: ${directory}`);
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        processDirectory(filePath);
      } else if (file.endsWith('.css')) {
        // Process CSS files
        updateButtonStyles(filePath);
      }
    }
  } catch (err) {
    console.error(`Error scanning directory ${directory}:`, err);
  }
}

// Start processing directories
console.log('Starting button style update...');
searchDirs.forEach(dir => {
  processDirectory(dir);
});
console.log('Button style update complete!'); 