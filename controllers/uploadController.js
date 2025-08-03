const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tentukan folder upload
const uploadDir = path.join(__dirname, 'uploads');

// Cek folder, jika tidak ada buat
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true});
    console.log(`Folder ${uploadDir} dibuat`);
}

/** @type {import('multer').StorageEngine} */
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) =>
        cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({storage}); // Masih tanpa MIME check

exports.uploadFile = [
    upload.single('file'),
    (req, res) => {
        res.json({
            filePath: `/uploads/${req.file.filename}`
        });
    }
];
