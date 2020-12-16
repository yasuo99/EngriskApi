import React, { Component } from "react";
import { Link } from "react-browser-router"
import Modal from "../modal/Modal";
import ModalDelete from "../modal/ModalDelete";
import ListCauHoi from "./ListCauHoi";
import ModalListCauHoiDoc from "../modalcauhoi/ModalListCauHoiDoc";
import ModalListCauHoiHinhAnh from "../modalcauhoi/ModalListCauHoiHinhAnh";
import ModalListCauHoiNghe from "../modalcauhoi/ModalListCauHoiNghe";
class QLExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalDelete: false,
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value,
          });
    }

    handleSubmit(e) {
        this.setState({

        });
        this.modalClose();
    }

    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modal: false,
            modalDelete:false,
        });
    }
    modalOpenDelete() {
        this.setState({ modalDelete: true });
    }
    handleSubmitDelete(e) {
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
                    <a href="javascript:;" className="btn btn-success mr-2" onClick={e => this.modalOpen(e)} ><i className="fa fa-plus" /></a>
                    <a href="#" className="btn btn-danger" onClick={e => this.modalOpenDelete(e)}><i className="fa fa-trash" /></a>
                    <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                        <h2 className="text-center text-primary">Thêm câu hỏi vào bài exam</h2>
                        <hr className="sidebar-divider my-2" />
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
                        <div className="card-button">
                            <button onClick={e => this.handleSubmit(e)} type="button" className="btn btn-primary float-left">
                                Lưu lại
                                </button>
                        </div>
                    </Modal>
                    <ModalDelete show={this.state.modalDelete} handleClose={e => this.modalClose(e)}>
                        <h3 className="title"> <img src="/image/trash.png"></img> Xác nhận xóa bài exam</h3>
                        <p className="content">
                            Bạn có chắc chắn muốn xóa exam này ra khỏi hệ thống không?
                        </p>
                        <button onClick={e => this.handleSubmitDelete(e)} type="button" className="btn btn-info float-right">
                            Xác nhận
                        </button>
                    </ModalDelete>
                </td>
            </tr>
        );
    }
}
export default QLExam;