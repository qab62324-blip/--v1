import fs from 'fs';
import path from 'path';

class UltraDB {
  constructor(filename = 'system/database.json') {
    this.filename = filename;
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(this.filename)) {
        const content = fs.readFileSync(this.filename, 'utf-8');
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('❌ خطأ:', error.message);
    }
    return {};
  }

  save() {
    try {
      const dir = path.dirname(this.filename);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 2));
      return true;
    } catch (error) {
      return false;
    }
  }

  get(key, defaultValue = null) {
    return this.data[key] !== undefined ? this.data[key] : defaultValue;
  }

  set(key, value) {
    this.data[key] = value;
    return this.save();
  }

  delete(key) {
    if (this.data[key] !== undefined) {
      delete this.data[key];
      return this.save();
    }
    return false;
  }

  has(key) {
    return this.data[key] !== undefined;
  }

  all() {
    return this.data;
  }
}

export default UltraDB;
