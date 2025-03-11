/**
 * update-section-css.js
 * 
 * This script adds the import for variables.css to all section CSS files
 * that don't already have it, and updates any hardcoded spacing values
 * to use the new spacing variables.
 */

const fs = require('fs');
const path = require('path');

const SECTIONS_DIR = path.join(__dirname, 'src', 'components', 'sections');
const VARIABLES_IMPORT = '@import "../../styles/variables.css";';

// Common hardcoded spacing values to replace
const spacingReplacements = [
  { value: '70px', variable: 'var(--section-padding)' },
  { value: '60px', variable: 'var(--section-padding-sm)' },
  { value: '50px', variable: 'var(--section-padding-sm)' },
  { value: '40px', variable: 'var(--section-padding-xs)' },
  { value: '30px', variable: 'var(--space-lg)' },
  { value: '25px', variable: 'var(--space-lg)' },
  { value: '20px', variable: 'var(--space-md)' },
  { value: '15px', variable: 'var(--space-sm)' },
  { value: '10px', variable: 'var(--space-xs)' },
  { value: '8px', variable: 'var(--space-xs)' },
  { value: '5px', variable: 'var(--space-xxs)' },
];

// Common margin/padding properties to target
const propertiesToReplace = [
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'gap'
];

// Utility function to replace hardcoded spacing values with variables
function replaceSpacingValues(cssContent) {
  let updatedContent = cssContent;
  
  propertiesToReplace.forEach(property => {
    spacingReplacements.forEach(({ value, variable }) => {
      // Match the property with the exact value
      const regex = new RegExp(`${property}:\\s*${value}`, 'g');
      updatedContent = updatedContent.replace(regex, `${property}: ${variable}`);
    });
  });
  
  return updatedContent;
}

function processFile(filePath) {
  if (!filePath.endsWith('.css')) return;
  
  console.log(`Processing ${filePath}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if variables are already imported
    if (!content.includes('@import') || !content.includes('variables.css')) {
      content = `${VARIABLES_IMPORT}\n\n${content}`;
      console.log(`  Added variables import`);
    }
    
    // Replace hardcoded spacing values
    const updatedContent = replaceSpacingValues(content);
    
    // Write the updated content back to the file
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`  Updated spacing values in ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

function processDirectory(directory) {
  console.log(`Scanning directory: ${directory}`);
  
  try {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        processDirectory(filePath);
      } else if (stats.isFile() && file.endsWith('.css')) {
        processFile(filePath);
      }
    });
  } catch (err) {
    console.error(`Error scanning directory ${directory}:`, err);
  }
}

// Start processing the sections directory
processDirectory(SECTIONS_DIR);
console.log('Done!'); 