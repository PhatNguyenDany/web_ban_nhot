import * as fs from 'fs';
const fileImagePath = './public/img/';

export function readFile(fileName) {
  try {
    const data = fs.readFileSync(fileImagePath + fileName);

    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Lỗi khi đọc tệp ', error);
  }
}
