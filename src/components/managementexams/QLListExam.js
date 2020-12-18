import React, { Component } from "react"
import QLExam from "./QLExam"
import { Button, Modal } from 'react-bootstrap'
import ModalListCauHoiDoc from "../modalcauhoi/ModalListCauHoiDoc";
import ModalListCauHoiHinhAnh from "../modalcauhoi/ModalListCauHoiHinhAnh";
import ModalListCauHoiNghe from "../modalcauhoi/ModalListCauHoiNghe";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
class QLListExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            quizzes: []
        };
        this.isComponentMounted = false;
    }
    componentDidMount(){
        $(function(){
            $("#dataTableExam").DataTable();
        })
        this.isComponentMounted = true;
    }
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    submitCreate(e) {
        this.setState({

        });
        this.closeCreate();
    }

    openCreate() {
        this.setState({ modalCreate: true });
    }

    closeCreate() {
        this.setState({
            modalCreate: false,
        });
    }
    render() {
        return (
            <div>
                <Button variant="primary" className="btn btn-success mr-2 mb-3" onClick={e => this.openCreate(e)} ><i className="fa fa-plus" />Thêm bài exam</Button>
                {/* Modal create */}
                <Modal show={this.state.modalCreate}>
                    <Modal.Header closeButton onClick={() => this.closeCreate()}>
                        <Modal.Title>Thêm bài exam</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <ul className="nav nav-tabs">
                            <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#tabone"><i className="fa fa-book" /> Câu hỏi đọc</a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwo"><i className="fa fa-star" /> Câu hỏi nghe </a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthree"><i className="fa fa-bolt" /> Câu hỏi hình ảnh</a> </li>
                        </ul>
                        <div className="tab-content mt-3">
                            <div className="tab-pane fade show active" id="tabone" role="tabpanel">
                                <ModalListCauHoiDoc></ModalListCauHoiDoc>
                            </div>

                            <div className="tab-pane fade" id="tabtwo" role="tabpanel">
                                <ModalListCauHoiNghe></ModalListCauHoiNghe>
                            </div>
                            <div className="tab-pane fade" id="tabthree" role="tabpanel">
                                <ModalListCauHoiHinhAnh></ModalListCauHoiHinhAnh>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeCreate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

                <table className="table table-bordered" id="dataTableExam" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Exam</th>
                            <th>Câu hỏi</th>
                            <th className="chucnang"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <QLExam></QLExam>            
                    </tbody>
                </table>
                
            </div>
        )
    }
    componentWillUnmount(){
        this.isComponentMounted = false;
    }
}
export default QLListExam;