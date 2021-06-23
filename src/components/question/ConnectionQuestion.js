import { useEffect, useRef } from "react";
import { useState } from "react";
import randomColor from 'randomcolor'
const ConnectionQuestion = ({ question, checkAnswer, isLastQuestion, isReviewing }) => {
    const [firstCol, setFirstcol] = useState([])
    const [secondCol, setSecondCol] = useState([])
    const [answers, setAnswers] = useState([])
    const [secondWaiting, setSecondWaiting] = useState(false);
    const [firstWaiting, setFirstWaiting] = useState(false);
    const tempAnswers = useRef(null);
    useEffect(() => {
        if(isLastQuestion){
            setAnswers([])
        }
    },[isLastQuestion])
    useEffect(() => {
        const tempFirst = []
        const tempSecond = []
        for (var i = 0; i < question.answers.length; i++) {
            console.log(i);
            const answer = question.answers[i].answer;
            var n = answer.indexOf("</p>");
            var m = answer.indexOf("<p>");
            const firstWord = answer.substring(m, n)
            const secondWord = answer.substring(n, answer.length)
            const firstStr = firstWord.replace(/(<([^>]+)>)/gi, "");
            const secondStr = secondWord.replace(/(<([^>]+)>)/gi, "");
            tempFirst.push(firstStr)
            tempSecond.push(secondStr)
        }
        setFirstcol(tempFirst.sort(() => Math.random() - 0.3))
        setSecondCol(tempSecond.sort(() => Math.random() - 0.7))
    }, [question])
    function SerializeAnswers() {
        let serializedAnswer = ''
        answers.forEach((answer) => {
            serializedAnswer += `<p>${answer.first}</p><p>${answer.second}</p>_`
        }
        )
        checkAnswer(serializedAnswer);
        console.log(serializedAnswer);
    }
    function FirstColClick(value) {
        if (!firstWaiting) {

            const answer = {
                first: value,
                second: '',
                color: randomColor()
            };
            console.log('first pick ', answer);
            setAnswers([...answers, answer])
            setSecondWaiting(true)
        } else {
            console.log('first as second pick');
            const index = answers.findIndex(ans => ans.first == '');
            const newAnswers = answers;
            newAnswers[index].first = value;
            setAnswers([...newAnswers])
            setSecondWaiting(false);
            setFirstWaiting(false);
            if (answers.length == question.answers.length) {
                SerializeAnswers()
            }
        }
    }
    function SecondColClick(value) {
        if (!secondWaiting) {
            const answer = {
                second: value,
                first: '',
                color: randomColor()
            };
            console.log('second as first pick ', answer);
            setAnswers([...answers, answer])
            setFirstWaiting(true)
        } else {
            console.log('second pick');
            const index = answers.findIndex(ans => ans.second == '');
            const newAnswers = answers;
            newAnswers[index].second = value;
            setAnswers([...newAnswers])
            setFirstWaiting(false)
            setSecondWaiting(false)
            if (answers.length == question.answers.length) {
                SerializeAnswers()
            }
        }
    }
    return (
        <div>
            <h2>{question.preQuestion}</h2>
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col'>
                        {firstCol.map((word, index) =>
                            <button style={{ backgroundColor: answers.find(ans => ans.first == word)?.color }} key={index} onClick={() => FirstColClick(word)} disabled={answers.some(ans => ans.first == word) || isReviewing} className={index == 0 ? 'connection-card w-100' : 'connection-card mt-4 w-100'}>
                                {word}
                            </button>
                        )}
                    </div>
                    <div className='col'>
                        {secondCol.map((word, index) =>
                            <button style={{ backgroundColor: answers.find(ans => ans.second == word)?.color }} key={index} onClick={() => SecondColClick(word)} disabled={answers.some(ans => ans.second == word) || isReviewing} className={index == 0 ? 'connection-card w-100' : 'connection-card mt-4 w-100'}>
                                {word}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ConnectionQuestion