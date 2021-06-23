import ArrangeQuestion from "../../components/question/ArrangeQuestion";
import BasicQuestion from "../../components/question/BasicQuestion";
import ConnectionQuestion from "../../components/question/ConnectionQuestion";
import ConversationQuestion from "../../components/question/ConversationQuestion";
import FilloutQuestion from "../../components/question/FilloutQuestion";
const QuestionPreview = ({question}) => {
    function switchAnswerDisplay(length) {
        if (length == 2) {
            return 'd-flex flex-row'
        }
        return 'd-flex flex-column'
    }
    function renderQuestion() {
        if (question.isConversationQuestion) {
            return (<ConversationQuestion question={question} isReviewing={true} />)
        }
        if (question.isFillOutQuestion) {
            return (<FilloutQuestion question={question} isReviewing={true} />)
        }
        if (question.isArrangeQuestion) {
            return (<ArrangeQuestion question={question} isReviewing={true} />)
        }
        if (question.isConnectionQuestion) {
            return <ConnectionQuestion question={question} isReviewing={true} />
        }
        return <BasicQuestion switchAnswerDisplay={switchAnswerDisplay} question={question} isReviewing={true} />
    }
    console.log(question);
    return (
        <div id="wrapper" style={{height: '700px'}}>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content" style={{ overflow: "hidden", height: "100vh" }}>
                    <main id="scroll">
                        <div className="container learning-layout">
                            <div className="container">
                                {question && renderQuestion()}
                               
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default QuestionPreview;