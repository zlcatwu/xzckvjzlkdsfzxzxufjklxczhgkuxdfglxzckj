const axios = require('axios');
const fsPros = require('fs').promises;
const fs = require('fs');
const path = require('path');

const utils = require('./utils');

async function downloadZip (id) {
    const URL = 'https://www.iconfont.cn/api/project/download.zip';
    let res = await axios.get(URL, {
        responseType: 'stream',
        headers: { cookie: utils.cookie },
        params: { pid: id },
        timeout: 60 * 1000
    });
    try {
        await fsPros.mkdir(path.resolve(__dirname, 'temp'));
    } catch (_) {}
    let ws = fs.createWriteStream(path.resolve(__dirname, 'temp', 'iconfont.zip'));
    res.data.pipe(ws);
    ws.once('close', () => {
        console.log('download done.');
    });
}

downloadZip(utils.id);
