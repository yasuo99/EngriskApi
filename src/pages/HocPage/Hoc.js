import React, { PureComponent, Suspense, useState, useEffect } from 'react';
import { Link, Prompt, Redirect } from 'react-router-dom';
import { getQuestion, submitQuestion } from '../../actions/questionActions';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { ButtonToolbar, ProgressBar } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import Countdown from 'react-countdown';
import sectionApi from '../../api/sectionApi';
import ModalQuiz from "../../components/modal/ModalQuiz";
import { appendScript } from '../../config/appendScript'
import { Fragment } from 'react';

class Hoc extends PureComponent {
    constructor(props) {
        super(props);
        this.isComponentMounted = false;
        this.state = {
            sectionId: 0,
            question: {},
            questions: [],
            currentQuestion: {},
            remainQuestion: [],
            quiz: {},
            index: 0,
            rightAnswer: 0,
            loading: true,
            selected: null,
            answer: '',
            checked: false,
            result: false,
            done: false,
            isRight: false,
            modal: false,
            authResult: {},
            totalTime: 0
        }

        this.handleUnload = this.handleUnload.bind(this);
    }
    async componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload);
        console.log(this.props);
        const { match: { match: { params } } } = this.props;
        const result = await this.fetchQuestions(params.sectionId);
        console.log(result);
        this.isComponentMounted = true;
        try {
            if (this.isComponentMounted) {
                if (result) {
                    this.setState({
                        sectionId: params.sectionId,
                        questions: result.questions,
                        currentQuestion: result.questions[this.state.index],
                        id: this.state.index,
                        quiz: result,
                        loading: false
                    })
                    this.calculateSpent = setInterval(() => {
                        this.setState({
                            totalTime: this.state.totalTime + 1
                        })
                    }, 1000)
                }
                else {
                    this.setState({
                        loading: true
                    })
                }

            }
        }
        catch (error) {
            console.log(error);
            this.setState({ loading: false });
        }
        appendScript("https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js");
    }
    fetchQuestions = async (sectionId) => {
        try {
            return await sectionApi.doQuiz(sectionId);
        } catch (error) {
            console.log(error);
        }
    }
    selectedAnswer = (e, position) => {
        if (this.state.selected === position) {
            this.setState({
                selected: null
            })
        }
        else {
            this.setState({
                selected: position
            })
        }
        this.setState({
            answer: e.target.innerHTML
        });
    }
    setColor = (position) => {
        if (this.state.selected === position) {
            return "#77B748"
        }
        else {
            return ""
        }
    }
    submitAnswer = async () => {
        const answer = {
            id: this.state.currentQuestion.id,
            answer: this.state.answer,
            isRightAnswer: false
        }
        const result = await submitQuestion(this.state.currentQuestion.id, answer);
        this.setState({
            index: this.state.index + 1,
            checked: true
        })
        if (!result.isRightAnswer) {
            this.setState({
                remainQuestion: [...this.state.remainQuestion, this.state.currentQuestion],
                isRight: false
            })
        } else {
            this.setState({
                rightAnswer: this.state.rightAnswer + 1,
                isRight: true
            })
        }
        if (this.reachEnd()) {
            if (this.state.rightAnswer !== this.state.quiz.questions.length) {
                this.setState({
                    questions: [...this.state.questions, ...this.state.remainQuestion.sort(() => Math.random() - 0.5)],
                    remainQuestion: []
                });
            }
            else {
                const result = this.submitQuiz();
                clearInterval(this.calculateSpent);
                this.setState({
                    done: true,
                    authResult: result
                })

            }
        }
        console.log(this.state);
    }
    submitQuiz = async () => {
        return await sectionApi.doneQuiz(this.state.sectionId, this.state.quiz.id);
    }
    reachEnd = () => {
        if (this.state.index < this.state.questions.length) {
            return false;
        }
        return true;
    }
    nextQuestion = async (e) => {
        e.preventDefault();
        this.setColor(5);
        this.selectedAnswer(e, 5);
        console.log(this.state);
        if (!this.reachEnd()) {
            this.setState({
                currentQuestion: this.state.questions[this.state.index],
                checked: false,
                result: false,
            })
        }
    }
    skipQuestion = () => {
        this.setState({
            index: this.state.index + 1,
            remainQuestion: [...this.state.remainQuestion, this.state.currentQuestion]
        })
        let tempIndex = this.state.index + 1;
        let remainQuestion = [...this.state.remainQuestion, this.state.currentQuestion]
        if (!this.reachEnd()) {
            this.setState({
                currentQuestion: this.state.questions[tempIndex],
                checked: false,
                result: false,
                questions: [...this.state.questions, ...remainQuestion],
                remainQuestion: []
            })
            console.log(this.state);
        }
    }
    modalOpen() {
        this.setState({ modal: true });
    }
    modalClose() {
        this.setState({
            modal: false
        });
    }
    render() {
        const { sectionId, currentQuestion, loading, rightAnswer, checked, quiz, index, done, isRight } = this.state;
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
                                                width={200} />
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
                <Fragment>
                    <Prompt when={!done} message="Bạn chưa hoàn thành quiz, bạn muốn rời khỏi ?"></Prompt>
                    <div id="wrapper">
                        <SubMenuClient></SubMenuClient>
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <HeaderClient></HeaderClient>
                                <main id="hoc2">
                                    <div className="container">
                                        <div className="mt-4">
                                            <ProgressBar animated now={rightAnswer} max={quiz.questions.length} variant="success" />
                                        </div>
                                        <div className="row kechan mt-5 kechan">
                                            <div className="col-8 offset-2">
                                                {currentQuestion.isListeningQuestion === false && <div className="row"> <div className="col-5"><h2>{currentQuestion.content}</h2>
                                                    <p className="mb-5">Có nghĩa là?</p></div>
                                                    <div className="col-7"><img src={currentQuestion.photoUrl} alt="" /></div></div>}
                                                {currentQuestion.isListeningQuestion === true &&
                                                    <div className="row">
                                                        <b>Chọn đáp án đúng</b>
                                                        <ReactPlayer url={currentQuestion.content} controls width="500px" height="30px" />
                                                    </div>}
                                                <div className="row mt-2">
                                                    <div className="col-6">
                                                        <div className={currentQuestion.a ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.setColor(1) }} onClick={(e) => this.selectedAnswer(e, 1)}>
                                                            <p>{currentQuestion.a}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className={currentQuestion.b ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.setColor(2) }} onClick={(e) => this.selectedAnswer(e, 2)}>
                                                            <p>{currentQuestion.b}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className={currentQuestion.c ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.setColor(3) }} onClick={(e) => this.selectedAnswer(e, 3)}>
                                                            <p>{currentQuestion.c}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className={currentQuestion.d ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.setColor(4) }} onClick={(e) => this.selectedAnswer(e, 4)}>
                                                            <p>{currentQuestion.d}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={isRight === true ? "row mt-3 thongbao-ketqua" : "row mt-3"}>
                                            <div className="col-3">
                                                {checked === false && <button className="btn btn-primary" onClick={this.skipQuestion}>Bỏ qua</button>}
                                            </div>
                                            <div className="col-6"></div>
                                            <div className="col-3 text-right">
                                                {checked === false && <button className="btn btn-primary" onClick={this.submitAnswer}>Kiểm tra</button>}
                                                {checked && done === false && <Link className="btn btn-primary" to={"/baihoc/" + (sectionId)} onClick={this.nextQuestion}>Tiếp theo</Link>}
                                                {done && <button className="btn btn-primary" onClick={e => this.modalOpen(e)}>Kết thúc</button>}
                                            </div>
                                        </div>
                                    </div>
                                </main>
                                <ModalQuiz show={this.state.modal} handleClose={e => this.modalClose(e)}>
                                    <div>
                                        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_REOnx3.json" background="transparent" speed="1" hover loop autoplay>
                                        </lottie-player>
                                    </div>
                                    <h3 className="title"> <img src="/image/check-mark.png"></img> Chúc mừng bạn đã hoàn thành bài quiz</h3>
                                    <p className="content">
                                        Thời gian hoàn thành của bạn là: {this.props.isLoggedIn ? this.state.authResult.timeSpent : this.state.totalTime} giây
                                </p>
                                    <strong>Bạn cần duy trì luyện tập để nâng cao trình độ của mình</strong>
                                </ModalQuiz>
                                <Footer></Footer>
                            </div>
                        </div>
                    </div >
                </Fragment >
            )
        }

    }
    componentWillUnmount() {
        this.isComponentMounted = false;
        window.removeEventListener('beforeunload', this.handleUnload);
    }
    handleUnload(e) {
        var message = "\o/";

        (e || window.event).returnValue = message; //Gecko + IE
        return message;
    }
}
const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        account: auth.account,
        isLoggedIn: auth.isLoggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Hoc);