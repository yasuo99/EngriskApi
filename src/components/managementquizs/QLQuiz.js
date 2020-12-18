import React, { Component } from "react";
import { Link } from "react-browser-router"
import ListCauHoi from "./ListCauHoi";
import ModalListCauHoiDoc from "../modalcauhoi/ModalListCauHoiDoc";
import ModalListCauHoiHinhAnh from "../modalcauhoi/ModalListCauHoiHinhAnh";
import ModalListCauHoiNghe from "../modalcauhoi/ModalListCauHoiNghe";
import { Button, Modal } from 'react-bootstrap'
class QLQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            modalDelete:false,
        };
    }
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    // Phần xử lý modal Create
    submitCreate(e) {
        this.setState({

        });
        this.modalClose();
    }

    openCreate() {
        this.setState({ modalCreate: true, });
    }

    closeCreate() {
        this.setState({
            modalCreate: false,
        });
    }
    // Phần xử lý moda Delete
    closeDelete() {
        this.setState({
            modalDelete:false,
        });
    }
    openDelete() {
        this.setState({ modalDelete: true });
    }
    submitDelete(e) {
        this.setState({

        });
        this.modalClose();
    }
    render() {
        return (
            <tr>
                <td>1</td>
                <td>
                    <ListCauHoi></ListCauHoi>
                </td>

                <td>
                <Button variant="primary" className="btn btn-success mr-2" onClick={e => this.openCreate(e)} ><i className="fa fa-plus" /></Button>
                <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                 {/* Modal create */}
                <Modal show={this.state.modalCreate}>
                    <Modal.Header closeButton onClick={() => this.closeCreate()}>
                        <Modal.Title>Thêm câu hỏi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <ul className="nav nav-tabs">
                            <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#taboneQuestion"><i className="fa fa-book" /> Câu hỏi đọc</a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwoQuestion"><i className="fa fa-star" /> Câu hỏi nghe </a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthreeQuestion"><i className="fa fa-bolt" /> Câu hỏi hình ảnh</a> </li>
                        </ul>
                        <div className="tab-content mt-3">
                            <div className="tab-pane fade show active" id="taboneQuestion" role="tabpanel">
                                <ModalListCauHoiDoc></ModalListCauHoiDoc>
                            </div>

                            <div className="tab-pane fade" id="tabtwoQuestion" role="tabpanel">
                                <ModalListCauHoiNghe></ModalListCauHoiNghe>
                            </div>
                            <div className="tab-pane fade" id="tabthreeQuestion" role="tabpanel">
                                <ModalListCauHoiHinhAnh></ModalListCauHoiHinhAnh>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeCreate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                
                {/* Modal phần xóa */}
                <Modal show={this.state.modalDelete}>
                    <Modal.Header closeButton onClick={() => this.closeDelete()}>
                        <Modal.Title>Xác nhận xóa quiz</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa quiz này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                </td>
            </tr>
        );
    }
}
export default QLQuiz;