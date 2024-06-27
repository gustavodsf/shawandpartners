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
// src/routes/users.test.ts
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./users")); // Adjust the path to your server file
const dataStore_1 = require("../dataStore"); // Adjust the path to your getCsvData function
jest.mock('../dataStore');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
const mockData = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Test User', email: 'test@example.com' },
];
dataStore_1.getCsvData.mockReturnValue(mockData);
describe('GET /api/users', () => {
    // Test for when no query parameter is provided
    it('should return all data when no query parameter is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(mockData.length);
    }));
    // Test for when a query parameter is provided and matches data
    it('should return matching data when a query parameter is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/users?q=test'); // Adjust the query parameter to match your test data
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
    }));
    // Test for when a query parameter is provided but no matching data is found
    it('should return 500 when no matching data is found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/users?q=nonexistent'); // Adjust the query parameter to ensure no match
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message', 'No matching data found');
    }));
    // Test for when the query parameter is missing
    it('should return all data when the query parameter is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/users');
        expect(response.status).toBe(200); // Adjust this if you change the behavior for missing query parameter
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(mockData.length);
    }));
});
