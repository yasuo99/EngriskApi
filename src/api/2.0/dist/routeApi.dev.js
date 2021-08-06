"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axiosClientv = _interopRequireDefault(require("../../config/axiosClientv2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routeApi = {
  adminGetAll: function adminGetAll(params) {
    var url, headers;
    return regeneratorRuntime.async(function adminGetAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "/routes";
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              headers: headers,
              params: params
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
  getOverview: function getOverview() {
    var url, headers;
    return regeneratorRuntime.async(function getOverview$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = "/routes/overview";
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
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
  getAllEngriskRoute: function getAllEngriskRoute(id) {
    var url, headers;
    return regeneratorRuntime.async(function getAllEngriskRoute$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = "/routes/users/".concat(id);
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
  getNearestFinishRoute: function getNearestFinishRoute(id) {
    var url, headers;
    return regeneratorRuntime.async(function getNearestFinishRoute$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = "/routes/users/".concat(id, "/nearest-finish");
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
  getAnonymousRoute: function getAnonymousRoute() {
    var url;
    return regeneratorRuntime.async(function getAnonymousRoute$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            url = "/routes/anonymous";
            _context5.next = 3;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url));

          case 3:
            return _context5.abrupt("return", _context5.sent);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  userGetAll: function userGetAll(id, pagination, isPrivate, status) {
    var url, headers, params;
    return regeneratorRuntime.async(function userGetAll$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            url = "/routes/users/".concat(id, "/manage");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            params = {
              currentPage: pagination.currentPage,
              pageSize: pagination.pageSize,
              isPrivate: isPrivate,
              status: status
            };
            return _context6.abrupt("return", _axiosClientv["default"].get(url, {
              headers: headers,
              params: params
            }));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  shareRoute: function shareRoute(id) {
    var url, headers;
    return regeneratorRuntime.async(function shareRoute$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            url = "/routes/users/".concat(id);
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
  getRouteSections: function getRouteSections(id) {
    var url, headers;
    return regeneratorRuntime.async(function getRouteSections$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            url = "/routes/".concat(id);
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
  getRouteAnalyze: function getRouteAnalyze(id) {
    var url, headers;
    return regeneratorRuntime.async(function getRouteAnalyze$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            url = "/routes/".concat(id, "/analyze");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
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
  createRoute: function createRoute(body) {
    var url;
    return regeneratorRuntime.async(function createRoute$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            url = "/routes";
            _context10.next = 3;
            return regeneratorRuntime.awrap(_axiosClientv["default"].post(url, body));

          case 3:
            return _context10.abrupt("return", _context10.sent);

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    });
  },
  updateRoute: function updateRoute(id, body) {
    var url, headers;
    return regeneratorRuntime.async(function updateRoute$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            url = "/routes/".concat(id);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context11.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].put(url, body, {
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
  deleteRoute: function deleteRoute(id) {
    var url, headers;
    return regeneratorRuntime.async(function deleteRoute$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            url = "/routes/".concat(id);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context12.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"]["delete"](url, {
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
  changeRouteStatus: function changeRouteStatus(id, accountId) {
    var url, headers;
    return regeneratorRuntime.async(function changeRouteStatus$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            url = "/routes/".concat(id, "/users/").concat(accountId, "/status");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context13.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].put(url, {
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
  publishRoute: function publishRoute(id, status) {
    var url, params, headers;
    return regeneratorRuntime.async(function publishRoute$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            url = "/routes/".concat(id, "/publish/change");
            params = {
              status: status
            };
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context14.next = 5;
            return regeneratorRuntime.awrap(_axiosClientv["default"].put(url, null, {
              params: params,
              headers: headers
            }));

          case 5:
            return _context14.abrupt("return", _context14.sent);

          case 6:
          case "end":
            return _context14.stop();
        }
      }
    });
  },
  editSectionsRoute: function editSectionsRoute(id, sections) {
    var url, headers;
    return regeneratorRuntime.async(function editSectionsRoute$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            url = "/routes/".concat(id, "/sections");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context15.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].put(url, sections, {
              headers: headers
            }));

          case 4:
            return _context15.abrupt("return", _context15.sent);

          case 5:
          case "end":
            return _context15.stop();
        }
      }
    });
  },
  routeLearn: function routeLearn(routeId, sectionId, scriptId) {
    var url, headers;
    return regeneratorRuntime.async(function routeLearn$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            url = "/routes/".concat(routeId, "/sections/").concat(sectionId, "/scripts/").concat(scriptId);
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context16.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              headers: headers
            }));

          case 4:
            return _context16.abrupt("return", _context16.sent);

          case 5:
          case "end":
            return _context16.stop();
        }
      }
    });
  },
  requestCertificate: function requestCertificate(routeId) {
    var url, headers;
    return regeneratorRuntime.async(function requestCertificate$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            url = "/routes/".concat(routeId, "/certificate/check");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context17.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              headers: headers
            }));

          case 4:
            return _context17.abrupt("return", _context17.sent);

          case 5:
          case "end":
            return _context17.stop();
        }
      }
    });
  },
  submitCertificateRequest: function submitCertificateRequest(routeId, params) {
    var url, headers;
    return regeneratorRuntime.async(function submitCertificateRequest$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            url = "/routes/".concat(routeId, "/certificate/claim");
            headers = {
              Authorization: "Bearer ".concat(localStorage.getItem('token'))
            };
            _context18.next = 4;
            return regeneratorRuntime.awrap(_axiosClientv["default"].get(url, {
              params: params,
              headers: headers
            }));

          case 4:
            return _context18.abrupt("return", _context18.sent);

          case 5:
          case "end":
            return _context18.stop();
        }
      }
    });
  }
};
var _default = routeApi;
exports["default"] = _default;