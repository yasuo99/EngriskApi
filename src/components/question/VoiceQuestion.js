import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import parse from 'html-react-parser'
import { useEffect } from 'react';
const VoiceQuestion = ({ question, checkAnswer, isLastQuestion, isReviewing }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span className='text-center'>Trình duyệt không hỗ trợ chức năng thu âm.</span>;
  }
  useEffect(() => {
    if (finalTranscript != "") {
      checkAnswer(finalTranscript);
    }
  }, [finalTranscript])
  useEffect(() => {
    if (isLastQuestion) {
      resetTranscript();
    }
  }, [isLastQuestion])
  useEffect(() => {
    resetTranscript();
  },[question])
  return (
    <div className='container'>
      <div className='ml-1 mt-4 excercise-group border-secondary'>
        {question.photoUrl && <img
          className="responsive question-box-img img-fluid rounded mx-auto d-block ex-img mt-1"
          src={question.photoUrl}
        ></img>}

        <div className='text-dark font-weight-bold all-preQuestion'>{parse(question.preQuestion || 'Chọn đáp án đúng')}</div>
        <br></br>
        <div className='all-question-content font-weight-bold mt-1'>{parse(question.content || '')}
        </div>
        <button disabled={finalTranscript != "" || isReviewing} className='btn btn-primary rounded-pill' onClick={SpeechRecognition.startListening}>Start <i className='fa fa-microphone'></i></button>
      </div>

      {/* <button className="btn btn-secondary" onClick={SpeechRecognition.stopListening}>Stop</button>
      <button className='btn btn-light' onClick={resetTranscript}>Reset</button> */}
      <p className='text-center'>Kết quả: {finalTranscript}</p>
    </div>
  );
}
export default VoiceQuestion