import fs from 'fs';
import path from 'path';

export default class FileSystemManager {
  constructor(filePath) {
    this.filePath = path.resolve(__dirname, filePath);
  }

  read() {
    return fs.promises
      .readFile(this.filePath, 'utf-8')
      .then(data => JSON.parse(data))
      .catch(() => []);
  }

  write(data) {
    return fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async add(item) {
    const data = await this.read();
    data.push(item);
    await this.write(data);
  }

  async update(id, item) {
    const data = await this.read();
    const index = data.findIndex(i => i.id === id);
    data[index] = { ...data[index], ...item };
    await this.write(data);
  }

  async delete(id) {
    const data = await this.read();
    const index = data.findIndex(i => i.id === id);
    data.splice(index, 1);
    await this.write(data);
  }

  async clear() {
    await this.write([]);
  }

  async find(query) {
    const data = await this.read();
    return data.filter(item => {
      for (const key in query) {
        if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  async findById(id) {
    const data = await this.read();
    return data.find(item => item.id === id);
  }
}
