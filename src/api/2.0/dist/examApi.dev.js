"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axiosClientv = _interopRequireDefault(require("../../config/axiosClientv2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var examApiv2 = {
  getAll: function getAll(params) {
    var url, headers;
    return regeneratorRuntime.async(function getAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "/exams";
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              params: params,
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
  getManage: function getManage(params) {
    var url, headers;
    return regeneratorRuntime.async(function getManage$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = "/exams/all";
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              params: params,
              headers: headers
            }));

          case 4:
            return _context2.abrupt("return", _context2.sent);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  get: function get(id) {
    var url, headers;
    return regeneratorRuntime.async(function get$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = "/exams/".concat(id);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context3.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              headers: headers
            }));

          case 4:
            return _context3.abrupt("return", _context3.sent);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  getAnalyze: function getAnalyze(id) {
    var url, headers;
    return regeneratorRuntime.async(function getAnalyze$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = "/exams/".concat(id, "/analyze");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context4.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              headers: headers
            }));

          case 4:
            return _context4.abrupt("return", _context4.sent);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  create: function create(body) {
    var url, headers;
    return regeneratorRuntime.async(function create$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            url = "/exams";
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context5.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].post(url, body, {
              headers: headers
            }));

          case 4:
            return _context5.abrupt("return", _context5.sent);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  createExamQuestion: function createExamQuestion(id, body) {
    var url, headers;
    return regeneratorRuntime.async(function createExamQuestion$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            url = "/exams/".concat(id, "/questions");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context6.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].post(url, body, {
              headers: headers
            }));

          case 4:
            return _context6.abrupt("return", _context6.sent);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  edit: function edit(id, body) {
    var url, headers;
    return regeneratorRuntime.async(function edit$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            url = "/exams/".concat(id);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context7.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].put(url, body, {
              headers: headers
            }));

          case 4:
            return _context7.abrupt("return", _context7.sent);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  doExam: function doExam(id) {
    var url, headers;
    return regeneratorRuntime.async(function doExam$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            url = "/exams/".concat(id, "/do");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context8.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              headers: headers
            }));

          case 4:
            return _context8.abrupt("return", _context8.sent);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    });
  },
  pauseExam: function pauseExam(id, currentQuestion) {
    var url, headers, params;
    return regeneratorRuntime.async(function pauseExam$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            url = "/exams/".concat(id, "/pause");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            params = {
              currentQuestion: currentQuestion
            };
            _context9.next = 5;
            return regeneratorRuntime.awrap(_axiosClientv["default"].put(url, null, {
              params: params,
              headers: headers
            }));

          case 5:
            return _context9.abrupt("return", _context9.sent);

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    });
  },
  resumeExam: function resumeExam(id) {
    var url, headers;
    return regeneratorRuntime.async(function resumeExam$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            url = "/exams/".concat(id, "/resume");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context10.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].put(url, null, {
              headers: headers
            }));

          case 4:
            return _context10.abrupt("return", _context10.sent);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    });
  },
  doneExam: function doneExam(id, body) {
    var url, headers;
    return regeneratorRuntime.async(function doneExam$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            url = "/exams/".concat(id, "/done");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context11.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].post(url, body, {
              headers: headers
            }));

          case 4:
            return _context11.abrupt("return", _context11.sent);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    });
  },
  getUserExams: function getUserExams(id, params) {
    var url, headers;
    return regeneratorRuntime.async(function getUserExams$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            url = "/exams/user/".concat(id);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context12.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              params: params,
              headers: headers
            }));

          case 4:
            return _context12.abrupt("return", _context12.sent);

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    });
  },
  publishChange: function publishChange(id, params) {
    var url, headers;
    return regeneratorRuntime.async(function publishChange$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            url = "/exams/".concat(id, "/publish/change");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context13.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].put(url, null, {
              params: params,
              headers: headers
            }));

          case 4:
            return _context13.abrupt("return", _context13.sent);

          case 5:
          case "end":
            return _context13.stop();
        }
      }
    });
  },
  "delete": function _delete(id) {
    var url, headers;
    return regeneratorRuntime.async(function _delete$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            url = "/exams/".concat(id);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context14.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"]["delete"](url, {
              headers: headers
            }));

          case 4:
            return _context14.abrupt("return", _context14.sent);

          case 5:
          case "end":
            return _context14.stop();
        }
      }
    });
  }
};
var _default = examApiv2;
exports["default"] = _default;