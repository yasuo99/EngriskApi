"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axiosClientv = _interopRequireDefault(require("../../config/axiosClientv2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var wordApiV2 = {
  getAll: function getAll(params) {
    var url, headers;
    return regeneratorRuntime.async(function getAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "/words";
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context.abrupt("return", _axiosClientv["default"].get(url, {
              params: params,
              headers: headers
            })["catch"](function (err) {
              console.log(err);
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  createWord: function createWord(body) {
    var url, headers;
    return regeneratorRuntime.async(function createWord$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = "/words";
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context2.abrupt("return", _axiosClientv["default"].post(url, body, {
              headers: headers
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  createExample: function createExample(id, body) {
    var url, headers;
    return regeneratorRuntime.async(function createExample$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = "/words/".concat(id, "/examples");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context3.abrupt("return", _axiosClientv["default"].post(url, body, {
              headers: headers
            }));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  createMem: function createMem(id, body) {
    var url, headers;
    return regeneratorRuntime.async(function createMem$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = "/words/".concat(id, "/memories");
            headers = {
              Authorization: "bearer ".concat(localStorage.getItem('token'))
            };
            return _context4.abrupt("return", _axiosClientv["default"].post(url, body, {
              headers: headers
            })["catch"](function (err) {
              console.log(err);
            }));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  updateWord: function updateWord(id, body) {
    var url, headers;
    return regeneratorRuntime.async(function updateWord$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            url = "/words/".concat(id);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context5.abrupt("return", _axiosClientv["default"].put(url, body, {
              headers: headers
            }));

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  deleteWord: function deleteWord(id) {
    var url, headers;
    return regeneratorRuntime.async(function deleteWord$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            url = "/words/".concat(id);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            return _context6.abrupt("return", _axiosClientv["default"]["delete"](url, {
              headers: headers
            }));

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  selectMemory: function selectMemory(id, memId) {
    var url, headers;
    return regeneratorRuntime.async(function selectMemory$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            url = "/words/".concat(id, "/memories/").concat(memId);
            headers = {
              Authorization: "bearer ".concat(localStorage.getItem('token'))
            };
            return _context7.abrupt("return", _axiosClientv["default"].put(url, null, {
              headers: headers
            })["catch"](function (err) {
              console.log(err);
            }));

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  vocabularyReview: function vocabularyReview(words) {
    var url, headers;
    return regeneratorRuntime.async(function vocabularyReview$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            url = "/words/review";
            headers = {
              Authorization: "bearer ".concat(localStorage.getItem('token'))
            };
            _context8.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].post(url, words, {
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
  getAllPracticeQuestion: function getAllPracticeQuestion(id) {
    var url, headers;
    return regeneratorRuntime.async(function getAllPracticeQuestion$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            url = "/words/".concat(id, "/questions");
            headers = {
              Authorization: "bearer ".concat(localStorage.getItem('token'))
            };
            _context9.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              headers: headers
            }));

          case 4:
            return _context9.abrupt("return", _context9.sent);

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    });
  },
  getVocabularyForScript: function getVocabularyForScript(query) {
    var url, headers, params;
    return regeneratorRuntime.async(function getVocabularyForScript$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            url = "/words/inserted";
            headers = {
              Authorization: "bearer ".concat(localStorage.getItem('token'))
            };
            params = {
              search: query
            };
            _context10.next = 5;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              params: params,
              headers: headers
            }));

          case 5:
            return _context10.abrupt("return", _context10.sent);

          case 6:
          case "end":
            return _context10.stop();
        }
      }
    });
  },
  changeStatus: function changeStatus(id, status) {
    var url, headers, params;
    return regeneratorRuntime.async(function changeStatus$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            url = "/words/".concat(id, "/publish/change");
            headers = {
              Authorization: "bearer ".concat(localStorage.getItem('token'))
            };
            params = {
              status: status
            };
            _context11.next = 5;
            return regeneratorRuntime.awrap(_axiosClientv["default"].put(url, null, {
              params: params,
              headers: headers
            }));

          case 5:
            return _context11.abrupt("return", _context11.sent);

          case 6:
          case "end":
            return _context11.stop();
        }
      }
    });
  }
};
var _default = wordApiV2;
exports["default"] = _default;