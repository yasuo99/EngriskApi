import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { getQuestion, submitQuestion } from '../../actions/questionActions';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { ButtonToolbar, ProgressBar } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import { doExam, doneExam } from '../../actions/examActions';
import Countdown from 'react-countdown';
class ExamPage extends Component {
    constructor(props) {
        super(props);
        this.isComponentMounted = false;
        this.state = {
            examId: 0,
            questions: [],
            currentQuestion: {}, //Câu hỏi hiện tại
            remainQuestion: [], //Số câu hỏi bị bỏ qua hoặc sai,
            answers: [],
            exam: {},
            index: 0,
            rightAnswer: 0, //Số câu trả lời đúng
            loading: true, //Màn hình chờ load
            selected: null, //Đáp án lựa chọn
            answer: '', //Lưu đáp án để submit
            checked: false, //Câu hỏi đã được submit để kiểm tra
            result: false, //Kết quả trả về cho câu hỏi
            done: false, //Trả lời đúng hết các câu hỏi
            empty: false,
            start: Date.now()
        }
        this.handleUnload = this.handleUnload.bind(this);
    }
    async componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload);
        const { match: { match: { params } } } = this.props;
        this.isComponentMounted = true;
        try {
            if (this.isComponentMounted) {
                this.fetchQuestions(params.examId);
            }
        }
        catch (error) {
            console.log(error);
            this.setState({ loading: false });
        }
    }
    fetchQuestions = async (examId) => {
        try {
            const exam = await doExam(examId);
            console.log(exam);
            if (exam.questions.length > 0) {
                this.setState({
                    examId: examId,
                    questions: exam.questions,
                    currentQuestion: exam.questions[this.state.index],
                    id: this.state.index,
                    exam,
                    loading: false
                })
            }
            else {
                this.setState({
                    empty: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    selectedAnswer = (e, position) => {
        if (this.state.selected === position) {
            this.setState({
                selected: null,
            })
        }
        else {
            this.setState({
                selected: position
            })
        }
        if (e) {
            const currentAnswer = {
                id: this.state.currentQuestion.id,
                answer: e.target.innerHTML,
                selected: position
            }
            let found = this.state.answers.some(el => el.id === currentAnswer.id);
            if (!found) {
                this.setState({
                    answers: [...this.state.answers, currentAnswer]
                });
            }
            else {
                let newAnswers = this.state.answers.filter(el => el.id !== currentAnswer.id);
                this.setState({
                    answers: [...newAnswers, currentAnswer]
                });
            }
        }

    }
    removeSelected = () => {
        this.setState({
            selected: null
        })
    }
    setColor = (position) => {
        if (this.state.selected === position) {
            return "#77B748"
        }
        else {
            return ""
        }
    }
    // submitAnswer = async (e) => {
    //     e.preventDefault();
    //     const answer = {
    //         id: this.state.currentQuestion.id,
    //         answer: this.state.answer,
    //         isRightAnswer: false
    //     }
    //     const currentAnswer = {
    //         question: this.state.currentQuestion,
    //         answer: this.state.answer,
    //         selected: this.state.selected
    //     }
    //     const result = await submitQuestion(this.state.currentQuestion.id, answer);
    //     this.setState({
    //         index: this.state.index + 1,
    //         checked: true,
    //         answers: [...this.state.answers, currentAnswer]
    //     })
    //     if (!result.isRightAnswer) {
    //         this.setState({
    //             remainQuestion: [...this.state.remainQuestion, this.state.currentQuestion]
    //         })
    //     } else {
    //         this.setState({
    //             rightAnswer: this.state.rightAnswer + 1
    //         })
    //     }
    //     if (this.reachEnd()) {

    //         if (this.state.rightAnswer !== this.state.exam.questions.length) {
    //             this.setState({
    //                 questions: [...this.state.questions, ...this.state.remainQuestion.sort(() => Math.random() - 0.5)],
    //                 remainQuestion: []
    //             });
    //         }
    //         else {
    //             this.setState({
    //                 done: true
    //             })
    //         }
    //     }
    //     console.log(this.state);
    // }
    submitExam = async (e) => {
        console.log(this.state.answers);
        console.log(this.state);
        var result = await doneExam(this.state.examId, this.state.answers);
        console.log(result);
    }
    reachEnd = () => {
        if (this.state.index < this.state.questions.length) {
            return false;
        }
        return true;
    }
    nextQuestion = (e) => {
        e.preventDefault();
        this.removeSelected();
        let tempIndex = this.state.index + 1;
        if (tempIndex < this.state.questions.length) {
            this.setState({
                index: tempIndex,
                currentQuestion: this.state.questions[tempIndex],
                answer: ''
            });
            let stateCurrentQuestion = this.state.questions[tempIndex];
            let currentAnswer = this.state.answers.filter(el => el.id === stateCurrentQuestion.id);
            if (currentAnswer.length > 0) {
                this.setState({
                    selected: currentAnswer[0].selected
                });
                this.setColor(currentAnswer[0].selected);
            }

        }
        if (tempIndex === this.state.questions.length - 1) {
            this.setState({
                done: true
            })
        }

    }
    previousQuestion = (e) => {
        let tempIndex = this.state.index - 1;
        this.removeSelected();
        if (tempIndex >= 0) {
            this.setState({
                done: false,
                index: tempIndex,
                currentQuestion: this.state.questions[tempIndex],
                answer: ''
            });
            let stateCurrentQuestion = this.state.questions[tempIndex];
            let currentAnswer = this.state.answers.filter(el => el.id === stateCurrentQuestion.id);
            if (currentAnswer.length > 0) {
                this.setState({
                    selected: currentAnswer[0].selected
                });
                this.setColor(currentAnswer[0].selected);
            }
        }
    }
    render() {
        const { examId, currentQuestion, loading, rightAnswer, checked, exam, index, done, empty } = this.state;
        if (loading) {
            return (
                <div id="wrapper">
                    <SubMenuClient></SubMenuClient>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <HeaderClient></HeaderClient>
                            <main id="hoc2">
                                <div className="container">
                                    <div className="row kechan mt-5 kechan d-flex">
                                        <div className="col-8 offset-5">
                                            <Loader type="Oval"
                                                color="#00BFFF"
                                                height={200}
                                                width={200}
                                            />
                                            <p>Hiện chưa có câu hỏi cho exam này !</p>
                                        </div>
                                    </div>
                                </div>
                            </main>

                            <Footer></Footer>
                        </div>
                    </div>

                </div>
            )
        }
        else {
            return (
                <div id="wrapper">
                    <SubMenuClient></SubMenuClient>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <HeaderClient></HeaderClient>
                            <main id="hoc2">
                                <div className="container">
                                    <div className="mt-4">
                                        <ProgressBar animated now={rightAnswer} max={exam.questions.length} variant="success" />
                                    </div>
                                    <div className="row kechan mt-5">
                                        <div className="col-3">Time left: <Countdown date={this.state.start + exam.duration*60*1000} onComplete={this.submitExam}/></div>
                                        <div className="col-8 offset-2">
                                            Câu {currentQuestion.id}
                                            {currentQuestion.isListeningQuestion === false && currentQuestion.isFillOutQuestion === false && <div className="row"> <div className="col-5"><h2>{currentQuestion.content}</h2>
                                                <p className="mb-5">Có nghĩa là?</p></div>
                                                <div className="col-7"><img src={currentQuestion.photoUrl} alt="" /></div></div>}
                                            {currentQuestion.isListeningQuestion === true && currentQuestion.isFillOutQuestion === false &&
                                                <div className="row">
                                                    <b>Chọn đáp án đúng</b>
                                                    <ReactPlayer url={currentQuestion.content} controls width="500px" height="30px" />
                                                </div>}
                                            {currentQuestion.isFillOutQuestion === true && <p>{currentQuestion.content}</p>}
                                            <div className="row mt-2">
                                                <div className="col-6">
                                                    <button className={currentQuestion.a ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.setColor(1) }} onClick={(e) => this.selectedAnswer(e, 1)}>
                                                        {currentQuestion.a}
                                                    </button>
                                                </div>
                                                <div className="col-6">
                                                    <button className={currentQuestion.b ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.setColor(2) }} onClick={(e) => this.selectedAnswer(e, 2)}>
                                                        {currentQuestion.b}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <button className={currentQuestion.c ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.setColor(3) }} onClick={(e) => this.selectedAnswer(e, 3)}>
                                                        {currentQuestion.c}
                                                    </button>
                                                </div>
                                                <div className="col-6">
                                                    <button className={currentQuestion.d ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.setColor(4) }} onClick={(e) => this.selectedAnswer(e, 4)}>
                                                        {currentQuestion.d}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3 thongbao-ketqua">
                                        <div className={"col-3"}>
                                            {index > 0 && <button className="btn btn-primary" onClick={this.previousQuestion}>Quay lại</button>}
                                        </div>
                                        <div className="col-6"></div>
                                        <div className="col-3 text-right">
                                            {done === false && <Link className="btn btn-primary" to="#" onClick={this.nextQuestion}>Tiếp theo</Link>}
                                            {done && <button className="btn btn-primary" onClick={this.submitExam}>Nộp bài</button>}
                                        </div>
                                    </div>
                                </div>
                            </main>

                            <Footer></Footer>
                        </div>
                    </div>

                </div>
            )
        }

    }
    handleUnload(e) {
        var message = "\o/";

        (e || window.event).returnValue = message; //Gecko + IE
        return message;
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}

export default ExamPage
