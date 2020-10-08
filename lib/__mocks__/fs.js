'use strict'
const fs = jest.genMockFromModule('fs');
function existsSync(val) {
    return val.indexOf('demon.test.config.js')!==-1
}
fs.existsSync = existsSync;
module.exports = fs;