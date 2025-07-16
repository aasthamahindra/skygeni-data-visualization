const fs = require('fs');
const path = require('path');

// helper to read JSON files
const readJson = (filename) => {
    const filepath = path.join(__dirname, '../../data', filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(content);
};

module.exports = { readJson };