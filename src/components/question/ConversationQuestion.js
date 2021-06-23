import React, { useEffect } from "react"
import { useState } from "react"
const temp = [1, 2, 3, 4, 5, 6]
const ConversationQuestion = ({ question, isLastQuestion, checkAnswer, isReviewing }) => {
    const [conversation, setConversation] = useState([])

    function getHiddenText(text) {
        var firstIndex = text.indexOf('<p>')
        var secondIndex = text.indexOf('</p>')
        return text.substring(firstIndex, secondIndex).replace(/(<([^>]+)>)/gi, "")
    }
    const [missingBoxes, setMissingBoxes] = useState([]);
    function generateLines() {
        const lines = []
        var i = 0;
        question.answers = question.answers.sort((a, b) => {
            const x = Number.parseInt(a.answer.slice(-3).replace(/[()]/gi, ""));
            const y = Number.parseInt(b.answer.slice(-3).replace(/[()]/gi, ""));
            return x - y;
        })
        console.log(question.answers);
        while (i < question.answers.length) {
            const line = {
                first: question.answers[i]?.answer,
                firstAnswer: '',
                second: question.answers[i + 1]?.answer,
                secondAnswer: ''
            }
            i += 2;
            lines.push(line)
        }
        setConversation(lines);
        const hidden = []
        for (var i = 0; i < lines.length; i++) {
            var firstMissing = getHiddenText(lines[i].first);
            var secondMissing = getHiddenText(lines[i].second);
            if (firstMissing) {
                hidden.push(firstMissing)
            }
            if (secondMissing) {
                hidden.push(secondMissing)
            }
        }
        setMissingBoxes([...hidden])
    }
    useEffect(() => {
        console.log('wtf');
        generateLines()
    }, [question])
    useEffect(() => {
        if (isLastQuestion) {
            generateLines()
        }
    }, [isLastQuestion])
    console.log(missingBoxes);
    function removeFirstBox(index) {
        const missingboxData = conversation[index].firstAnswer;
        conversation[index].firstAnswer = ''
        setMissingBoxes([...missingBoxes, missingboxData])
    }
    function removeSecondBox(index) {
        const missingboxData = conversation[index].secondAnswer;
        conversation[index].secondAnswer = ''
        setMissingBoxes([...missingBoxes, missingboxData])
    }
    function renderFirstLine(line, index) {
        var firstIndex = line.indexOf('<p>')
        var secondIndex = line.indexOf('</p>')
        var firstSubStr = line.substring(0, firstIndex);
        var secondSubStr = line.substring(secondIndex + 4, line.length);
        if (firstIndex != -1) {
            const div = React.createElement('div', {key: index + 1}, [React.createElement('img', { src: "https://www.w3schools.com/howto/img_avatar.png", className: 'chat-avatar', key: index + 3 }), firstSubStr, React.createElement('span', { className: 'missing-box text-dark', onClick: () => removeFirstBox(index), key: index + 5 }, [conversation[index].firstAnswer ? conversation[index].firstAnswer : ''])], secondSubStr);
            return (div)
        }
        else {
            const div = React.createElement('div', {key:index + 1}, [React.createElement('img', { src: "https://www.w3schools.com/howto/img_avatar.png", className: 'chat-avatar', key:index + 3 }), line]);
            return (div)
        }

    }
    function renderSecondLine(line, index) {
        var firstIndex = line.indexOf('<p>')
        var secondIndex = line.indexOf('</p>')
        var firstSubStr = line.substring(0, firstIndex);
        var secondSubStr = line.substring(secondIndex + 4, line.length);
        if (firstIndex != -1) {
            const div = React.createElement('div', {key:index + 2}, [firstSubStr, React.createElement('span', { className: 'missing-box text-dark', onClick: () => removeSecondBox(index), key:index + 4 }, [conversation[index].secondAnswer ? conversation[index].secondAnswer : ''])], secondSubStr, React.createElement('img', { src: "https://www.w3schools.com/howto/img_avatar.png", className: 'chat-avatar', key:index + 6 }));
            return (div)
        }
        else {
            const div = React.createElement('div', {key:index + 2}, [line, React.createElement('img', { src: "https://www.w3schools.com/howto/img_avatar.png", className: 'chat-avatar', key: index + 4 })]);
            return (div)
        }

    }
    function selectMissingBox(value, index) {
        console.log(value);
        console.log(missingBoxes);
        missingBoxes.splice(index, 1);
        setMissingBoxes([...missingBoxes])

        const unAnswerIndex = conversation.findIndex(con => con.firstAnswer == '' && con.first.search('<p>') != -1 || con.secondAnswer == '' && con.second.search('<p>') != -1);
        if (conversation[unAnswerIndex].first.search('<p>') != -1 && conversation[unAnswerIndex].firstAnswer == '') {
            conversation[unAnswerIndex].firstAnswer = value;
        } else {
            conversation[unAnswerIndex].secondAnswer = value;
        }
        if (missingBoxes.length == 0) {
            let answer = ''
            conversation.forEach((con, index) => {
                if (con.firstAnswer != '') {
                    answer += `<p>${con.firstAnswer}</p>_`
                }
                if (con.secondAnswer != '') {
                    answer += `<p>${con.secondAnswer}</p>_`
                }

            })
            console.log(answer);
            checkAnswer(answer)
        }
        setConversation([...conversation])
        console.log(conversation);
    }
    return (
        <div className='container'>
            <h2>Điền vào chỗ trống của đoạn hội thoại</h2>
            {conversation.map((script, index) =>
                <div className='container mt-4 text-dark' key={index}>
                    <div className='d-flex justify-content-start'>
                        <div>{renderFirstLine(script.first, index)}</div>  </div>
                    <div className='d-flex justify-content-end'>
                        <div>{renderSecondLine(script.second, index)}</div></div>
                </div>
            )}
            <div className='container hidden-box'>
                <div className="drawer-content">
                    <div className="page-wrap">
                        {missingBoxes.map((value, index) =>
                            <button disabled={isReviewing} key={index} onClick={() => selectMissingBox(value, index)} className='missing-box mr-4 mt-2 mb-2'>
                                {value}
                            </button>
                        )}
                    </div></div>
            </div>
        </div>
    )
}
export default ConversationQuestion