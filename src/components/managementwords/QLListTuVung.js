import React, { Component } from "react"
import QLTuVung from "./QLTuVung"
import Modal from "../modal/Modal";
import { createWord } from '../../actions/wordActions';
import ModalEdit from "../modal/ModalEdit";
import ModalDelete from "../modal/ModalDelete";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
class QLListTuVung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalInputEnglish: "",
            modalInputVietNam: "",
            modalInputSpelling: "",
            modalInputLoaiTu: "",
            modalInputHinhAnh: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        $(function(){
            $("#dataTable").DataTable();
        })
    }
    onFileChange = event => {
        this.setState({ modalInputHinhAnh: event.target.files[0] });
        console.log(this.state);
    };
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var { modalInputEnglish, modalInputVietNam, modalInputSpelling, modalInputLoaiTu, modalInputHinhAnh } = this.state;
        var formData = new FormData();
        formData.append("eng", modalInputEnglish);
        formData.append("vie", modalInputVietNam);
        formData.append("wordCategory", modalInputLoaiTu);
        formData.append('spelling', modalInputSpelling)
        formData.append("file", modalInputHinhAnh);
        createWord(formData)
        this.modalClose();
    }
    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modalInputEnglish: "",
            modalInputVietNam: "",
            modalInputLoaiTu: "",
            modalInputHinhAnh: null,
            modal: false
        });
    }
    render() {
        var { modalInputEnglish, modalInputVietNam, modalInputLoaiTu, modalInputSpelling } = this.state;
        return (
            <div>
                <a href="javascript:;" className="btn btn-success mr-2 mb-3" onClick={e => this.modalOpen(e)} ><i className="fa fa-plus" /> Thêm từ vựng</a>
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th className="english">English</th>
                            <th className="vietnam">Việt Nam</th>
                            <th className="loaitu">Loại từ vựng</th>
                            <th >Ví dụ</th>
                            <th className="hinhanh">Hình ảnh</th>
                            <th className="chucnang" />
                        </tr>
                    </thead>
                    <QLTuVung></QLTuVung>
                </table>
                <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                    <h2 className="text-center text-primary">Thêm từ vựng</h2>
                    <hr className="sidebar-divider my-0" />
                    <div className="form-group pt-3">
                        <div className="card-input mt-4">
                            <span>English</span>
                            <input
                                type="text"
                                value={modalInputEnglish}
                                name="modalInputEnglish"
                                onChange={e => this.handleChange(e)}
                                required
                            />
                        </div>
                        <div className="card-input mt-4">
                            <span>Việt Nam</span>
                            <input
                                type="text"
                                value={modalInputVietNam}
                                name="modalInputVietNam"
                                onChange={e => this.handleChange(e)}
                                required
                            />
                        </div>
                        <div className="card-input mt-4">
                            <span>Phát âm</span>
                            <input
                                type="text"
                                value={modalInputSpelling}
                                name="modalInputSpelling"
                                onChange={e => this.handleChange(e)}
                                required
                            />
                        </div>
                        <div className="card-input mt-4">
                            <span>Loại từ</span>
                            <select
                                value={modalInputLoaiTu}
                                onChange={e => this.handleChange(e)}
                                name="modalInputLoaiTu" required>
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
                </Modal>
                <ModalEdit show={this.state.modalEdit} handleClose={e => this.modalClose(e)}>
                    <h2 className="text-center text-primary">Cập nhật từ vựng</h2>
                    <hr className="sidebar-divider my-0" />
                    <div className="form-group pt-3">
                        <div className="card-input mt-4">
                            <span>English</span>
                            <input
                                type="text"
                                name="modalInputEnglish"
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div className="card-input mt-4">
                            <span>Việt Nam</span>
                            <input
                                type="text"
                                name="modalInputVietNam"
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div className="card-input mt-4">
                            <span>Phát âm</span>
                            <input
                                type="text"
                                name="modalInputSpelling"
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div className="card-input mt-4">
                            <span>Loại từ</span>
                            <select
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

            </div>
        )
    }
}
export default QLListTuVung;