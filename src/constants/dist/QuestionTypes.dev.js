"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapQuestionTypeToString = mapQuestionTypeToString;
exports.QuestionTypes = void 0;
var QuestionTypes = {
  Toeic: 'Toeic',
  Conversation: 'Conversation',
  Connection: 'Connection',
  Writing: 'Writing',
  FillOut: 'Fillout',
  Practice: 'Practice',
  Arrange: 'Arrange',
  Reading: 'Reading',
  Listening: 'Listening',
  Speaking: 'Speaking',
  Select: 'Select',
  Basic: 'Basic',
  Quiz: 'Quiz'
};
exports.QuestionTypes = QuestionTypes;

function mapQuestionTypeToString(type) {
  switch (type) {
    case QuestionTypes.Basic:
      return "Mặc định";

    case QuestionTypes.Arrange:
      return "Sắp xếp từ";

    case QuestionTypes.Connection:
      return "Nối từ";

    case QuestionTypes.Conversation:
      return "Hội thoại";

    case QuestionTypes.FillOut:
      return "Điền khuyết";

    case "Fillout":
      return "Điền khuyết";

    case QuestionTypes.Select:
      return "Điền khuyết - Lựa chọn";

    case QuestionTypes.Reading:
      return "Luyện đọc";

    case QuestionTypes.Listening:
      return "Luyện nghe";

    case QuestionTypes.Speaking:
      return "Luyện nói";

    case QuestionTypes.Toeic:
      return "Luyện Toeic";
  }
}