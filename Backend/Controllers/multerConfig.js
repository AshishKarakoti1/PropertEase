const multer = require('multer');
const path = require('path');

// Define the upload path
const uploadPath = path.join(__dirname, '../uploads');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

// Configure file filter
const fileFilter = (req, file, cb) => {
    const type = file.mimetype.split('/')[0];
    if (type === 'image') {
        cb(null, true);
    } else {
        let err = new Error('Invalid file type');
        cb(err, false);
    }
};

// Create Multer instance
const upload = multer({ storage, fileFilter });

module.exports = upload;
