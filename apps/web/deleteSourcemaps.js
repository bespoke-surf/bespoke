const fs = require("fs");
const path = require("path");

function deleteFilesWithExtension(dir, fileExtension) {
  // Get a list of all the files in the current directory
  const files = fs.readdirSync(dir);

  // Iterate over each file in the directory
  for (const file of files) {
    // Construct the full path of the file
    const filePath = path.join(dir, file);

    // Check if the current file is a directory
    if (fs.statSync(filePath).isDirectory()) {
      // Recursively call this function on the nested directory
      deleteFilesWithExtension(filePath, fileExtension);
    } else {
      // Check if the file has the desired file extension
      if (filePath.endsWith(`.${fileExtension}`)) {
        // Delete the file
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      }
    }
  }
}

// Example usage:
deleteFilesWithExtension("./public", "map");
deleteFilesWithExtension("./build", "map");
