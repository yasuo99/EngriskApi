import React, { Component } from 'react'
import { Link, Prompt, Redirect } from 'react-router-dom';
import { getQuestion, submitQuestion } from '../../actions/questionActions';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Badge, ButtonToolbar, Pagination, ProgressBar } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import { doExam, doneExam } from '../../actions/examActions';
import Countdown from 'react-countdown';
import { Fragment } from 'react';
import { Button, Modal } from 'react-bootstrap';
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
            listened: false,
            checked: false, //Câu hỏi đã được submit để kiểm tra
            submitted: false, //Kết quả trả về cho câu hỏi
            done: false, //Câu hỏi cuối
            empty: false,
            start: Date.now(),
            modal: false,
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
            if (exam.questions.length > 0) {
                this.setState({
                    examId: examId,
                    questions: exam.questions,
                    currentQuestion: exam.questions[this.state.index],
                    id: this.state.index,
                    exam,
                    loading: false
                });
                let answers = [];
                exam.questions.forEach(question => {
                    let currentAnswer = {
                        id: question.id,
                        answer: '',
                        selected: '',
                        flag: false,
                        isListeningQuestion: question.isListeningQuestion,
                        listened: false
                    };
                    answers.push(currentAnswer);
                });
                this.setState({
                    answers: answers
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
                selected: position,
                flag: false
            }
            let found = this.state.answers.filter(el => el.id === currentAnswer.id);
            if (found[0].isListeningQuestion) {
                found[0].listened = true;
            }
            found[0].selected = position;
            found[0].answer = e.target.innerHTML;
            console.log(this.state.answers);
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
        this.props.doneExam(this.state.examId, this.state.answers);
        this.setState({
            submitted: true
        })
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
                answer: '',
                checked: false
            });
            let stateCurrentQuestion = this.state.questions[tempIndex];
            let currentAnswer = this.state.answers.filter(el => el.id === stateCurrentQuestion.id);
            if (currentAnswer.length > 0) {
                if (currentAnswer[0].listened && currentAnswer[0].isListeningQuestion) {
                    this.setState({
                        listened: true
                    })
                }
                else {
                    this.setState({
                        listened: false
                    })
                }
                this.setState({
                    selected: currentAnswer[0].selected,
                    checked: true
                });
                this.setColor(currentAnswer[0].selected);
            }

        }
        console.log(this.state.questions.length);
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
                answer: '',
                checked: false
            });
            let stateCurrentQuestion = this.state.questions[tempIndex];
            let currentAnswer = this.state.answers.filter(el => el.id === stateCurrentQuestion.id);
            if (currentAnswer.length > 0) {
                if (currentAnswer[0].listened && currentAnswer[0].isListeningQuestion) {
                    this.setState({
                        listened: true
                    })
                }
                else {
                    this.setState({
                        listened: false
                    })
                }
                this.setState({
                    selected: currentAnswer[0].selected,
                    checked: true
                });
                this.setColor(currentAnswer[0].selected);
            }
        }
    }
    selectQuestion = (index) => {
        this.setState({
            index: index - 1,
            currentQuestion: this.state.questions[index - 1],
            selected: ''
        });
        let stateCurrentQuestion = this.state.questions[index - 1];
        let currentAnswer = this.state.answers.filter(el => el.id === stateCurrentQuestion.id);
        if (currentAnswer.length > 0) {
            if (currentAnswer[0].listened && currentAnswer[0].isListeningQuestion) {
                this.setState({
                    listened: true
                })
            }
            else {
                this.setState({
                    listened: false
                })
            }
            this.setState({
                selected: currentAnswer[0].selected,
                checked: true
            });
            this.setColor(currentAnswer[0].selected);
        }
        if (index === this.state.questions.length) {
            this.setState({
                done: true
            })
        }
        else {
            this.setState({
                done: false
            })
        }
    }
    flagQuestion = () => {
        let currentAnswer = this.state.answers.filter(el => el.id === this.state.currentQuestion.id);
        if (currentAnswer.length > 0) {
            currentAnswer[0].flag = currentAnswer[0].flag ? false : true;
        }
        this.setState({});
        console.log(this.state.answers);
    }
    skipQuestion = () => {
        let tempIndex = this.state.index + 1;
        if (tempIndex < this.state.questions.length) {
            this.setState({
                index: tempIndex,
                currentQuestion: this.state.questions[tempIndex],
                answer: '',
                checked: false
            });
        }
    }
    listenningTimeout = () => {
        var timeout = setInterval(() => {
            this.skipQuestion();
            this.removeSelected();
            clearInterval(timeout);
        }, 3000);
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
        let active = this.state.index + 1;
        let items = [];
        items.push(<Pagination.Prev key={0} onClick={(e) => this.previousQuestion(e)} />);
        for (let i = 1; i <= this.state.questions.length; i++) {
            items.push(<Pagination.Item key={i} active={i === active} onClick={() => this.selectQuestion(i)} style={{ backgroundColor: "green" }}>
                {i}{this.state.answers[i - 1] !== undefined && this.state.answers[i - 1].answer !== '' && <Badge variant="success">✔</Badge>}
                {this.state.answers[i - 1] !== undefined && this.state.answers[i - 1].flag && <Badge variant="danger"><i className="fa fa-flag"></i></Badge>}
            </Pagination.Item>)
        }
        items.push(<Pagination.Next key={this.state.questions.length + 1} onClick={(e) => this.nextQuestion(e)} />)
        const { examId, currentQuestion, loading, rightAnswer, checked, exam, index, done, submitted } = this.state;
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
                <Fragment>
                    <Prompt when={!submitted} message="Bạn chưa nộp bài, có chắn chắn rời ?"></Prompt>
                    <div id="wrapper">
                        <SubMenuClient></SubMenuClient>
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <HeaderClient></HeaderClient>
                                <main id="hoc2">
                                    <div className="container">
                                        <div className="mt-4">
                                            <Pagination size="lg" className="justify-content-center"
                                            >{items}</Pagination>
                                        </div>
                                        <div className="row kechan mt-5">
                                            <div className="col-4">Time left: <Countdown date={this.state.start + exam.duration * 60 * 1000} onComplete={this.submitExam} /></div>
                                            <div className="col-4"></div>
                                            <div className="col-4 ">
                                                <Button variant="primary" className="btn btn-primary" onClick={e => this.modalOpen(e)} >Hướng dẫn</Button>
                                            </div>
                                            <div className="col-8 offset-2">
                                                Câu {index + 1}
                                                {currentQuestion.isListeningQuestion === false && currentQuestion.isFillOutQuestion === false && <div className="row"> <div className="col-5"><h2>{currentQuestion.content}</h2>
                                                    <p className="mb-5">Có nghĩa là?</p></div>
                                                    <div className="col-7"><img src={currentQuestion.photoUrl} alt="" /></div></div>}
                                                {currentQuestion.isListeningQuestion === true && currentQuestion.isFillOutQuestion === false && this.state.listened == false &&
                                                    <div className="row">
                                                        <b>Chọn đáp án đúng</b>
                                                        <ReactPlayer url={currentQuestion.content} controls width="500px" height="30px" onEnded={() => this.listenningTimeout()} />
                                                    </div>}
                                                {currentQuestion.isListeningQuestion === true && currentQuestion.isFillOutQuestion === false && this.state.listened && <p>Đây là câu hỏi nghe và chỉ được phép nghe 1 lần</p>}
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
                                            <div className="col-2"><button className="btn btn-outline-danger" onClick={this.flagQuestion}>{this.state.answers[index] !== undefined && this.state.answers[index].flag ? "Bỏ gắn cờ" : "Gắn cờ"}<i className="fa fa-flag"></i></button></div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className={"col-3"}>
                                                {index > 0 && <button className="btn btn-primary" onClick={this.previousQuestion}>Quay lại</button>}
                                            </div>
                                            <div className="col-6"></div>
                                            <div className="col-3 text-right">
                                                {done === false && <Link className="btn btn-primary" to="#" onClick={this.nextQuestion}>Tiếp theo</Link>}
                                                {done && submitted === false && <button className="btn btn-primary" onClick={this.submitExam}>Nộp bài</button>}
                                                {submitted && <Link className="btn btn-primary" to={"/ketqua-exam/" + examId}>Xem đáp án</Link>}
                                            </div>
                                        </div>
                                    </div>
                                </main>
                                <Modal show={this.state.modal}>
                                    <Modal.Header closeButton onClick={() => this.modalClose()}>
                                        <Modal.Title>Hướng dẫn làm bài</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Đối với mỗi câu hỏi, bạn sẽ thấy một hình ảnh và bạn sẽ nghe thấy bốn câu lệnh ngắn. Các tuyên bố sẽ chỉ được nói một lần. Chúng sẽ không được in trong sách kiểm tra của bạn vì vậy bạn phải lắng nghe cẩn thận để hiểu những gì người nói nói. Khi bạn nghe thấy bốn câu nói, hãy nhìn vào hình và chọn câu mô tả đúng nhất những gì bạn thấy trong hình. Chọn câu trả lời đúng nhất A, B, C hoặc D
                                   </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => this.modalClose()}>Trở lại</Button>
                                    </Modal.Footer>
                                </Modal>
                                <Footer></Footer>
                            </div>
                        </div>

                    </div>
                </Fragment>
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
const mapStateToProps = (state) => {
    return ({})
}
const mapDispatchToProps = (dispatch) => {
    return {
        doneExam: (id, body) => dispatch(doneExam(id, body))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExamPage)
