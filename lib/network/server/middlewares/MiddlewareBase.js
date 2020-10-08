var compression = require('compression'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser');

let MiddlewareBase = {
    configure: (app, config) => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false, limit: '100kb'}));
        app.use(logger(config.DEV ? 'combined' : 'short'));
        app.use(compression());
        app.use(cookieParser());
    }
}

module.exports = MiddlewareBase;
