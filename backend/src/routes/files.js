"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const dataStore_1 = require("../dataStore");
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
/**
 * @swagger
 * /api/files:
 *   post:
 *     summary: Upload a CSV file
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The CSV file to upload
 *     responses:
 *       200:
 *         description: The file was uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The file was uploaded successfully.
 *       500:
 *         description: File upload failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File upload failed.
 */
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(500).json({ message: 'No file uploaded' });
    }
    const results = [];
    const filePath = path_1.default.join(__dirname, '../../', req.file.path);
    fs_1.default.createReadStream(filePath)
        .pipe((0, csv_parser_1.default)())
        .on('data', (data) => {
        // Ensure the data conforms to UserDTO type
        const user = {
            name: data.name,
            city: data.city,
            country: data.country,
            favorite_sport: data.favorite_sport,
        };
        results.push(user);
    })
        .on('end', () => {
        (0, dataStore_1.setCsvData)(results);
        res.status(200).json({ message: 'The file was uploaded successfully.' });
        // Delete the file after processing
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${filePath}`, err);
            }
        });
    })
        .on('error', (error) => {
        console.log('Error', error);
        res.status(500).json({ message: error.message });
        // Delete the file in case of error
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${filePath}`, err);
            }
        });
    });
});
exports.default = router;
