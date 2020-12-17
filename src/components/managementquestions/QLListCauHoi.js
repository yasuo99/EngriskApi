import React, { Component } from "react"
import QLCauHoi from "./QLCauHoi";
import Modal from "../modal/Modal";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
class QLListCauHoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalInputQuestionDoc: "",
            modalInputADoc: "",
            modalInputBDoc: "",
            modalInputCDoc: "",
            modalInputDDoc: "",
            modalInputAnswerDoc: "",
            modalInputQuestionNghe: "",
            modalInputANghe: "",
            modalInputBNghe: "",
            modalInputCNghe: "",
            modalInputDNghe: "",
            modalInputAnswerNghe: "",
            modalInputQuestionHinh: "",
            modalInputAHinh: "",
            modalInputBHinh: "",
            modalInputCHinh: "",
            modalInputAnswerHinh: "",
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        $(function () {
            $("#dataTable").DataTable();
        })
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
            modalInputQuestionDoc: "",
            modalInputADoc: "",
            modalInputBDoc: "",
            modalInputCDoc: "",
            modalInputDDoc: "",
            modalInputAnswerDoc: "",
            modalInputQuestionNghe: "",
            modalInputANghe: "",
            modalInputBNghe: "",
            modalInputCNghe: "",
            modalInputDNghe: "",
            modalInputAnswerNghe: "",
            modalInputQuestionHinh: "",
            modalInputAHinh: "",
            modalInputBHinh: "",
            modalInputCHinh: "",
            modalInputAnswerHinh: "",
        });
    }
    render() {
        return (
            <div>
                <a href="javascript:;" className="btn btn-success mr-2 mb-3" onClick={e => this.modalOpen(e)} ><i className="fa fa-plus" /> Thêm câu hỏi</a>
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th >Câu hỏi</th>
                            <th className="cautraA">A</th>
                            <th className="cautraB">B</th>
                            <th className="cautraC">C</th>
                            <th className="cautraD">D</th>
                            <th className="dapAn">Đáp án câu hỏi</th>
                            <th className="chucnang" />
                        </tr>
                    </thead>
                    <tbody>
                        <QLCauHoi></QLCauHoi>
                    </tbody>
                </table>
                <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                    <h2 className="text-center text-primary">Thêm câu hỏi</h2>
                    <hr className="sidebar-divider my-0" />
                    <ul className="nav nav-tabs mt-5">
                        <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#tabone"><i className="fa fa-book" /> Câu hỏi đọc</a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwo"><i className="fa fa-star" /> Câu hỏi nghe </a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthree"><i className="fa fa-bolt" /> Câu hỏi hình ảnh</a> </li>
                    </ul>
                    <div className="tab-content mt-3">
                        <div className="tab-pane fade show active" id="tabone" role="tabpanel">
                        <div className="form-group">
                                <div className="card-input mt-4">
                                    <span>Câu hỏi</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputQuestionDoc}
                                        name="modalInputQuestionDoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>A</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputADoc}
                                        name="modalInputADoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>B</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputBDoc}
                                        name="modalInputBDoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>C</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputCDoc}
                                        name="modalInputCDoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>D</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputDDoc}
                                        name="modalInputDDoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>Đáp án câu hỏi</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputAnswerDoc}
                                        name="modalInputAnswerDoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="tab-pane fade" id="tabtwo" role="tabpanel">
                            <div className="form-group">
                                <div className="card-input mt-4">
                                    <span>Câu hỏi</span>
                                    <input
                                        type="file"
                                        value={this.state.modalInputQuestionNghe}
                                        name="modalInputQuestionNghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>A</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputANghe}
                                        name="modalInputANghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>B</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputBNghe}
                                        name="modalInputBNghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>C</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputCNghe}
                                        name="modalInputCNghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>D</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputDNghe}
                                        name="modalInputDNghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>Đáp án câu hỏi</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputAnswerNghe}
                                        name="modalInputAnswerNghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="tab-pane fade" id="tabthree" role="tabpanel">
                            <div className="form-group">
                                <div className="card-input mt-4">
                                    <span>Câu hỏi</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputQuestionHinh}
                                        name="modalInputQuestionHinh"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>A</span>
                                    <input
                                        type="file"
                                        value={this.state.modalInputAHinh}
                                        name="modalInputAHinh"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>B</span>
                                    <input
                                        type="file"
                                        value={this.state.modalInputBHinh}
                                        name="modalInputBHinh"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>C</span>
                                    <input
                                        type="file"
                                        value={this.state.modalInputCHinh}
                                        name="modalInputCHinh"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>Đáp án câu hỏi</span>
                                    <input
                                        type="text"
                                        value={this.state.modalInputAnswerHinh}
                                        name="modalInputAnswerHinh"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                            </div>

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
export default QLListCauHoi;