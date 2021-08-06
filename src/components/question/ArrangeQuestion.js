import { useEffect, useState } from "react"
import parse from 'html-react-parser'
const ArrangeQuestion = ({ question, isLastQuestion, checkAnswer, isReviewing }) => {
    const [splitted, setSplitted] = useState([])
    const [arrange, setArrange] = useState([])
    console.log(question);
    useEffect(() => {
        console.log('?');
        setArrange([])
        if (question.content.trim().includes(" ")) {
            const splittedContent = question.content.trim().split(' ');
            console.log(splittedContent.sort(() => Math.random() - 0.5));
            setSplitted(splittedContent.sort(() => Math.random() - 0.5))
        } else {
            const splittedChar = question.content.trim().split('');
            console.log(splittedChar);
            setSplitted(splittedChar.sort(() => Math.random() - 0.5))
        }

    }, [question])
    useEffect(() => {
        if (isLastQuestion) {
            setArrange([])
            if (question.content.trim().includes(" ")) {
                const splittedContent = question.content.trim().split(' ');
                console.log(splittedContent.sort(() => Math.random() - 0.5));
                setSplitted(splittedContent.sort(() => Math.random() - 0.5))
            } else {
                const splittedChar = question.content.trim().split('');
                console.log(splittedChar);
                setSplitted(splittedChar.sort(() => Math.random() - 0.5))
            }
        }
    }, [isLastQuestion])
    function selectSplit(value, index) {
        splitted.splice(index, 1);
        setSplitted([...splitted])
        arrange.push(value);
        setArrange([...arrange])
        if (splitted.length == 0) {
            console.log('Hết rồi');
            if (question.content.trim().includes(" ")) {
                const answer = arrange.toString().replace(/,/gi, ' ') //Đáp án sau khi được nối lại
                if (!isReviewing) {
                    checkAnswer(answer)
                }

            }
            else {
                const answer = arrange.toString().replace(/,/gi, '') //Đáp án sau khi được nối lại
                if (!isReviewing) {
                    checkAnswer(answer)
                }
            }
        }
    }
    function reArrange(value, index) {
        splitted.push(value);
        setSplitted([...splitted])
        arrange.splice(index, 1);
        setArrange([...arrange])
    }
    console.log(splitted);
    return (
        <div className='container'>
            <div className='ml-1 mt-4 excercise-group border-secondary'>
                <div className='font-weight-bold text-dark text-center' style={{ fontSize: 25 }}>{parse(question.preQuestion || 'Sắp xếp theo đúng thứ tự')}</div>
                <div className='text-center'>
                    <small className='text-dark question-guide' style={{ fontSize: 15 }}>(Lựa chọn các từ/cụm từ để sắp xếp thành câu chính xác!)</small>
                </div>
                <div className='border rounded arrange-box bg-white mt-2'>
                    {arrange.map((answer, index) =>
                        <button disabled={splitted.length == 0 && !isReviewing} key={index} className='missing-box mr-2 mt-2 mb-2' onClick={() => reArrange(answer, index)}>{answer}</button>
                    )}
                </div>
            </div>
            <div className='arrange-box'>
                {splitted.map((split, index) =>
                    <button key={index} className='answer-card missing-box mr-3 mt-2 mb-2' onClick={() => selectSplit(split, index)}>{split} <div className='keyboard-shortcut'><div className='key'>{index + 1}</div></div></button>
                )}
            </div>
        </div>
    )
}
export default ArrangeQuestion