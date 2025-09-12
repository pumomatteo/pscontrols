#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Creating unified d.ts file...');

const outputFile = path.join(__dirname, 'dist', 'vrcontrols.d.ts');
const uiDir = path.join(__dirname, 'dist', 'ui');
const managersDir = path.join(__dirname, 'dist', 'managers');

// Find all d.ts files in both ui and managers directories
const uiFiles = glob.sync('**/*.d.ts', { cwd: uiDir }).map(f => ({ file: f, dir: uiDir }));
const managerFiles = glob.sync('**/*.d.ts', { cwd: managersDir }).map(f => ({ file: f, dir: managersDir }));
const dtsFiles = [...uiFiles, ...managerFiles];

console.log(`Found ${dtsFiles.length} d.ts files`);

let allContent = '';

// Read vr.d.ts first as it's the main entry point
const vrFile = path.join(uiDir, 'vr.d.ts');
if (fs.existsSync(vrFile)) {
  console.log('Reading main vr.d.ts file...');
  const vrContent = fs.readFileSync(vrFile, 'utf8');
  
  // Remove imports and keep only declarations
  const vrLines = vrContent.split('\n').filter(line => {
    return !line.match(/^\s*import\s+/) && line.trim() !== '';
  });
  
  allContent += vrLines.join('\n') + '\n\n';
}

// Read all other files
for (const fileObj of dtsFiles) {
  if (fileObj.file === 'vr.d.ts') continue; // Already processed
  
  const fullPath = path.join(fileObj.dir, fileObj.file);
  console.log(`Reading ${fileObj.file}...`);
  
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Remove imports and exports, keep only class/interface definitions
  const lines = content.split('\n');
  const filteredLines = lines.filter(line => {
    const trimmed = line.trim();
    return !trimmed.startsWith('import ') && 
           !trimmed.startsWith('export {') &&
           !trimmed.match(/^export\s*\{.*\}/) &&
           trimmed !== '';
  });
  
  // Transform export statements to simple declarations for internal merging
  const transformedLines = filteredLines.map(line => {
    if (line.startsWith('export ')) {
      return line; // Keep export for now, will be handled in fix-dts.js
    }
    return line;
  });
  
  if (transformedLines.some(line => line.trim() !== '')) {
    allContent += transformedLines.join('\n') + '\n\n';
  }
}

console.log('Writing unified file...');
fs.writeFileSync(outputFile, allContent, 'utf8');

console.log(`✅ Created unified vrcontrols.d.ts with ${allContent.length} bytes`);
console.log('File ready for transformation by fix-dts.js');