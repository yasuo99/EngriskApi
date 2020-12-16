import React, { Component } from "react";
import { Link } from "react-browser-router"
import ModalDelete from "../modal/ModalDelete";
import ModalEdit from "../modal/ModalEdit";
class QLTuVung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalEdit: false,
            modalDelete: false,
            modalInputEnglish: "",
            modalInputVietNam: "",
            modalInputLoaiTu: "",
            modalInputHinhAnh: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    }
    onFileChange = event => {
        this.setState({ modalInputHinhAnh: event.target.files[0] });

    };
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmitEdit(e) {
        this.setState({
            english: this.state.modalInputEnglish,
            vietnam: this.state.modalInputVietNam,
            exeng: this.state.modalInputExEng,
            exvn: this.state.modalInputExVN,
        });
        this.modalClose();
    }

    modalOpen() {
        this.setState({ modalEdit: true });
    }
    modalClose() {
        this.setState({
            modalInputEnglish: "",
            modalInputVietNam: "",
            modalEdit: false,
            modalDelete: false,
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
        var { modalInputEnglish, modalInputVietNam, modalInputLoaiTu } = this.state;
        return (
            <tr>
                <td>Fish</td>
                <td>Con cá</td>
                <td>Danh từ</td>
                <td>I like eat fish <br /> Tôi thích ăn cá</td>
                <td><img src="../image/fish.png"></img></td>

                <td>
                    <a href="#" className="btn btn-primary mr-2" onClick={e => this.modalOpen(e)}><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger" onClick={e => this.modalOpenDelete(e)}><i className="fa fa-trash" /></a>
                    <ModalEdit show={this.state.modalEdit} handleClose={e => this.modalClose(e)}>
                        <h2 className="text-center text-primary">Cập nhật từ vựng</h2>
                        <hr className="sidebar-divider my-0" />
                        <div className="form-group pt-3">
                            <div className="card-input mt-4">
                                <span>English</span>
                                <input
                                    type="text"
                                    value={modalInputEnglish}
                                    name="modalInputEnglish"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Việt Nam</span>
                                <input
                                    type="text"
                                    value={modalInputVietNam}
                                    name="modalInputVietNam"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Loại từ</span>
                                <select
                                    value={modalInputLoaiTu}
                                    onChange={e => this.handleChange(e)}
                                    name="modalInputLoaiTu">
                                    <option value="">- Chọn loại từ -</option>
                                    <option value="Danh từ">Danh từ</option>
                                    <option value="Tính từ">Tính từ</option>
                                    <option value="Động từ">Động từ</option>
                                    <option value="Trạng từ">Trạng từ</option>
                                </select>
                            </div>
                            {/* <div className="card-input mt-4">
                                <span>Ví dụ tiếng anh</span>
                                <input
                                    type="text"
                                    value={this.state.modalInputExEng}
                                    name="modalInputExEng"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Ví dụ tiếng việt</span>
                                <input
                                    type="text"
                                    value={this.state.modalInputExVN}
                                    name="modalInputExVN"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div> */}
                            <div className="card-input mt-4 mb-5">
                                <span>Hình ảnh minh họa</span>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="modalInputHinhAnh"
                                    onChange={this.onFileChange}

                                />
                            </div>
                        </div>
                        <div className="card-button mt-5">
                            <button onClick={e => this.handleSubmit(e)} type="button" className="btn btn-primary float-left">
                                Lưu lại
                                </button>
                        </div>
                    </ModalEdit>
                    <ModalDelete show={this.state.modalDelete} handleClose={e => this.modalClose(e)}>
                    <h3 className="title"> <img src="/image/trash.png"></img> Xác nhận xóa từ vựng</h3>
                        <p className="content">
                            Bạn có chắc chắn muốn xóa từ vựng này ra khỏi hệ thống không?
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
export default QLTuVung;