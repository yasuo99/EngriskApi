import { FlashcardComponent } from "react-flashcard";
import { Prompt, Redirect, useParams } from "react-router";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import { Modal, ProgressBar } from "react-bootstrap";
import WrongAnswer from "../../components/questionresult/WrongAnswer";
import RightAnswer from "../../components/questionresult/RightAnswer";
import LearningNav from "../../components/nav/LearningNav";
import { useEffect, useState } from "react";
import sectionApiV2 from "../../api/2.0/sectionApi";
import { Fragment } from "react";
import { NavPrompt, useNavPrompt } from "react-router-nav-prompt";
import NormalQuestion from "../../components/typequestion/NormalQuestion";
import { connection } from "../../signalR/createSignalRConnection";
import { HubConnectionState } from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";
import { FinishUp } from "../../actions/sectionActions";
import Loader from 'react-loader-spinner';
import { Link } from "react-router-dom";
const cardData = [
  {
    front: {
      text: "what the fuck",
      image: "https://o.quizlet.com/RWRdgDus.uuqNDUrJ0ernA.jpg",
    },
    back: {
      text: "Camping",
    },
  },
];
const SectionFlashcard = () => {
  const { account } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [currentScript, setCurrentScript] = useState({
    words: [],
    questions: [],
  });
  const [remainQuestions, setRemainQuestions] = useState([])
  const [scriptIndex, setScriptIndex] = useState(0);
  const [isBusy, setBusy] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [currentWord, setCurrentWord] = useState({});
  const [wordIndex, setWordIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [vocabularyScreen, setVocabularyScreen] = useState(true);
  const [step, setStep] = useState(0);
  const [answerCheck, setAnswerCheck] = useState(-1);
  const [currentQuestion, setCurrentQuestion] = useState({
    answers: [],
  });
  const [isQuestionScreen, setIsQuestionScreen] = useState(false)
  const [isLastQuestion, setIsLastQuestion] = useState(true);
  let { sectionId } = useParams();
  useEffect(async () => {
    const result = await sectionApiV2.start(sectionId);
    console.log(result);
    if (result.scripts.length > 0) {
      setBusy(false);
      setData(result.scripts);

      setCurrentWord(result.scripts[scriptIndex].words[wordIndex]);
      setCurrentQuestion(result.scripts[scriptIndex].questions[questionIndex]);
      setCurrentScript(result.scripts[scriptIndex]);
    }
  }, [setData]);

  useEffect(() => {
    if (!isBusy) {
      console.log("cái con cặc gì vậy ?");
      console.log(data);
      setCurrentScript(data[scriptIndex]);
    }
  }, [scriptIndex]);
  useEffect(() => {
    if (!isBusy) {
      console.log("?", currentScript);
      setCurrentWord(currentScript.words[wordIndex]);
    }
  }, [wordIndex, currentScript]);
  useEffect(() => {
    if (!isBusy) {
      if (currentScript.questions.length == 1) {
        setIsLastQuestion(true)
      }
      setCurrentQuestion(currentScript.questions[questionIndex]);
    }
  }, [questionIndex, currentScript]);
  useEffect(() => {
    if (connection.state == HubConnectionState.Disconnected) {
      connection.start();
    }
  }, [connection])
  function indexChange() {
    const currentStep = step;
    setStep(currentStep + 1);
    console.log(wordIndex);
    if (wordIndex < currentScript.words.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      if (currentScript.questions.length > 0) {
        setVocabularyScreen(false);
      } else {
        console.log('dkm');
      }
    }
    if (!vocabularyScreen && questionIndex < currentScript.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      console.log("dit con me");
    }
    console.log(currentStep);
    if (currentStep == currentScript.words.length + currentScript.questions.length - 1) {
      console.log("cl");
      if (data[scriptIndex + 1] != undefined) {
        setQuestionIndex(0);
        setWordIndex(0);
        setStep(0);
        setScriptIndex(scriptIndex + 1);
        if (data[scriptIndex + 1]?.words.length > 0) {
          setVocabularyScreen(true);
        }
      } else {
        console.log('test');
        if (remainQuestions.length > 0) {
          setStep(0);
          setQuestionIndex(0);
          setData([...data, {
            words: [],
            questions: remainQuestions
          }])
          setScriptIndex(scriptIndex + 1);
        } else {
          if (connection.state == HubConnectionState.Connected) {
            connection.on("SectionProgress", (data) => {
              const result = JSON.parse(data);
              dispatch(FinishUp(result))
            })
            const data = {
              sectionId: sectionId,
              accountId: account.id
            }
            connection.send("SectionDone", data);
          }
          setIsFinish(true);
        }

      }
    } else {
      console.log('?');
    }
  }
  function Check(bool) {
    setIsQuestionScreen(bool);
  }
  function SelectAnswer(result) {
    console.log(result);
    setAnswerCheck(result);
  }
  useEffect(() => {
    if (!isQuestionScreen) {
      setAnswerCheck(-1);
    }
  }, [isQuestionScreen])
  function AddRemainQuestion(question) {
    setIsLastQuestion(false);
    setRemainQuestions([...remainQuestions.filter(q => q !== question), question])
  }
  function RemoveRemainQuestion(question) {
    console.log(...remainQuestions.filter(q => q !== question));
    setRemainQuestions([...remainQuestions.filter(q => q !== question)])
  }
  return (
    <div>
      {!isBusy ? (
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" style={{ overflow: "auto", height: "100vh" }}>
              <main id="scroll">
                <div className="mt-2">
                  <div className="row">
                    <div className="offset-md-11 col-1">
                      <Link className="btn btn-light rounded-circle" to="/home">
                        <i className="fa fa-remove"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="container learning-layout">
                  <ProgressBar
                    variant="primary"
                    className="mt-3 w-75"
                    now={scriptIndex}
                    max={
                      data.length
                    }
                  ></ProgressBar>
                  {vocabularyScreen ? (
                    <div>
                      <div className="mt-4">
                        <h5>{currentWord.flashcardTitle}</h5>
                        <img
                          className="img-fluid rounded mx-auto d-block ex-img fluid-content-item"
                          src="https://cdn.busuu.com/media/resized/entity/1440/company_1528111874_1440.jpg"
                        ></img>
                        <h4 className="">
                          {currentWord.eng}
                          <img src="/image/sound.png" className="sound"></img>
                        </h4>
                        <h4 className="">{currentWord.vie}</h4>
                        <hr className="d-flex justify-content-center w-75"></hr>
                        <div className="mt-2 example">
                          <h5>Ví dụ</h5>
                          Vd1: We are going to Camping
                          <img src="/image/sound.png" className="sound"></img>
                          <br></br>
                          Vd2: We should camping here
                        </div>
                      </div>

                    </div>
                  ) : (
                    <NormalQuestion question={currentQuestion} addRemainQuestion={AddRemainQuestion} removeRemainQuestion={RemoveRemainQuestion} check={Check} answerCheck={SelectAnswer} isLastQuestion={isLastQuestion} />
                  )}
                  {/* 
                  {data[0].questions.length > 0 && (
                    <NormalQuestion question={data[0].questions[index]} />
                  )} */}
                  {!isQuestionScreen && <div className="container">
                    <div className="drawer-content">
                      <div className="page-wrap">
                        {!isFinish ? <button
                          className="feedback-bar-btn"
                          onClick={() => {
                            {
                              indexChange();
                            }
                          }}
                        >
                          Kế tiếp
                        </button> : <Link
                          className="btn feedback-bar-btn"
                          to={`/sections/${sectionId}/finish`}
                        >
                          Kết thúc
                        </Link>}

                      </div></div>
                  </div>}
                  {answerCheck === 1 && <RightAnswer indexChange={indexChange} isFinish={isFinish} sectionId={sectionId} />}
                  {answerCheck === 0 && <WrongAnswer indexChange={indexChange} />}
                </div>
              </main>
            </div>
          </div>
        </div>
      ) : <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" style={{ overflow: "auto", height: "100vh" }}>
            <main id="scroll">
              <div className="mt-2 container">
                <div className="row">
                  <div className="offset-md-11 col-1">
                    <Link className="btn btn-light rounded-circle" to="/home">
                      <i className="fa fa-remove"></i>
                    </Link>
                  </div>
                </div>
                <div className='d-flex justify-content-center'>
                  <Loader type="Oval"
                    color="#00BFFF"
                    height={400}
                    width={400} />
                </div>
                <p className='d-flex justify-content-center'>Hiện nội dung section này chưa được thêm vào vui lòng thử lại sau!</p>
              </div>
            </main>
          </div>
        </div>
      </div>
      }
    </div>
  );
};
export default SectionFlashcard;
