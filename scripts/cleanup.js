const fs = require('fs-extra');
const path = require('path');

// Function to recursively delete all 'dist' folders
async function cleanDist(dir) {
  const entries = await fs.readdir(dir);
  for (const entry of entries) {
    const entryPath = path.join(dir, entry);
    const stats = await fs.stat(entryPath);
    if (stats.isDirectory()) {
      if (entry !== "node_modules") {
        try {
          if (entry === 'dist') {
            console.log('Deleting:', entryPath);
            await fs.remove(entryPath);
          } else {
            await cleanDist(entryPath);
          }
        } catch (error) {
          console.log("Error", error)
        }
      }
    }
  }
}

// Start cleaning 'dist' folders from the current directory
cleanDist('./').catch(err => console.error(err));

