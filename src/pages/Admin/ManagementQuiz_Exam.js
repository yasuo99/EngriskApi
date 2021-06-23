import React, { Component } from "react";
import SubMenu from '../../components/admin/SubMenu'
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
// import ManagementQuiz_Exam from "./ManagementQuiz_Exam";
import { Button, Tabs, Tab } from "react-bootstrap";
class ManagementQuiz_Exam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            quizzes: []
        }
    }
    render() {
        return (
            <div>
                <div id="wrapper">
                    <SubMenu></SubMenu>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <HeaderAdmin></HeaderAdmin>
                            <div className="container-fluid ql_quiz">
                                <Tabs defaultActiveKey="quiz" id="controlled-tab-example">
                                    <Tab eventKey="quiz" title="Quản lý các bài quiz" tabClassName='font-weight-bold'>

                                        <div className="card shadow mb-4">
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <Link variant="primary" className="btn btn-quiz mr-2 mb-3" to="/quiz_exam"><i className="fa fa-plus" /> Thêm quiz</Link>
                                                    {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                                        <thead>
                                                            <tr>
                                                                <th className="loaibai">Loại bài</th>
                                                                <th className="tenbaiquiz">Tên bài</th>
                                                                <th className="motaquiz">Mô tả</th>
                                                                <th className="dokhoquiz">Độ khó</th>
                                                                <th className="chucnang" />
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Quiz</td>
                                                                <td>Bài kiểm tra số 1</td>
                                                                <td>Kiểm tra nội dung về chủ đề gia đình</td>
                                                                <td>Dễ</td>
                                                                <td>
                                                                    <Button variant="primary" className="btn btn-add mr-2" ><Link to='/quiz_exam' className="fa fa-plus"></Link></Button>
                                                                    <Button variant="primary" className="btn btn-edit mr-2" ><Link to='/' className="fa fa-edit"></Link></Button>
                                                                    <Button variant="primary" className="btn btn-delete"><i className="fa fa-trash" /></Button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab >
                                    <Tab eventKey="exam" title="Quản lý các bài exam" tabClassName='font-weight-bold'>
                                        <div className="card shadow mb-4">
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <Link variant="primary" className="btn btn-quiz mr-2 mb-3" to="/quiz_exam"><i className="fa fa-plus" /> Thêm exam</Link>
                                                    {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                                        <thead>
                                                            <tr>
                                                                <th className="loaibai">Loại bài</th>
                                                                <th className="tenbaiquiz">Tên bài</th>
                                                                <th className="motaquiz">Mô tả</th>
                                                                <th className="dokhoquiz">Độ khó</th>
                                                                <th className="chucnang" />
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Exam</td>
                                                                <td>Bài kiểm tra số 1</td>
                                                                <td>Kiểm tra nội dung về chủ đề gia đình</td>
                                                                <td>Dễ</td>
                                                                <td>
                                                                    <Button variant="primary" className="btn btn-add mr-2" ><Link to='/quiz_exam' className="fa fa-plus"></Link></Button>
                                                                    <Button variant="primary" className="btn btn-edit mr-2" ><Link to='/' className="fa fa-edit"></Link></Button>
                                                                    <Button variant="primary" className="btn btn-delete"><i className="fa fa-trash" /></Button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ManagementQuiz_Exam;