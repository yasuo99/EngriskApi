import React, { Component } from "react"
import QLTuVung from "./QLTuVung"
import Modal from "../modal/Modal";
class QLListTuVung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalInputEnglish: "",
            modalInputVietNam: "",
            modalInputLoaiTu: "",
            modalInputHinhAnh: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(e) {
        this.setState({
            english: this.state.modalInputEnglish,
            vietnam: this.state.modalInputVietNam,
            exeng: this.state.modalInputExEng,
            exvn: this.state.modalInputExVN,
        });
        this.modalClose();
    }

    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modalInputEnglish: "",
            modalInputVietNam: "",
            modal: false
        });
    }
    render() {
        var { modalInputEnglish, modalInputVietNam, modalInputLoaiTu } = this.state;
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
                    <tbody>
                        <QLTuVung></QLTuVung>
                    </tbody>
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
                </Modal>


            </div>
        )
    }
}
export default QLListTuVung;