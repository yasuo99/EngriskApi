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
            result: { questions: [] }
        }
    }
    componentDidMount = async () => {
        this.isComponentMounted = true;
        const { match: { match: { params } } } = this.props;
        console.log(params);
        var result = await this.fetchExamAnswer(params.examId);
        console.log(result);
        if (this.isComponentMounted) {
            this.setState({
                result: result
            })
        }
    }
    fetchExamAnswer = async (id) => {
        return await examApi.getAnswer(id);
    }
    render() {
        const { questions } = this.state.result;
        const renderQuestions = this.state.result.questions.map((question) =>
            <div key={question.id} className="ketquacauhoi">
                <div className="cauhoi">
                    {question.isListeningQuestion && <ReactPlayer url={question.content} controls width="500px" height="30px" />}
                    {question.isListeningQuestion == false && question.content}
                </div>
                <div className="dapan">
                    <ol type="A" className="ml-4">
                        <li className={question.a ? "" : "hidden"}>{question.a}</li>
                        <li className={question.b ? "" : "hidden"}>{question.b}</li>
                        <li className={question.c ? "" : "hidden"}>{question.c}</li>
                        <li className={question.d ? "" : "hidden"}>{question.d}</li>
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
                                <div>Bài thi: {this.state.result.title}</div>
                                <div>Kinh nghiệm: {this.state.result.expGain}</div>
                                <div>Thời gian làm bài: {this.state.result.duration} phút</div>
                                <div>Điểm: {this.props.result.score} (listening: {this.props.result.listening} câu, reading: {this.props.result.reading} câu)</div>
                                <hr />
                                {renderQuestions}

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