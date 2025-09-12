#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dtsFile = path.join(__dirname, 'dist', 'vrcontrols.d.ts');

console.log('Reading vrcontrols.d.ts...');
let content = fs.readFileSync(dtsFile, 'utf8');

console.log('Transforming to exact old format...');

// Check if already in correct format
if (content.trim().startsWith('declare module vr {')) {
  console.log('✅ File already in correct format');
  return;
}

// Split into lines for processing
let lines = content.split('\n');
let importLines = [];
let declarationLines = [];

for (let line of lines) {
  // Skip empty lines at the beginning
  if (line.trim() === '') {
    continue;
  }
  
  // Collect import statements (they'll be removed as old format doesn't have them)
  if (line.match(/^\s*import\s+/)) {
    importLines.push(line);
    continue;
  }
  
  // Process declaration lines
  let processedLine = line;
  
  // Remove export declare and export prefixes but keep the declarations
  processedLine = processedLine.replace(/^export declare /, 'export ');
  
  // Add export to bare declarations
  if (!processedLine.match(/^export\s+/) && processedLine.match(/^(class|interface|enum|type|const|let|var|function)\s+/)) {
    processedLine = 'export ' + processedLine;
  }
  
  // Handle declare statements
  processedLine = processedLine.replace(/^declare /, 'export ');
  
  declarationLines.push(processedLine);
}

// Join declarations
let declarationsContent = declarationLines.join('\n');

// Remove export global block entirely
declarationsContent = declarationsContent.replace(/export global \{[\s\S]*?\n\}/g, '');

// Fix Uint8Array<ArrayBuffer> to just Uint8Array
declarationsContent = declarationsContent.replace(/Uint8Array<ArrayBuffer>/g, 'Uint8Array');

// Remove private _grid; from Repeater class
declarationsContent = declarationsContent.replace(/^\s*private _grid;\s*$/gm, '');

// Clean up multiple empty lines
declarationsContent = declarationsContent.replace(/\n\s*\n\s*\n/g, '\n\n');
declarationsContent = declarationsContent.trim();

// Create final content in old format: declare module vr
const finalContent = `declare module vr {${declarationsContent}
}`;

console.log('Writing transformed file...');
fs.writeFileSync(dtsFile, finalContent, 'utf8');

console.log('✅ Successfully transformed vrcontrols.d.ts to match old working format');
console.log(`Final file size: ${finalContent.length} bytes`);

// Verify we have classes by counting them
const classCount = (finalContent.match(/export class/g) || []).length;
const functionCount = (finalContent.match(/export function/g) || []).length;
console.log(`Found ${classCount} classes and ${functionCount} functions`);