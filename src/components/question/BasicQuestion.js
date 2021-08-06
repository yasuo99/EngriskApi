import { useEffect, useState } from "react"
import ReactPlayer from "react-player";
import CircleControls from "react-player-circle-controls";
import "react-player-circle-controls/dist/styles.css";
import parse from 'html-react-parser'
const BasicQuestion = ({ question, switchAnswerDisplay, checkAnswer, renderAnswerClass, checked, isLastQuestion, reset, isReviewing }) => {
  useEffect(() => {
    if (isLastQuestion) {
      reset()
    }
  }, [isLastQuestion])
  const [playing, setPlaying] = useState(false);
  const [playerState, setPlayerState] = useState({
    played: 0,
    loaded: 0,
  });
  return (
    <div>
      <div className='ml-1 mt-4 excercise-group border-secondary'>
        {question.photoUrl && <img
          className="responsive question-box-img img-fluid rounded mx-auto d-block ex-img mt-1"
          src={question.photoUrl}
        ></img>}

        <div className='text-dark font-weight-bold all-preQuestion'>{parse(question.preQuestion || 'Chọn đáp án đúng')}</div>
        <br></br>
        <div className='all-question-content font-weight-bold mt-1'>{parse(question.content || '')}
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
          </div>}</span></div>
      </div>
      <div className={switchAnswerDisplay(question.answers.length)}>
        {question.answers.map((answer, index) => (
          <button key={index} value={answer.answer} disabled={checked || isReviewing} className={`answer-card mt-4 ${!isReviewing && renderAnswerClass(index)} `} data-id={index} onClick={(e) => checkAnswer(answer.answer, index)}>
            {answer.answer} <div className='keyboard-shortcut'><div className='key'>{index + 1}</div></div>
          </button>
        ))}
      </div>
    </div>
  )
}
export default BasicQuestion