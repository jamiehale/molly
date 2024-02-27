import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const readSql = (filename) => fs.readFileSync(`${__dirname}/${filename}`, { encoding: 'utf-8' });
