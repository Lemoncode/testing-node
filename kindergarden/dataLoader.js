const fs = require('fs');

class DataLoader {
    constructor(filePath) {
        this.filePath = filePath;
    }

    getBabys(cb) {
        const _cb = () => {};
        cb = cb || _cb;
        return new Promise((res, rej) => {
            fs.readFile(`${this.filePath}`, (err, data) => {
                if (!err) {
                    const _data = JSON.parse(data);
                    cb(null, _data);
                    res(_data);
                    return;
                }
                cb(err, null);
                rej(err);
            });
        });
    }
}

module.exports = DataLoader;
