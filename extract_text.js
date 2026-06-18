const fs = require('fs');
const html = fs.readFileSync('Policy Oracle - Standalone.html', 'utf8');

// Find all readable English sentences/phrases in the entire file
const allText = [];

// Match quoted strings that look like real content
const patterns = [
    /"([A-Z][^"]{25,300})"/g,
    /'([A-Z][^']{25,300})'/g,
];

for (const pat of patterns) {
    let m;
    while ((m = pat.exec(html)) !== null) {
        const t = m[1];
        if (t.includes(' ') && !t.includes('{') && !t.includes('function') && !t.includes('return') && !t.includes('===') && !t.includes('const ') && !t.includes('var ') && !t.includes('import ') && !t.includes('require(') && !t.includes('console.') && !t.includes('.prototype') && !t.includes('document.')) {
            allText.push(t);
        }
    }
}

const unique = [...new Set(allText)];
fs.writeFileSync('extracted_content.txt', unique.join('\n\n'));
console.log('Found ' + unique.length + ' text items');
console.log(unique.slice(0, 80).join('\n---\n'));
