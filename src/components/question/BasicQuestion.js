import { useEffect } from "react"

const BasicQuestion = ({ question, switchAnswerDisplay, checkAnswer, renderAnswerClass, checked, isLastQuestion, reset, isReviewing }) => {
    useEffect(() => {
        if(isLastQuestion){
            reset()
        }
    },[isLastQuestion])
    return (
        <div>
            <img
                className="img-fluid rounded mx-auto d-block ex-img fluid-content-item mt-1"
                src='https://cdn.busuu.com/media/resized/entity/1440/company_1528111874_1440.jpg'
            ></img>

            <h2>{question.preQuestion}</h2>
            <h3 className='text-dark'>{question.content}</h3>
            <div className={switchAnswerDisplay(question.answers.length)}>
                {question.answers.map((answer, index) => (
                    <button disabled={isReviewing} key={index} value={answer.answer} disabled={checked} className={'answer-card mt-2 ' + renderAnswerClass(index)} data-id={index} onClick={(e) => checkAnswer(answer.answer, index)}>
                        {answer.answer}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default BasicQuestion