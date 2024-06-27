"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const files_1 = __importDefault(require("./files")); // Adjust the path as necessary
const dataStore_1 = require("../dataStore");
jest.mock('multer', () => {
    let shouldAttachFile = true;
    const multer = () => ({
        single: () => {
            return (req, res, next) => {
                if (shouldAttachFile) {
                    req.file = {
                        fieldname: 'file',
                        originalname: 'sample.csv',
                        encoding: '7bit',
                        mimetype: 'text/csv',
                        size: 12345, // Replace with the actual file size
                        destination: 'uploads/', // Replace with the actual destination path
                        filename: 'sample.csv', // Replace with the actual filename
                        path: 'uploads/sample.csv', // Replace with the actual file path
                        buffer: Buffer.from('name,city,country\nJohn Doe,New York,USA\n'),
                        stream: fs_1.default.createReadStream('uploads/sample.csv'), // Replace with the actual file stream
                    };
                }
                return next();
            };
        },
    });
    multer.memoryStorage = () => jest.fn();
    multer.setShouldAttachFile = (value) => {
        shouldAttachFile = value;
    };
    return multer;
});
// Mock setCsvData
jest.mock('../dataStore', () => ({ setCsvData: jest.fn() }));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/upload', files_1.default);
describe('POST /upload', () => {
    const mockFilePath = path_1.default.join(__dirname, '../../', 'sample.csv');
    const mockFile = Buffer.from('name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball\n');
    beforeEach(() => {
        fs_1.default.writeFileSync(mockFilePath, mockFile);
        jest
            .spyOn(fs_1.default, 'unlink')
            .mockImplementation((path, callback) => callback(null));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return 500 if no file is uploaded', () => __awaiter(void 0, void 0, void 0, function* () {
        require('multer').setShouldAttachFile(false); // Ensure no file is attached
        const response = yield (0, supertest_1.default)(app).post('/api/upload').send();
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('No file uploaded');
    }));
    it('should process the uploaded file and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        require('multer').setShouldAttachFile(true); // Ensure file is attached
        const response = yield (0, supertest_1.default)(app)
            .post('/api/upload')
            .attach('file', mockFilePath); // Debugging statement
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('The file was uploaded successfully.');
        expect(dataStore_1.setCsvData).toHaveBeenCalledWith([
            {
                name: 'John Doe',
                city: 'New York',
                country: 'USA',
                favorite_sport: 'Basketball',
            },
        ]);
        expect(jest.spyOn(fs_1.default, 'unlink')).toHaveBeenCalledWith(mockFilePath, expect.any(Function));
    }));
});
