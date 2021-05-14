import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import examApi from '../../api/examApi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class KetQuaExam extends Component {
    constructor(props) {
        super(props);
        this.isComponentMounted = false;
        this.state = {
            result: { answer: {questions: []} }
        }
    }
    componentDidMount = async () => {
        this.isComponentMounted = true;
        const { match: { match: { params } } } = this.props;
        if (this.isComponentMounted) {
            this.setState({
                result: this.props.result
            })
        }
    }
    render() {
        console.log(this.state.result.answer.questions);
        const renderQuestions = this.state.result.answer.questions.map((question) =>
            <div key={question.id} className="ketquacauhoi">
                <div className="cauhoi">
                    {question.isListeningQuestion && <ReactPlayer url={question.audio} controls width="500px" height="30px" />}
                    {question.content}
                </div>
                <div className="dapan">
                    {question.userAnswer === '' && <p className="text-danger">Không chọn đáp án</p>}
                    <ol type="A" className="ml-4">
                        <li className={question.a ? (question.a === question.answer ? "text-success" : (question.a === question.userAnswer ? "text-danger" : "")) : "hidden"}>{question.a}</li>
                        <li className={question.b ? (question.b === question.answer ? "text-success" : (question.b === question.userAnswer ? "text-danger" : "")) : "hidden"}>{question.b}</li>
                        <li className={question.c ? (question.c === question.answer ? "text-success" : (question.c === question.userAnswer ? "text-danger" : "")) : "hidden"}>{question.c}</li>
                        <li className={question.d ? (question.d === question.answer ? "text-success" : (question.d === question.userAnswer ? "text-danger" : "")) : "hidden"}>{question.d}</li>
                    </ol>
                </div>
                <div className="ketqua">
                    <div className="dropdown">
                        <button type="button" className="btn btn-primary " data-toggle="collapse" data-target={"#ketqua" + question.id}>Đáp án và giải
                    thích</button>
                        <div className="collapse" id={"ketqua" + question.id}>
                            <p>Chọn: {question.answer}</p>
                            <p>{question.explaination}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="ketquaexam">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6 offset-3">
                                        <h2 className="text-center mt-3 mb-4">KẾT QUẢ BÀI THI</h2>
                                    </div>

                                </div>
                                <div>Bài thi: {this.state.result.answer.title}</div>
                                <div>Kinh nghiệm: {this.state.result.answer.expGain}</div>
                                <div>Thời gian làm bài: {this.state.result.answer.duration} phút</div>
                                <div>Số câu đúng: {this.props.result.listening + this.props.result.reading}/{this.state.result.answer.questions.length}</div>
                                <div>Điểm: {this.props.result.score} (listening: {this.props.result.listening} câu, reading: {this.props.result.reading} câu)</div>
                                <hr />
                                {renderQuestions}
                                <Link className="btn btn-secondary" to="/exam">Trở lại</Link>
                            </div>
                        </main>
                        <Footer></Footer>
                    </div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { result } = state.exam
    return ({
        result: result
    })
}
export default connect(mapStateToProps)(KetQuaExam);