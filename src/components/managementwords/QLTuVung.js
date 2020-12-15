import React, { Component } from "react";
import { Link } from "react-browser-router"
import Modal from "../modal/Modal";
class QLTuVung extends Component {
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
        return (
            <tr>
                <td>Fish</td>
                <td>Con cá</td>
                <td>Danh từ</td>
                <td>I like eat fish <br /> Tôi thích ăn cá</td>
                <td><img src="../image/fish.png"></img></td>
                
                <td>
                    <a href="#" className="btn btn-primary mr-2" ><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
                    <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                        <h2 className="text-center text-primary">Thêm từ vựng</h2>
                        <hr className="sidebar-divider my-0" />
                        <div className="form-group pt-3">
                            <div className="card-input mt-4">
                                <span>English</span>
                                <input
                                    type="text"
                                    value={this.state.modalInputEnglish}
                                    name="modalInputEnglish"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Việt Nam</span>
                                <input
                                    type="text"
                                    value={this.state.modalInputVietNam}
                                    name="modalInputVietNam"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Loại từ</span>
                                <select>
                                    <option>Danh từ</option>
                                    <option>Tính từ</option>
                                    <option>Động từ</option>
                                    <option>Trạng từ</option>
                                </select>
                            </div>
                            <div className="card-input mt-4">
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
                            </div>
                            <div className="card-input mt-4">
                                <span>Hình ảnh minh họa</span><input type="file" accept="image/png, image/jpeg" />
                            </div>
                        </div>
                        <div className="card-button mt-5">
                            <button onClick={e => this.handleSubmit(e)} type="button" className="btn btn-primary float-left">
                                Lưu lại
                                </button>
                        </div>
                    </Modal>
                </td>
            </tr>
        );
    }
}
export default QLTuVung;