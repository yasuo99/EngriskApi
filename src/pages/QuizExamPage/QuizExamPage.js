import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import { Button } from "react-bootstrap";
import examApiv2 from "../../api/2.0/examApi";

class QuizExamPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            exams: []
        };
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const { match: { match: { params } } } = this.props
        const exams = await examApiv2.getUserExams(params.accountId);
        console.log(exams);
        if (this.isComponentMounted) {
            this.setState({
                exams: exams
            })
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
                    <Button variant="primary" className="btn btn-add mr-2" ><Link to='/user/quiz_exam' className="fa fa-share"></Link></Button>
                    <Button variant="success" className="btn btn-edit mr-2" ><Link to='/' className="fa fa-edit"></Link></Button>
                    <Button variant="danger" className="btn btn-delete"><i className="fa fa-trash" /></Button>
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
                                                    <tr>
                                                        <td>Bài kiểm tra số 1</td>
                                                        <td>Kiểm tra nội dung về chủ đề gia đình</td>
                                                        <td>2</td>
                                                        <td>2</td>
                                                        <td>
                                                            <Button variant="primary" className="btn btn-add mr-2" ><Link to='/user/quiz_exam' className="fa fa-share"></Link></Button>
                                                            <Button variant="success" className="btn btn-edit mr-2" ><Link to='/' className="fa fa-edit"></Link></Button>
                                                            <Button variant="danger" className="btn btn-delete"><i className="fa fa-trash" /></Button>
                                                        </td>
                                                    </tr>
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
            </div>
        )
    }
}
export default QuizExamPage;