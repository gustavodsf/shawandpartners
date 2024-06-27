"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCsvData = exports.setCsvData = void 0;
let csvData = [];
const setCsvData = (data) => {
    csvData = data;
};
exports.setCsvData = setCsvData;
const getCsvData = () => {
    return csvData;
};
exports.getCsvData = getCsvData;
