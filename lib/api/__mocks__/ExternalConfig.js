let ExternalConfig = jest.genMockFromModule('../ExternalConfig.js')
let demonConfig = {};

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

function getExternalConfig(filename) {
	if (!filename || filename.indexOf('demon.test.config.js') > -1) {
		return demonConfig;
	} else {
		return {};
	}
}

ExternalConfig.getExternalConfig = getExternalConfig;

module.exports = ExternalConfig;