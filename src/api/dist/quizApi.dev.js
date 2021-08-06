"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axiosClient = _interopRequireDefault(require("../config/axiosClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var quizApi = {
  getAll: function getAll(params) {
    var url = "/quizzes";
    return _axiosClient["default"].get(url, {
      params: params
    });
  },
  getDetail: function getDetail(id) {
    var url = "/quizzes/".concat(id);
    return _axiosClient["default"].get(url, {
      validateStatus: function validateStatus() {
        return true;
      }
    });
  },
  create: function create(body) {
    var url = "/quizzes";
    return _axiosClient["default"].post(url, body);
  },
  doQuiz: function doQuiz(id) {
    var token = localStorage.getItem('token');
    var headers = {
      authorization: "Bearer " + token
    };
    console.log(headers);
    var url = "sections/".concat(id, "/do");
    return _axiosClient["default"].get(url, {
      headers: headers
    });
  },
  doneQuiz: function doneQuiz(id, body) {
    var token = localStorage.getItem('token');
    var headers = {
      authorization: "Bearer " + token
    };
    var url = "/quizzes/".concat(id, "/done");
    return _axiosClient["default"].post(url, {
      headers: headers
    });
  },
  update: function update(id, body) {
    var url = "/quizzes/".concat(id);
    return _axiosClient["default"].put(url, body);
  },
  "delete": function _delete(id, body) {
    var url = "/quizzes/".concat(id);
    return _axiosClient["default"]["delete"](url, body);
  },
  addQuestionToquiz: function addQuestionToquiz(quizId, questionId) {
    var url = "/quizzes/".concat(quizId, "/questions/").concat(questionId);
    return _axiosClient["default"].put(url);
  }
};
var _default = quizApi;
exports["default"] = _default;