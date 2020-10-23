let fsPros = require('fs').promises;
let path = require('path');

async function handleHTML () {
    let html = await fsPros.readFile(path.resolve(__dirname, 'iconfont', 'demo_index.html'), { encoding: 'utf-8' });
    html = html.replace('https://a1.alicdn.com/oss/uploads/2018/12/26/7bfddb60-08e8-11e9-9b04-53e73bb6408b.js', './assets/jQuery.min.js');
    html = html.replace('https://a1.alicdn.com/oss/uploads/2018/12/26/a3f714d0-08e6-11e9-8a15-ebf944d7534c.js', './assets/prism.js');
    html = html.replace('https://g.alicdn.com/thx/cube/1.3.2/cube.min.css', './assets/cube.min.css');
    await fsPros.writeFile(path.resolve(__dirname, 'iconfont', 'demo_index.html'), html);
}

async function copyAssets () {
    let files = await fsPros.readdir(path.resolve(__dirname, 'assets'));
    try {
        await fsPros.mkdir(path.resolve(__dirname, 'iconfont', 'assets'));
    } catch (err) {}
    for (let file of files) {
        await fsPros.copyFile(path.resolve(__dirname, 'assets', file), path.resolve(__dirname, 'iconfont', 'assets', file));
    }
}

async function main () {
    await handleHTML();
    await copyAssets();
}

main()
    .catch(err => console.log(err))

