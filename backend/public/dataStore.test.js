"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataStore_1 = require("./dataStore");
describe('dataStore module', () => {
    beforeEach(() => {
        // Reset the CSV data before each test
        (0, dataStore_1.setCsvData)([]);
    });
    test('getCsvData should return an empty array initially', () => {
        const data = (0, dataStore_1.getCsvData)();
        expect(data).toEqual([]);
    });
    test('getCsvData should return the data set by setCsvData', () => {
        const sampleData = [
            {
                name: 'John Doe',
                city: 'New York',
                country: 'USA',
                favorite_sport: 'Basketball',
            },
            {
                name: 'Jane Smith',
                city: 'London',
                country: 'UK',
                favorite_sport: 'Football',
            },
        ];
        (0, dataStore_1.setCsvData)(sampleData);
        const data = (0, dataStore_1.getCsvData)();
        expect(data).toEqual(sampleData);
    });
    test('getCsvData should return updated data after multiple setCsvData calls', () => {
        const initialData = [
            {
                name: 'John Doe',
                city: 'New York',
                country: 'USA',
                favorite_sport: 'Basketball',
            },
        ];
        const updatedData = [
            {
                name: 'Jane Smith',
                city: 'London',
                country: 'UK',
                favorite_sport: 'Football',
            },
        ];
        (0, dataStore_1.setCsvData)(initialData);
        (0, dataStore_1.setCsvData)(updatedData);
        const data = (0, dataStore_1.getCsvData)();
        expect(data).toEqual(updatedData);
    });
});
