import ArrangeQuestion from "../../components/question/ArrangeQuestion";
import BasicQuestion from "../../components/question/BasicQuestion";
import ConnectionQuestion from "../../components/question/ConnectionQuestion";
import ConversationQuestion from "../../components/question/ConversationQuestion";
import FilloutQuestion from "../../components/question/FilloutQuestion";
import { QuestionTypes } from "../../constants/QuestionTypes";
import SelectQuestion from "./SelectQuestion";
import VoiceQuestion from "./VoiceQuestion";
const QuestionPreview = ({ question }) => {
  function switchAnswerDisplay(length) {
    if (length == 2) {
      return "d-flex flex-row";
    }
    return "d-flex flex-column";
  }
  console.log(question);
  function renderQuestion() {
    switch (question.type) {
      case QuestionTypes.Arrange:
        return (
          <ArrangeQuestion question={question} isReviewing={true} />
        );
      case QuestionTypes.Connection:
        return (
          <ConnectionQuestion question={question} isReviewing={true} />
        );
      case QuestionTypes.Conversation:
        return (
          <ConversationQuestion question={question} isReviewing={true} />
        );
      case QuestionTypes.FillOut:
        return (
          <FilloutQuestion question={question} isReviewing={true} />
        );
      case QuestionTypes.Select:
        return(
          <SelectQuestion question={question} isReviewing={true}></SelectQuestion>
        )
      case QuestionTypes.Speaking:
        return(
          <VoiceQuestion question={question} isReviewing={true}></VoiceQuestion>
        )
      default:
        return (
          <BasicQuestion
            switchAnswerDisplay={switchAnswerDisplay}
            question={question}
            isReviewing={true}
          />
        );
    }
  }

  return <div className="container script-panel">{question && renderQuestion()}</div>;
};
export default QuestionPreview;
