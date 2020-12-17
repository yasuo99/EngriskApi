import React, { Component } from "react"
import QLTaiLieu from "./QLTaiLieu"
import Modal from "../modal/Modal";
import CKEditor from "react-ckeditor-component";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
class QLListTaiLieu extends Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: '',
            modal: false,
            name: "",
            modalInputName: "",
        };
    }
    componentDidMount(){
        $(function(){
            $("#dataTable").DataTable();
        })
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
        this.setState({ name: this.state.modalInputName });
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
            <div>
                <a href="javascript:;" className="btn btn-success mr-2 mb-3" onClick={e => this.modalOpen(e)} ><i className="fa fa-plus" /> Thêm tài liệu</a>

                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th className="tieudeTL">Tiêu đề</th>
                            <th >Nội dung tài liệu</th>
                            <th className="fileTL">File đính kèm</th>
                            <th className="chucnang" />
                        </tr>
                    </thead>
                    <tbody>
                        <QLTaiLieu></QLTaiLieu>
                        <QLTaiLieu></QLTaiLieu>
                        <QLTaiLieu></QLTaiLieu>
                    </tbody>
                </table>
                <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                    <h2 className="text-center text-primary">Thêm tài liệu</h2>
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
                            <span>Nội dung tài liệu</span>
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
                        <div className="card-input mt-4">
                            <span>File đính kèm</span><input type="file" accept=".doc,.docx,.pdf" />
                        </div>
                    </div>
                    <div className="card-button">
                        <button onClick={e => this.handleSubmit(e)} type="button" className="btn btn-primary float-left">
                            Lưu lại
                                </button>
                    </div>
                </Modal>

            </div>
        )
    }
}
export default QLListTaiLieu;