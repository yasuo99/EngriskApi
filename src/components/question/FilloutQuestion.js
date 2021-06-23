import { useEffect, useState } from "react";

const FilloutQuestion = ({ question, checked, checkAnswer, isLastQuestion, isReviewing }) => {
    const [value, setValue] = useState('');
    useEffect(() => {
        if (isLastQuestion) {
            setValue('')
        }
    }, [isLastQuestion])
    function EnterPress(e) {
        if (e.key == 'Enter' && e.target.value != '') {
            checkAnswer(e.target.value)
        }
    }
    return (
        <div className='ml-1 mt-4'>
            <h2>{question.preQuestion}</h2>
            <h3 className='text-dark'>{question.content}</h3>
            <input value={value} type='text' disabled={checked || isReviewing} className='form-control' onKeyDown={(e) => EnterPress(e)} onChange={(e) => setValue(e.target.value)} />
        </div>)

}
export default FilloutQuestion