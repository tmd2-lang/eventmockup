import fs from 'fs';

const content = fs.readFileSync('components/HomeScreen.tsx', 'utf-8');
const lines = content.split('\n');
const startIndex = lines.findIndex(l => l.includes('const synced ='));
console.log(lines.slice(startIndex, startIndex + 20).join('\n'));
