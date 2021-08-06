"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axiosClientv = _interopRequireDefault(require("../../config/axiosClientv2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var questionApiV2 = {
  checkAnswer: function checkAnswer(id, answer) {
    var url, headers;
    return regeneratorRuntime.async(function checkAnswer$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "/questions/".concat(id, "/check?answer=").concat(answer);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              headers: headers
            }));

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  getAll: function getAll(params) {
    var url, headers;
    return regeneratorRuntime.async(function getAll$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = "/questions";
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context2.abrupt("return", _axiosClientv["default"].get(url, {
              params: params,
              headers: headers
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  getQuestion: function getQuestion(id) {
    var url, headers;
    return regeneratorRuntime.async(function getQuestion$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = "/questions/".concat(id);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context3.abrupt("return", _axiosClientv["default"].get(url, {
              headers: headers
            }));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  getFilter: function getFilter(filter, grammar) {
    var url, params, headers;
    return regeneratorRuntime.async(function getFilter$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = "/questions/all";
            params = {
              type: filter
            };

            if (grammar) {
              params.grammar = grammar;
            }

            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context4.abrupt("return", _axiosClientv["default"].get(url, {
              params: params,
              headers: headers
            }));

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  getFilterTwo: function getFilterTwo(params) {
    var url, headers;
    return regeneratorRuntime.async(function getFilterTwo$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            url = "/questions/all";
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context5.abrupt("return", _axiosClientv["default"].get(url, {
              params: params,
              headers: headers
            }));

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  getManage: function getManage(params, grammar, search) {
    var url, headers;
    return regeneratorRuntime.async(function getManage$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            url = "/questions/manage";

            if (search) {
              params.search = search;
            }

            if (grammar) {
              params.grammar = grammar;
            }

            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context6.abrupt("return", _axiosClientv["default"].get(url, {
              params: params,
              headers: headers
            }));

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  getAnalystic: function getAnalystic() {
    var url, headers;
    return regeneratorRuntime.async(function getAnalystic$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            url = "/questions/statistical";
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context7.abrupt("return", _axiosClientv["default"].get(url, {
              headers: headers
            }));

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  createQuestion: function createQuestion(body) {
    var url, headers;
    return regeneratorRuntime.async(function createQuestion$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            url = "/questions";
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context8.abrupt("return", _axiosClientv["default"].post(url, body, {
              headers: headers
            }));

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    });
  },
  updateQuestion: function updateQuestion(id, body) {
    var url, headers;
    return regeneratorRuntime.async(function updateQuestion$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            url = "/questions/".concat(id);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context9.abrupt("return", _axiosClientv["default"].put(url, body, {
              headers: headers
            }));

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    });
  },
  deleteQuestion: function deleteQuestion(id) {
    var url, headers;
    return regeneratorRuntime.async(function deleteQuestion$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            url = "/questions/".concat(id);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context10.abrupt("return", _axiosClientv["default"]["delete"](url, {
              headers: headers
            }));

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    });
  }
};
var _default = questionApiV2;
exports["default"] = _default;