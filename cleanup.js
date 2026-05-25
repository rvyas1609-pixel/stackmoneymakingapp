const fs = require('fs');
const path = require('path');

const nodeModulesPath = path.join(__dirname, 'node_modules');
const lockfilePath = path.join(__dirname, 'package-lock.json');

console.log('Cleaning up...');

// Delete package-lock.json
if (fs.existsSync(lockfilePath)) {
  try {
    fs.unlinkSync(lockfilePath);
    console.log('✓ Deleted package-lock.json');
  } catch (err) {
    console.error('Failed to delete package-lock.json:', err.message);
  }
}

// Delete node_modules recursively
if (fs.existsSync(nodeModulesPath)) {
  try {
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
    console.log('✓ Deleted node_modules');
  } catch (err) {
    console.error('Failed to delete node_modules:', err.message);
  }
}

console.log('\nDone! Now run: npm install --legacy-peer-deps');
