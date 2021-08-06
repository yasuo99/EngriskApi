import React, { useEffect } from "react"
import { useState } from "react"
import parse from 'html-react-parser'
import ReactPlayer from "react-player";
import CircleControls from "react-player-circle-controls";
import "react-player-circle-controls/dist/styles.css";
const temp = [1, 2, 3, 4, 5, 6]
const ConversationQuestion = ({ question, isLastQuestion, checkAnswer, isReviewing }) => {
    const [conversation, setConversation] = useState([])
    const [users, setUsers] = useState({
        firstUser: '',
        secondUser: ''
    });
    const [playing, setPlaying] = useState(false);
    const [playerState, setPlayerState] = useState({
        played: 0,
        loaded: 0,
    });
    function getHiddenText(text) {
        if (text) {
            var firstIndex = text.indexOf('<p>')
            var secondIndex = text.indexOf('</p>')
            return text.substring(firstIndex, secondIndex).replace(/(<([^>]+)>)/gi, "")
        }

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
            const temp = JSON.parse(question.answers[i]?.answer);
            console.log(temp);
            setUsers({
                firstUser: temp.firstUser,
                secondUser: temp.secondUser
            })
            const line = {
                first: temp.firstLine,
                firstAnswer: '',
                second: temp.secondLine,
                secondAnswer: ''
            }
            i += 1;
            lines.push(line)
        }
        console.log(lines);
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
        setMissingBoxes([...hidden.sort(() => Math.random() - 0.5)])
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

        if (conversation[index].firstAnswer != '') {
            const missingboxData = conversation[index].firstAnswer;
            conversation[index].firstAnswer = ''
            setMissingBoxes([...missingBoxes, missingboxData])
        }


    }
    function removeSecondBox(index) {
        if (conversation[index].secondAnswer != '') {
            const missingboxData = conversation[index].secondAnswer;
            conversation[index].secondAnswer = ''
            setMissingBoxes([...missingBoxes, missingboxData])
        }
    }
    function renderFirstLine(line, index) {
        if (line) {
            var firstIndex = line.indexOf('<p>')
            var secondIndex = line.indexOf('</p>')
            var firstSubStr = line.substring(0, firstIndex);
            var secondSubStr = line.substring(secondIndex + 4, line.length);
            if (firstIndex != -1) {
                const div = React.createElement('div', { key: index + 1, className: 'd-flex' },
                    [React.createElement('img', { src: "https://cdn.busuu.com/media/resized/character/98/alessandro_1578491741_98.jpg", className: 'chat-avatar mr-1', key: index + 3 }),
                    [React.createElement('div', { className: 'ml-2 dialog-content' }, [React.createElement('div', { className: 'font-italic' }, users.firstUser), firstSubStr, React.createElement('button', { className: 'missing-box-2 text-dark', onClick: () => removeFirstBox(index), key: index + 5, disabled: missingBoxes.length == 0 }, [conversation[index].firstAnswer ? conversation[index].firstAnswer : '']), secondSubStr])],
                    ],
                );
                return (div)
            }
            else {
                const div = React.createElement('div', { key: index + 1, className: line.includes('<hidden></hidden>') ? 'hidden' : '' }, [React.createElement('img', { src: "https://www.w3schools.com/howto/img_avatar.png", className: 'chat-avatar', key: index + 5 }), line]);
                return (div)
            }
        }


    }
    function renderSecondLine(line, index) {
        if (line) {
            var firstIndex = line.indexOf('<p>')
            var secondIndex = line.indexOf('</p>')
            var firstSubStr = line.substring(0, firstIndex);
            var secondSubStr = line.substring(secondIndex + 4, line.length);
            if (firstIndex != -1) {
                const div = React.createElement('div', { key: index + 2, className: 'd-flex' }, [
                    React.createElement('div', { className: 'mr-2 dialog-content' }, [
                        React.createElement('div', { className: 'd-flex justify-content-end font-italic' }, users.secondUser),
                        firstSubStr,
                        React.createElement('button', { className: 'missing-box-2 text-dark', onClick: () => removeSecondBox(index), key: index + 4, disabled: missingBoxes.length == 0 }, [conversation[index].secondAnswer ? conversation[index].secondAnswer : '']),
                        secondSubStr
                    ])
                    ,
                    React.createElement('img', { src: "https://cdn.busuu.com/v1.0/jpgunitsmall1/media/img/lauren_1470910544.jpg", className: 'chat-avatar', key: index + 6 })]);
                return (div)
            }
            else {
                const div = React.createElement('div', { key: index + 2, className: 'd-flex' }, [
                    React.createElement('div', { className: 'mr-2 dialog-content' }, [
                        React.createElement('div', { className: 'd-flex justify-content-end font-italic' }, users.secondUser),
                        line]), React.createElement('img', { src: "https://cdn.busuu.com/v1.0/jpgunitsmall1/media/img/lauren_1470910544.jpg", className: 'chat-avatar', key: index + 6 })]);
                return (div)
            }
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
            if (!isReviewing) {
                checkAnswer(answer)
            }

        }
        setConversation([...conversation])
        console.log(conversation);
    }
    return (
        <div className='container'>
            <div className='container'>
                <div className='font-weight-bold text-dark'>{parse(question.preQuestion || 'Điền vào đoạn hội thoại')}</div>

            </div>
            <span>{question.audio && <div className="d-flex justify-content-center">
                <ReactPlayer
                    url={question.audio}
                    playing={playing}
                    height="0"
                    width="0"
                    onProgress={setPlayerState}
                    onEnded={() => { setPlaying(false) }}
                />
                <CircleControls
                    played={playerState.played}
                    loaded={playerState.loaded}
                    playing={playing}
                    onTogglePlaying={() => { { setPlaying(!playing) } }}
                />
            </div>}</span>
            {conversation.map((script, index) =>
                <div className='container mt-4 text-dark' key={index}>
                    <div className='d-flex justify-content-start'>
                        <div>{renderFirstLine(script.first, index)}</div>  </div>
                    <div className='d-flex justify-content-end'>
                        <div>{renderSecondLine(script.second, index)}</div></div>
                </div>
            )}
            <div className='container hidden-box mt-2'>
                <div className='border rounded'>
                    <div className="page-wrap d-flex justify-content-center">
                        {missingBoxes.map((value, index) =>
                            <button key={index} onClick={() => selectMissingBox(value, index)} className='missing-box mr-3 mt-2 mb-2'>
                                {value}
                                <div className='keyboard-shortcut'>
                                    <div className='key'>
                                        {index + 1}
                                    </div>
                                </div>
                            </button>
                        )}
                    </div></div>
            </div>
        </div>
    )
}
export default ConversationQuestion