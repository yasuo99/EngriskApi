import React, { Component } from "react"
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import questionApi from "../../api/questionApi";
import { Button, Modal } from 'react-bootstrap'

class QLListCauHoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            modalEdit: false,
            modalDelete: false,
            // Phần create
            questionDocCreate: "",
            ADocCreate: "",
            BDocCreate: "",
            CDocCreate: "",
            DDocCreate: "",
            AnswerDocCreate: "",
            QuestionNgheCreate: "",
            ANgheCreate: "",
            BNgheCreate: "",
            CNgheCreate: "",
            DNgheCreate: "",
            AnswerNgheCreate: "",
            QuestionHinhCreate: "",
            AHinhCreate: "",
            BHinhCreate: "",
            CHinhCreate: "",
            AnswerHinhCreate: "",
            // Phần edit
            questionDocEdit: "",
            ADocEdit: "",
            BDocEdit: "",
            CDocEdit: "",
            DDocEdit: "",
            AnswerDocEdit: "",
            QuestionNgheEdit: "",
            ANgheEdit: "",
            BNgheEdit: "",
            CNgheEdit: "",
            DNgheEdit: "",
            AnswerNgheEdit: "",
            QuestionHinhEdit: "",
            AHinhEdit: "",
            BHinhEdit: "",
            CHinhEdit: "",
            AnswerHinhEdit: "",

            questions: [],

        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.submitCreate.bind(this);
        // this.handleSubmit = this.submitEdit.bind(this);
        // this.handleSubmit = this.submitDelete.bind(this);
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        var result = await this.fetchQuestion();
        if (this.isComponentMounted) {
            this.setState({
                questions: result
            });
            $(function () {
                $("#dataTable").DataTable();
            });
        }
    }
    fetchQuestion = async () => {
        return await questionApi.getAll();
    }

    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    // Xử lý modal create
    submitCreate(e) {
        this.setState({

        });
        this.closeCreate();
    }

    openCreate() {
        this.setState({ modalCreate: true });
    }

    closeCreate() {
        this.setState({
            modalCreate: false,
            questionDocCreate: "",
            ADocCreate: "",
            BDocCreate: "",
            CDocCreate: "",
            DDocCreate: "",
            AnswerDocCreate: "",
            QuestionNgheCreate: "",
            ANgheCreate: "",
            BNgheCreate: "",
            CNgheCreate: "",
            DNgheCreate: "",
            AnswerNgheCreate: "",
            QuestionHinhCreate: "",
            AHinhCreate: "",
            BHinhCreate: "",
            CHinhCreate: "",
            AnswerHinhCreate: "",
        });
    }
    // Xử lý modal edit
    openEdit() {
        this.setState({ modalEdit: true });
    }
    closeEdit() {
        this.setState({
            modalEdit: false,
            questionDocEdit: "",
            ADocEdit: "",
            BDocEdit: "",
            CDocEdit: "",
            DDocEdit: "",
            AnswerDocEdit: "",
            QuestionNgheEdit: "",
            ANgheEdit: "",
            BNgheEdit: "",
            CNgheEdit: "",
            DNgheEdit: "",
            AnswerNgheEdit: "",
            QuestionHinhEdit: "",
            AHinhEdit: "",
            BHinhEdit: "",
            CHinhEdit: "",
            AnswerHinhEdit: "",
        });
    }
    submitEdit(e) {
        this.setState({
        });
        this.closeEdit();
    }
    // Xử lý modal delete
    openDelete() {
        this.setState({ modalDelete: true });
    }
    closeDelete() {
        this.setState({
            modalDelete: false,
        });
    }
    submitDelete(e) {
        this.setState({

        });
        this.closeDelete();
    }
    render() {
        const renderQuestions = this.state.questions.map((question) =>
            <tr key={question.id}>
                <td>{question.content}</td>
                <td>{question.a}</td>
                <td>{question.b}</td>
                <td>{question.c}</td>
                <td>{question.d}</td>
                <td>{question.answer}</td>
                <td>
                    <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e)}><i className="fa fa-edit" /></Button>
                    <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                </td>
            </tr>
        );
        return (
            <div>
                <Button variant="primary" className="btn btn-success mr-2 mb-3" onClick={e => this.openCreate(e)} ><i className="fa fa-plus" /> Thêm câu hỏi</Button>
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
                        {renderQuestions}
                    </tbody>
                </table>
                {/* Modal create */}
                <Modal show={this.state.modalCreate}>
                    <Modal.Header closeButton onClick={() => this.closeCreate()}>
                        <Modal.Title>Thêm câu hỏi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="nav nav-tabs mt-5">
                            <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#taboneCreate"><i className="fa fa-book" /> Câu hỏi đọc</a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwoCreate"><i className="fa fa-star" /> Câu hỏi nghe </a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthreeCreate"><i className="fa fa-bolt" /> Câu hỏi hình ảnh</a> </li>
                        </ul>
                        <div className="tab-content mt-3">
                            <div className="tab-pane fade show active" id="taboneCreate" role="tabpanel">
                                <div className="form-group">
                                    <div className="card-input mt-4">
                                        <span>Câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.QuestionDocCreate}
                                            name="QuestionDocCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>A</span>
                                        <input
                                            type="text"
                                            value={this.state.ADocCreate}
                                            name="ADocCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>B</span>
                                        <input
                                            type="text"
                                            value={this.state.BDocCreate}
                                            name="BDocCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>C</span>
                                        <input
                                            type="text"
                                            value={this.state.CDocCreate}
                                            name="CDocCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>D</span>
                                        <input
                                            type="text"
                                            value={this.state.DDocCreate}
                                            name="DDocCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>Đáp án câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.AnswerDocCreate}
                                            name="AnswerDocCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="tab-pane fade" id="tabtwoCreate" role="tabpanel">
                                <div className="form-group">
                                    <div className="card-input mt-4">
                                        <span>Câu hỏi</span>
                                        <input
                                            type="file"
                                            value={this.state.QuestionNgheCreate}
                                            name="QuestionNgheCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>A</span>
                                        <input
                                            type="text"
                                            value={this.state.ANgheCreate}
                                            name="ANgheCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>B</span>
                                        <input
                                            type="text"
                                            value={this.state.BNgheCreate}
                                            name="BNgheCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>C</span>
                                        <input
                                            type="text"
                                            value={this.state.CNgheCreate}
                                            name="CNgheCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>D</span>
                                        <input
                                            type="text"
                                            value={this.state.DNgheCreate}
                                            name="DNgheCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>Đáp án câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.AnswerNgheCreate}
                                            name="AnswerNgheCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="tabthreeCreate" role="tabpanel">
                                <div className="form-group">
                                    <div className="card-input mt-4">
                                        <span>Câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.QuestionHinhCreate}
                                            name="QuestionHinhCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>A</span>
                                        <input
                                            type="file"
                                            value={this.state.AHinhCreate}
                                            name="AHinhCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>B</span>
                                        <input
                                            type="file"
                                            value={this.state.BHinhCreate}
                                            name="BHinhCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>C</span>
                                        <input
                                            type="file"
                                            value={this.state.CHinhCreate}
                                            name="CHinhCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>Đáp án câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.AnswerHinhCreate}
                                            name="AnswerHinhCreate"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeCreate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal Edit */}
                <Modal show={this.state.modalEdit}>
                    <Modal.Header closeButton onClick={() => this.closeEdit()}>
                        <Modal.Title>Cập nhật câu hỏi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="nav nav-tabs mt-5">
                            <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#taboneEdit"><i className="fa fa-book" /> Câu hỏi đọc</a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwoEdit"><i className="fa fa-star" /> Câu hỏi nghe </a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthreeEdit"><i className="fa fa-bolt" /> Câu hỏi hình ảnh</a> </li>
                        </ul>
                        <div className="tab-content mt-3">
                            <div className="tab-pane fade show active" id="taboneEdit" role="tabpanel">
                                <div className="form-group">
                                    <div className="card-input mt-4">
                                        <span>Câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.QuestionDocEdit}
                                            name="QuestionDocEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>A</span>
                                        <input
                                            type="text"
                                            value={this.state.ADocEdit}
                                            name="ADocEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>B</span>
                                        <input
                                            type="text"
                                            value={this.state.BDocEdit}
                                            name="BDocEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>C</span>
                                        <input
                                            type="text"
                                            value={this.state.CDocEdit}
                                            name="CDocEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>D</span>
                                        <input
                                            type="text"
                                            value={this.state.DDocEdit}
                                            name="DDocEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>Đáp án câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.AnswerDocEdit}
                                            name="AnswerDocEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="tab-pane fade" id="tabtwoEdit" role="tabpanel">
                                <div className="form-group">
                                    <div className="card-input mt-4">
                                        <span>Câu hỏi</span>
                                        <input
                                            type="file"
                                            value={this.state.QuestionNgheEdit}
                                            name="QuestionNgheEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>A</span>
                                        <input
                                            type="text"
                                            value={this.state.ANgheEdit}
                                            name="ANgheEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>B</span>
                                        <input
                                            type="text"
                                            value={this.state.BNgheEdit}
                                            name="BNgheEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>C</span>
                                        <input
                                            type="text"
                                            value={this.state.CNgheEdit}
                                            name="CNgheEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>D</span>
                                        <input
                                            type="text"
                                            value={this.state.DNgheEdit}
                                            name="DNgheEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>Đáp án câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.AnswerNgheEdit}
                                            name="AnswerNgheEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="tabthreeEdit" role="tabpanel">
                                <div className="form-group">
                                    <div className="card-input mt-4">
                                        <span>Câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.QuestionHinhEdit}
                                            name="QuestionHinhEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>A</span>
                                        <input
                                            type="file"
                                            value={this.state.AHinhEdit}
                                            name="AHinhEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>B</span>
                                        <input
                                            type="file"
                                            value={this.state.BHinhEdit}
                                            name="BHinhEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>C</span>
                                        <input
                                            type="file"
                                            value={this.state.CHinhEdit}
                                            name="CHinhEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="card-input mt-4">
                                        <span>Đáp án câu hỏi</span>
                                        <input
                                            type="text"
                                            value={this.state.AnswerHinhEdit}
                                            name="AnswerHinhEdit"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeEdit()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitEdit(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal Delete */}
                <Modal show={this.state.modalDelete}>
                    <Modal.Header closeButton onClick={() => this.closeDelete()}>
                        <Modal.Title>Xác nhận xóa câu hỏi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa câu hỏi này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default QLListCauHoi;