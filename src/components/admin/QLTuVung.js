import React, { Component } from "react";
import { Link } from "react-browser-router"
import Modal from "../modal/Modal";
import { createWord, deleteWord } from '../../actions/wordActions';
import { updateWord } from '../../actions/wordActions';
class QLTuVung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalInputEnglish: "",
            modalInputVietNam:"",
            modalInputSpelling: "",
            modalInputLoaiTu:"",
            modalInputHinhAnh: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    onFileChange = event => { 
        console.log(event);
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
        var { modalInputEnglish, modalInputVietNam, modalInputLoaiTu, modalInputHinhAnh } = this.state;
        var formData = new FormData();
        formData.append("eng",modalInputEnglish);
        formData.append("vie",modalInputVietNam);
        formData.append("wordCategory",modalInputLoaiTu);
        formData.append("file",modalInputHinhAnh);
        // createWord(formData)
        console.log('dkm');
        console.log(formData);
        this.modalClose();
    }

    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modalInputEnglish: "",
            modalInputVietNam:"",
            modalInputLoaiTu:"",
            modalInputHinhAnh: null,
            modal: false
        });
    }
    
    onDelete = (id) => {
        if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            deleteWord(id);
        }
    }
    render() {
        var {word } = this.props;
        var {modalInputEnglish, modalInputVietNam, modalInputLoaiTu} = this.state;
        return (
            <tr>
                <td>{word.eng}</td>
                <td>{word.vie}</td>
                <td>{word.wordCategory}</td>
                <td><img src={word.wordImg} style={{width:150,height:100}}></img></td>   
                
                <td>
                    <a href="javascript:;" className="btn btn-success mr-2" onClick={e => this.modalOpen(e)} ><i className="fa fa-plus" /></a>
                    <a href="#" className="btn btn-primary mr-2" onClick={e => this.modalOpen(e)}><i className="fa fa-edit" /></a>
                    <Link to="#" className="btn btn-danger"  onClick={() => this.onDelete(word.id)}><i className="fa fa-trash" /></Link>
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
                                <span>Phát âm</span>
                                <input
                                    type="text"
                                    value={modalInputSpelling}
                                    name="modalInputSpelling"
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
                </td>
            </tr>
        );
    }
}
export default QLTuVung;