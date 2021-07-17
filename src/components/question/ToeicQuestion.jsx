import { useState } from "react";
import ReactPlayer from "react-player";
import parse from "html-react-parser";
const ToeicQuestion = ({ question, selectAnswer, audioLimit, audioPlayed }) => {
  const [isPlayed, setIsPlayed] = useState(false);
  console.log(question);
  return (
    <div className="border question-box rounded" style={{marginTop: '5%'}}>
      {question.question?.photoUrl && (
        <img
          className="responsive question-box-img img-fluid rounded mx-auto d-block ex-img mt-1"
          src={question.question?.photoUrl}
        ></img>
      )}
      <div className="text-dark font-weight-bold mt-4">
        {parse(question.question?.preQuestion || "Chọn đáp án đúng")}
      </div>
      <br></br>
      <div className="text-dark font-weight-bold">
        {question.index}. <span>{parse(question.question?.content || "")}</span>
        <span>
          {question.question?.audio && (
            <div>
              <img src="/image/sound.png" className="sound"></img>
              <ReactPlayer
                url={question.question?.audio}
                playing={!question.isListened}
                onEnded={() => {if(audioLimit){audioPlayed(question)}}}
                height="30px"
              />
            </div>
          )}
        </span>
      </div>
      <br></br>
      <br></br>
      <div>
        <div className="answer-wrapper">
          {question.question?.answers.map((answer, index) => (
            <button
              key={index}
              value={answer.answer}
              className={`answer-card toeic-answer mt-3 ${
                answer.answer == question.answer ? "bg-primary text-white" : ""
              }`}
              data-id={index}
              onClick={(e) => selectAnswer(answer)}
            >
              {answer.answer}
              <div className="keyboard-shortcut">
                <div className="key">{index + 1}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ToeicQuestion;
