import { useEffect, useState } from "react";
import { Link } from "react-browser-router";
import sectionApiV2 from "../../../api/2.0/sectionApi";
import QuestionPreview from "../../../components/question/QuestionPreview";

const SectionPreview = ({ section, closeReview }) => {
    const [scripts, setScripts] = useState([{
        words: [],
        questions: []
    }])
    const [currentScript, setCurrentScript] = useState({})
    const [scriptIndex, setScriptIndex] = useState(0);
    const [step, setStep] = useState(0);
    const [isBusy, setIsBusy] = useState(true);
    const [isWordScreen, setIsWordScreen] = useState(true);
    const [currentWord, setCurrentWord] = useState({})
    const [wordIndex, setWordIndex] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({})
    useEffect(async () => {
        const result = await sectionApiV2.preview(section.id);
        setScripts(result.scripts);
        setCurrentScript(result.scripts[scriptIndex])
        setCurrentWord(result.scripts[scriptIndex].words[wordIndex])
        setCurrentQuestion(result.scripts[scriptIndex].questions[questionIndex])
        setIsBusy(false);
    }, [section])
    useEffect(() => {
        if (!isBusy) {
            setCurrentScript(scripts[scriptIndex]);
            if (scripts[scriptIndex].words.length > 0) {
                setIsWordScreen(true);
                setCurrentWord(currentScript.words[wordIndex])
            } else {
                if (scripts[scriptIndex].questions.length > 0) {
                    setIsWordScreen(false);
                    setCurrentQuestion(currentScript.questions[questionIndex])
                }
                else {
                    setScriptIndex(0);
                }
            };
        }

    }, [scriptIndex])
    useEffect(() => {
        if (!isBusy) {
            setCurrentWord(currentScript.words[wordIndex])
        }

    }, [wordIndex]);
    useEffect(() => {
        if (!isBusy) {
            setCurrentQuestion(currentScript.questions[wordIndex])
        }
    }, [questionIndex])
    useEffect(() => {
        if (!isBusy) {
            if (isWordScreen) {
                if (step < currentScript.words.length) {
                    setWordIndex(wordIndex + 1);
                }
            }
        }
    }, [step])
    function indexChange() {
        setStep(step + 1);
        console.log(currentScript);
        if (step == currentScript.words.length + currentScript.questions.length - 1) {
            setScriptIndex(scriptIndex + 1);
        }

    }
    return (
        <div id="wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content" style={{ overflow: "auto", height: "100vh" }}>
                    <main id="scroll">
                        <div className="mt-2">
                            <div className="row">
                                <div className="offset-md-11 col-1">
                                    <button className="btn btn-light rounded-circle" onClick={() => closeReview()}>
                                        <i className="fa fa-remove"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="container learning-layout">
                            {isWordScreen ? (
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
                                <QuestionPreview question={currentQuestion}></QuestionPreview>
                            )}
                        </div>
                        <div className="drawer-content">
                            <div className="page-wrap">
                                <button
                                    className="feedback-bar-btn"
                                    onClick={() => indexChange()}
                                >
                                    Kế tiếp
                                </button>
                            </div></div>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default SectionPreview;