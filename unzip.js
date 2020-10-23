const path = require('path');
const extract = require('extract-zip');
const fsPros = require('fs').promises;

async function main (filepath) {
    let folderName;
    await extract(filepath, {
        dir: path.resolve(__dirname, 'temp'),
        onEntry: (entry) => {
            !folderName && (folderName = entry.fileName.replace('/', ''))
        }
    });
    let files = await fsPros.readdir(path.resolve(__dirname, 'temp', folderName));
    try {
        await fsPros.mkdir(path.resolve(__dirname, 'iconfont'));
    } catch (err) {}
    for (let file of files) {
        await fsPros.rename(path.resolve(__dirname, 'temp', folderName, file), path.resolve(__dirname, 'iconfont', file));
    }
    await fsPros.rmdir(path.resolve(__dirname, 'temp', folderName));
}

main(path.resolve(__dirname, 'temp', 'iconfont.zip'))
    .catch(err => console.log(err))
