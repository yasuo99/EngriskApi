import React, { Component } from "react";
import { Link } from "react-browser-router"
import Modal from "../modal/Modal";
import CKEditor from "react-ckeditor-component";
class QLThongBao extends Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: '',
            modal: false,
            name: "",
            date: "",
            modalInputName: "",
            modalInputDate: ""
        };
    }
      updateContent() {
        var content = localStorage.getItem('content');
        this.setState({
          content: content
        })
        console.log(this.state.content);
        localStorage.removeItem('content');
      }
    
      onChange(evt) {
        console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        console.log(newContent);
        localStorage.setItem('content', newContent);
      }
    
      onBlur(evt) {
        console.log("onBlur event called with event info: ", evt);
      }
    
      afterPaste(evt) {
        console.log("afterPaste event called with event info: ", evt);
      }
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        this.setState({ name: this.state.modalInputName, date: this.state.modalInputDate});
        this.modalClose();
    }

    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modalInputName: "",
            modal: false
        });
    }
    render() {
        return (
            <tr>
                <td>Học tập</td>
                <td>02-02-2020</td>
                <td>Bạn cần phải nổ lực hơn trong việc học tiếng anh</td>
                <td>
                    
                    <a href="#" className="btn btn-primary mr-2" ><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
                        <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                            <h2 className="text-center text-primary">Thêm thông báo</h2>
                            <hr className="sidebar-divider my-0" />
                            <div className="form-group">
                                <div className="card-input mt-4">
                                    <span>Tiêu đề</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputName}
                                        name="modalInputName"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>Thời gian</span>
                                    <input 
                                        type="datetime-local" 
                                        value={this.state.modalInputDate}
                                        name="modalInputDate"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>Nội dung thông báo</span>
                                    <CKEditor
                                        activeClass="p10"
                                        content={this.state.content}
                                        events={{
                                            "blur": this.onBlur,
                                            "afterPaste": this.afterPaste,
                                            "change": this.onChange
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="card-button">
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
export default QLThongBao;