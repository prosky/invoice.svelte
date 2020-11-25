const path = require('path')

const ROOT_DIR = __dirname;
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');

module.exports = {
    resolve: {
        alias: {
            '@src': SRC_DIR,
            '@app': path.resolve(SRC_DIR, 'app'),
            '@components': path.resolve(SRC_DIR, 'components'),
        },
    },
}
