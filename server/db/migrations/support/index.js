import fs from 'fs';

export const readSql = (filename) =>
  fs.readFileSync(`${__dirname}/${filename}`, { encoding: 'utf-8' });
