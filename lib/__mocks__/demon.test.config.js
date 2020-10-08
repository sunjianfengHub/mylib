let path = require('path'),
    demonConfig = jest.genMockFromModule('../demon.test.config.js');

demonConfig.server = {
    port: 8080
}
demonConfig.webpack = {
    dev: {
        config: {
            entry: './react_page/index.js',
        }
    }
}
module.exports = demonConfig;