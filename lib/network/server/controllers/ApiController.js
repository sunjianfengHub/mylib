let RequestIP = require('request-ip');
let BaseController = require('./BaseController');
let externalConfig = require('../../../api/ExternalConfig');

class ApiController extends BaseController {
	constructor(setting) {
		super(setting);
        this.hideHttpLog = externalConfig.getExternalConfig().hideHttpLog || false;
	}
/* 	splitUrl(req) {
		let { ipPass } = this.Setting, re = null;
		return ipPass.type == 'path' && req.headers.referer && req.headers.referer.match(/^(https?:\/\/).*\/((\d{1,3}\.){3}\d{1,3}(:\d{1,5})?).?/) ||
			(ipPass.type == 'query' && req.headers.referer && (re = new RegExp('^(https?://).*' + (ipPass.queryKey || 'ip') + '=((\\d{1,3}\\.){3}\\d{1,3}([^:]\\W|(:\\d{1,5})?))'), req.headers.referer.match(re)))
			|| [];
	}
	ipFilter(req) {
		let ip_keys = req.header("ip_keys"), referArr = this.splitUrl(req);
		// DEV mode and exist address in path use refer array
		// neither these two check ips_key header existed, default use global IP
		if (referArr.length > 0 && this.Setting.DEV) {
			this.setHost(referArr[1] + referArr[2]);
		} else {
			ip_keys ? this.setHost(this.Setting[ip_keys]) : this.resetHost();
		}
	} */
	mainEntry() {
		return (req, res, next) => {
			let path = req.originalUrl.replace('/api',''), body = req.body ? req.body : {},
				refLink = !!parseInt(req.header('refLink')), url = '', heads = {};
			// this.ipFilter(req);
			global.getMappedAddr && this.checkAddrMap(req);
			console.log("====请求中转中====");
			let reqType = this.CheckReqTypeExist(req);
			url = !refLink ? this.CreateReqUri(path) : path;
			// if request type is get, construct body to query params cuz GET method doesn't have body param
			// if (reqType === 'get') {
			// 	url = url + this.CreateParamString(req, true);
			// }

            if(!this.hideHttpLog){
                console.log("====请求 path:" + path);
                console.log("====请求 url:" + url);
                console.log("====请求 body/form====");
                console.log(body);
            }

			// console.log("====请求 form 格式化之后:" + decodeURIComponent(JSON.stringify(body)));

			heads = this.StructHeader(req);
            heads['x-real-ip'] = RequestIP.getClientIp(req);
            // heads['host'] = req.header('host');

            if(!this.hideHttpLog){
                console.log("====请求 headers====");
                console.log(heads)
            }

			// console.log("====请求 accessToken:" + JSON.stringify(heads));
			// console.log("====请求 accessToken:" + heads.accesstoken);
			// console.log("====请求 authorization:" + heads.authorization);
			// console.log("====请求 accessToken 格式化之后:" + decodeURIComponent(heads.accesstoken));

			this.SendRequest(
				req.method.toLowerCase(),
				{
					url: url,
					headers: heads,
					json: true,
					forever:true,
					body: body
				},
				res, path
			);
		}
	}
}

module.exports = ApiController;