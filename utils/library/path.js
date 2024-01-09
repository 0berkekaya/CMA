const path = require('path');

function appPath() {
    // __filename, __dirname değişkenleri mevcut dosyanın yolunu içerir.
    const currentFilePath = __filename;

    // path.join veya path.resolve kullanarak bir üst dizine çıkın
    const parentDirectory = path.join(path.dirname(currentFilePath), '../../src/app');

    return parentDirectory;
}

module.exports = appPath;
