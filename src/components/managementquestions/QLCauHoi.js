import React, { Component } from "react";
import { Link } from "react-browser-router"
import Modal from "../modal/Modal";
class QLCauHoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalInputQuestion: "",
            modalInputA: "",
            modalInputB: "",
            modalInputC: "",
            modalInputD: "",
            modalInputAnswer: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            question: this.state.modalInputQuestion,
            a: this.state.modalInputA,
            b: this.state.modalInputB,
            c: this.state.modalInputC,
            d: this.state.modalInputD,
            answer: this.state.modalInputAnswer,
        });
        this.modalClose();
    }

    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modalInputQuestion: "",
            modalInputA: "",
            modalInputB: "",
            modalInputC: "",
            modalInputD: "",
            modalInputAnswer: "",
            modal: false
        });
    }
    render() {
        return (
            <tr>
                <td>If you could please get back to me with your_______before the end of the day today, I will make sure that your order is processed in time for delivery by the end of the week.</td>
                <td>
                    prefer
                </td>
                <td>
                    preferred </td>
                <td>
                    preferred</td>
                <td>
                    preference
                </td>
                <td>Sau tính từ sở hữu YOUR ta cần một danh từ, nên ta chọn ngay D</td>
                <td>
                    <a href="javascript:;" className="btn btn-success mr-2" onClick={e => this.modalOpen(e)} ><i className="fa fa-plus" /></a>
                    <a href="#" className="btn btn-primary mr-2" ><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
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
                                            value={this.state.modalInputQuestion}
                                            name="modalInputQuestion"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>A</span>
                                        <input
                                            type="text"
                                            value={this.state.modalInputA}
                                            name="modalInputA"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>B</span>
                                        <input
                                            type="text"
                                            value={this.state.modalInputB}
                                            name="modalInputB"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>C</span>
                                        <input
                                            type="text"
                                            value={this.state.modalInputC}
                                            name="modalInputC"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>D</span>
                                        <input
                                            type="text"
                                            value={this.state.modalInputD}
                                            name="modalInputD"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>Đáp án câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.modalInputAnswer}
                                            name="modalInputAnswer"
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
                                            value={this.state.modalInputQuestion}
                                            name="modalInputQuestion"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>A</span>
                                        <input
                                            type="text"
                                            value={this.state.modalInputA}
                                            name="modalInputA"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>B</span>
                                        <input
                                            type="text"
                                            value={this.state.modalInputB}
                                            name="modalInputB"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>C</span>
                                        <input
                                            type="text"
                                            value={this.state.modalInputC}
                                            name="modalInputC"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>D</span>
                                        <input
                                            type="text"
                                            value={this.state.modalInputD}
                                            name="modalInputD"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>Đáp án câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.modalInputAnswer}
                                            name="modalInputAnswer"
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
                                            value={this.state.modalInputQuestion}
                                            name="modalInputQuestion"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>A</span>
                                        <input
                                            type="file"
                                            value={this.state.modalInputA}
                                            name="modalInputA"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>B</span>
                                        <input
                                            type="file"
                                            value={this.state.modalInputB}
                                            name="modalInputB"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>C</span>
                                        <input
                                            type="file"
                                            value={this.state.modalInputC}
                                            name="modalInputC"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>Đáp án câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.modalInputAnswer}
                                            name="modalInputAnswer"
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
                </td>
            </tr>
        );
    }
}
export default QLCauHoi;