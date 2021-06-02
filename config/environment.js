const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '..', 'production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    assets_path: './assets',
    session_cookie_key: 'th980kl91278jkloip@kloaakash123%22',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
};

// const production = {
//     name: 'production',
//     assets_path: process.env.BLOGBERRY_ASSET_PATH,
//     session_cookie_key: process.env.BLOGBERRY_SESSION_COOKIE_KEY,
//     db: process.env.BLOGBERRY_DB,
//     morgan: {
//         mode: 'combined',
//         options: {stream: accessLogStream}
//     }
// }

// module.exports = eval(process.env.BLOGBERRY_ENVIRONMENT) == undefined ? development : eval(process.env.BLOGBERRY_ENVIRONMENT);
module.exports = development;