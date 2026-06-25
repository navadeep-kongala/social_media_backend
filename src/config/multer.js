const multer = require('multer');

// Configure multer to store files as buffers in temporary memory
const storage = multer.memoryStorage();

// Set file restrictions (optional: limits file size to 5MB)
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

module.exports = upload;
