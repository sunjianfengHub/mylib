let createAxios = function(opt) {
  let _axios = new axios(opt);
  return _axios[opt["method"]](opt);
};

function mockPromise(opt) {
  switch (opt["url"]) {
    case "/success":
      return Promise.resolve({
        status: 200,
        data: {
          code: 200,
          message: "success",
          data: { a: 1, b: 2 }
        }
      });
      break;
    case "/success-string":
      return Promise.resolve({
        status: 200,
        data: {
          isSafe: true,
          data: "what is this is encrypted"
        }
      });
      break;
    case "/success-right":
      return Promise.resolve({
        status: 200,
        data: {
          isSafe: true,
          data:
            "1" +
            JSON.stringify({
              code: 200,
              message: "success",
              data: { a: "1", b: { bb: 1 } }
            })
        }
      });
      break;
    case "/success-empty":
      return Promise.resolve({
        status: 200,
        data: {
          isSafe: true,
          data: "1"
        }
      });
      break;
    case "/failure":
      return Promise.reject({
        response: {
          status: 500,
          headers: { header_1: 1 },
          data: { code: 500, message: "fail", data: {} }
        }
      });
      break;
    case "/failure-direct":
      return Promise.reject({
        request: {
          status: 0
        }
      });
      break;
    case "/failure-none":
      return Promise.reject({});
      break;
    case "/success-failure":
      return Promise.resolve({
        status: 200,
        data: { code: 500, message: "fail", data: {} }
      });
      break;
    default:
      return Promise.resolve({
        status: 200,
        data: {
          code: 200,
          message: "success",
          data: [{ a: 1 }, { b: 2 }, { c: 3 }]
        }
      });
  }
}

function axios(opt) {}
axios.prototype.post = mockPromise;
axios.prototype.put = mockPromise;
axios.prototype.delete = mockPromise;
axios.prototype.get = mockPromise;

module.exports = createAxios;
module.exports.default = createAxios;
