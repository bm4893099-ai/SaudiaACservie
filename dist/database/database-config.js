"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseEnabled = exports.databaseUri = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const readEnvFile = () => {
    const envPath = (0, path_1.join)(process.cwd(), '.env');
    if (!(0, fs_1.existsSync)(envPath)) {
        return {};
    }
    return (0, fs_1.readFileSync)(envPath, 'utf8')
        .split(/\r?\n/)
        .reduce((accumulator, line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith('#')) {
            return accumulator;
        }
        const separatorIndex = trimmedLine.indexOf('=');
        if (separatorIndex === -1) {
            return accumulator;
        }
        const key = trimmedLine.slice(0, separatorIndex).trim();
        const value = trimmedLine.slice(separatorIndex + 1).trim();
        if (key) {
            accumulator[key] = value;
        }
        return accumulator;
    }, {});
};
const envFileValues = readEnvFile();
exports.databaseUri = process.env.MONGODB_URI || envFileValues.MONGODB_URI || '';
exports.databaseEnabled = Boolean(exports.databaseUri);
//# sourceMappingURL=database-config.js.map