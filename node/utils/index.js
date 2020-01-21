const fs = require('fs')

const readFile = (path) => {
    return new Promise((res, rej) => {
        fs.readFile(path, (err, data) => {
            if(err) return rej(err);
            return res(Buffer.isBuffer(data) ? data.toString() : data);
        })
    })
}
const writeFile = (path, data) => {
    return new Promise((res, rej) => {
        fs.writeFile(path, data, (err) => {
            if(err) return rej(err);
            return res();
        })
    })
}

module.exports = {
    readFile,
    writeFile,
}