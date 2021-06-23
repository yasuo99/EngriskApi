import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import examApiv2 from "../../api/2.0/examApi";
import { Button, Form, Modal } from 'react-bootstrap'
import { Fragment } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import quizApi from "../../api/2.0/quizApi";
import accountApiV2 from "../../api/2.0/accountApi";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Sharing from "../../components/managementquizs/Sharing";
class QuizExamPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            exams: [],
            sharingQuizModal: false,
            sharingExamModal: false,
            selectedQuiz: {
                sharingTo: []
            },
            quizSharingTo: [],
            currentQuizSharing: [],
            examSharingTo: [],
            currentExamSharing: [],
            tempSharing: [],
            deleteQuizModal: false,
            deleteExamModal: false,
            selectedQuiz: '',
            selectedExam: ''
        };
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const { match: { match: { params } } } = this.props
        const exams = await examApiv2.getUserExams(params.accountId);
        const quizzes = await quizApi.getUserQuizzes(params.accountId);
        if (this.isComponentMounted) {
            this.setState({
                exams: exams,
                quizzes: quizzes.items
            })
        }
    }
    toggleQuizModal = async (e) => {
        this.setState({
            sharingQuizModal: this.state.sharingQuizModal ? false : true
        })
        if (!this.state.sharingQuizModal) {
            var sharingDetail = await accountApiV2.getUserSharingQuizDetail(this.props.account.id, e.target.dataset.id);
            this.setState({
                quizSharingTo: sharingDetail.users,
                currentQuizSharing: sharingDetail.sharing == null ? [] : sharingDetail.sharing,
                currentQuiz: { ...this.state.currentQuiz, id: e.target.dataset.id }
            })
        }
    }
    toggleExamModal = async (e) => {
        this.setState({
            sharingExamModal: this.state.sharingExamModal ? false : true
        })
        if (!this.state.sharingExamModal) {
            var sharingDetail = await accountApiV2.getUserSharingExamDetail(this.props.account.id, e.target.dataset.id);
            this.setState({
                examSharingTo: sharingDetail.users,
                currentExamSharing: sharingDetail.sharing == null ? [] : sharingDetail.sharing,
                currentQuiz: { ...this.state.currentQuiz, id: e.target.dataset.id }
            })
        }
    }
    toggleDeleteQuizModal = (e) => {
        if (e) {
            this.setState({
                selectedExam: e.target.dataset.id,
            })
        }
        this.setState({
            deleteQuizModal: this.state.deleteQuizModal ? false : true
        })
    }
    submitDeleteQuiz = async () => {
        if (this.state.selectedQuiz !== '') {
            await accountApiV2.deleteQuiz(this.props.account.id, this.state.selectedQuiz);
            var remainQuizzes = this.state.quizzes.filter(q => q.id != this.state.selectedQuiz);
            this.setState({
                quizzes: remainQuizzes,
                selectedQuiz: ''
            })
            toast('Xóa bài quiz thành công', {type:'info'})
            this.toggleDeleteQuizModal();
        }
    }
    toggleDeleteExamModal = (e) => {
        if (e) {
            this.setState({
                selectedExam: e.target.dataset.id,
            })
        }
        this.setState({
            deleteExamModal: this.state.deleteExamModal ? false : true
        })
    }
    submitDeleteExam = async () => {
        if (this.state.selectedExam !== '') {
            await accountApiV2.deleteExam(this.props.account.id, this.state.selectedExam);
            var remainExams = this.state.exams.filter(q => q.id != this.state.selectedExam);
            this.setState({
                exams: remainExams,
                selectedExam: ''
            })
            toast('Xóa bài exam thành công', {type:'info'})
            this.toggleDeleteExamModal();
        }
    }
    sharingChange = (e) => {
        this.setState({
            currentSharing: [...this.state.currentSharing, e[0]]
        })
        //     var already = this.state.currentSharing.find(i => i.id == e[0].id);
        //     if(!already){
        //         
        //     }
        //    else{
        //        var filtered = this.state.currentSharing.filter(f => f.id == already.id);
        //        this.setState({
        //            currentSharing: filtered
        //        })
        //    }
    }
    sharingChange = async (e) => {
        this.setState({
            tempSharing: [...e],
            currentSharing: [...e]
        })
    }
    submitQuizSharing = async (e) => {
        var result = await accountApiV2.shareQuiz(this.props.account.id, this.state.currentQuiz.id, this.state.tempSharing.map((value) => value.id))
        if (result.status === 200) {
            toast('Chia sẻ thành công', { type: 'success' })
        } else {
            toast('Chia sẻ thất bại', { type: 'error' })
        }
    }
    submitExamSharing = async (e) => {
        var result = await accountApiV2.shareExam(this.props.account.id, this.state.currentQuiz.id, this.state.tempSharing.map((value) => value.id))
        if (result.status === 200) {
            toast('Chia sẻ thành công', { type: 'success' })
        } else {
            toast('Chia sẻ thất bại', { type: 'error' })
        }
    }
    async componentWillUnmount() {
        this.isComponentMounted = false;
    }
    render() {
        const renderExams = this.state.exams.map((exam, index) =>
            <tr key={index}>
                <td>{exam.title}</td>
                <td>{exam.detail}</td>
                <td>{exam.duration}</td>
                <td>{exam.totalListen}</td>
                <td>{exam.totalReading}</td>
                <td>
                    <Button data-id={exam.id} variant="primary" className="btn btn-add mr-2" onClick={(e) => this.toggleExamModal(e)} ><i data-id={exam.id} className="fa fa-share"></i></Button>
                    <Button variant="success" className="btn btn-edit mr-2" ><Link to='/' className="fa fa-edit"></Link></Button>
                    <Button data-id={exam.id} onClick={(e) => this.toggleDeleteExamModal(e)} variant="danger" className="btn btn-delete"><i data-id={exam.id} className="fa fa-trash" /></Button>
                </td>
            </tr>
        )
        const renderQuizzes = this.state.quizzes.map((quiz, index) =>
            <tr key={index}>
                <td>{quiz.quizName}</td>
                <td>{quiz.detail}</td>
                <td>{quiz.difficultLevel}</td>
                <td>{quiz.questions.length}</td>
                <td>
                    <Button data-id={quiz.id} variant="primary" className="btn btn-add mr-2" onClick={(e) => this.toggleQuizModal(e)} ><i data-id={quiz.id} className="fa fa-share"></i></Button>
                    <Button variant="success" className="btn btn-edit mr-2" ><Link to='/' className="fa fa-edit"></Link></Button>
                    <Button data-id={quiz.id} onClick={(e) => this.toggleDeleteQuizModal(e)} variant="danger" className="btn btn-delete"><i data-id={quiz.id} className="fa fa-trash" /></Button>
                </td>
            </tr>
        )
        return (
            <div>
                <div id="wrapper">
                    <SubMenuClient></SubMenuClient>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <HeaderClient></HeaderClient>
                            <div className="container-fluid ql_quiz">
                                <div className="card shadow mb-4 mt-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Quản lý bài quiz</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <Link variant="primary" className="btn btn-quiz mr-2 mb-3" to="/user/quiz_exam"><i className="fa fa-plus" /> Thêm bài quiz</Link>
                                            {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                                <thead>
                                                    <tr>
                                                        <th className="tenbaiquiz">Tên bài</th>
                                                        <th className="motaquiz">Mô tả</th>
                                                        <th className="dokhoquiz">Độ khó</th>
                                                        <th className="dokhoquiz">Số câu hỏi</th>
                                                        <th className="chucnang" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.isComponentMounted && renderQuizzes}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow mb-4 mt-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Quản lý bài exam</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <Link variant="primary" className="btn btn-quiz mr-2 mb-3" to="/user/quiz_exam"><i className="fa fa-plus" /> Thêm bài exam</Link>
                                            {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                                <thead>
                                                    <tr>
                                                        <th className="tenbaiquiz">Tên bài</th>
                                                        <th className="motaquiz">Mô tả</th>
                                                        <th className="dokhoquiz">Thời gian làm bài</th>
                                                        <th className="dokhoquiz">Số câu nghe</th>
                                                        <th className="dokhoquiz">Số câu đọc</th>
                                                        <th className="chucnang" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderExams}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <Modal animation={true} show={this.state.sharingQuizModal} onHide={this.toggleQuizModal}>
                                <Modal.Header closeButton onClick={(e) => this.toggleQuizModal(e)}>
                                    <Modal.Title>Chia sẻ quiz</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Fragment>
                                        <Form.Group style={{ marginTop: '20px' }}>
                                            <Form.Label>Chia sẻ với</Form.Label>
                                            <Sharing share={this.sharingChange} options={this.state.quizSharingTo} shared={this.state.currentQuizSharing} placeholder='Chia sẻ với...'/>
                                        </Form.Group>
                                    </Fragment>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.toggleQuizModal}>Trở lại</Button>
                                    <Button variant="primary" onClick={(e) => this.submitQuizSharing(e)}>Lưu lại</Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal animation={true} show={this.state.sharingExamModal} onHide={this.toggleExamModal}>
                                <Modal.Header closeButton onClick={(e) => this.toggleExamModal(e)}>
                                    <Modal.Title>Chia sẻ exam</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Fragment>
                                        <Form.Group style={{ marginTop: '20px' }}>
                                            <Form.Label>Chia sẻ với</Form.Label>
                                            <Sharing share={this.sharingChange} options={this.state.examSharingTo} shared={this.state.currentExamSharing} placeholder='Chia sẻ với...'/>
                                        </Form.Group>
                                    </Fragment>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.toggleExamModal}>Trở lại</Button>
                                    <Button variant="primary" onClick={(e) => this.submitExamSharing(e)}>Lưu lại</Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal animation={true} show={this.state.deleteQuizModal} onHide={this.toggleDeleteQuizModal}>
                                <Modal.Header closeButton onClick={this.toggleDeleteQuizModal}>
                                    <Modal.Title>Xác nhận xóa quiz</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Bạn có chắc chắn muốn xóa bài quiz này ra khỏi hệ thống không?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.toggleDeleteQuizModal}>Trở lại</Button>
                                    <Button variant="primary" onClick={(e) => this.submitDeleteQuiz(e)}>Lưu lại</Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal animation={true} show={this.state.deleteExamModal} onHide={this.toggleDeleteExamModal}>
                                <Modal.Header closeButton onClick={this.toggleDeleteExamModal}>
                                    <Modal.Title>Xác nhận xóa quiz</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Bạn có chắc chắn muốn xóa bài exam này ra khỏi hệ thống không?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.toggleDeleteExamModal}>Trở lại</Button>
                                    <Button variant="primary" onClick={(e) => this.submitDeleteExam(e)}>Lưu lại</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
                <Link className="scroll-to-top rounded" to="#page-top">
                    <i className="fa fa-angle-up" />
                </Link>
                <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Bạn có chắc chắn muốn đăng xuất không?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Chọn "Đăng xuất" bên dưới nếu bạn đã sẵn sàng kết thúc phiên hiện tại của mình.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                                <Link className="btn btn-primary" to="login.html">Đăng xuất</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    const { account } = state.auth;
    return {
        account: account
    }
}
export default connect(mapStateToProps)(QuizExamPage);