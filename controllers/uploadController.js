const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage: storage }); // Insecure: no MIME type check

exports.uploadFile = [
    upload.single('file'),
    (req, res) => {
        res.json({ filePath: `/uploads/${req.file.filename}` });
    }
];
