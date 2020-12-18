import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalListCauHoiDoc from "../modalcauhoi/ModalListCauHoiDoc";
import ModalListCauHoiHinhAnh from "../modalcauhoi/ModalListCauHoiHinhAnh";
import ModalListCauHoiNghe from "../modalcauhoi/ModalListCauHoiNghe";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import { Button, Modal } from 'react-bootstrap'
import QLSection from './QLSection';
export class QLListSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
        };
    }
    componentDidMount() {
        $(function(){
            $("#dataTableExam").DataTable();
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    submitCreate(e) {
        this.setState({

        });
        this.modalClose();
    }

    openCreate() {
        this.setState({ modalCreate: true });
    }

    closeCreate() {
        this.setState({
            modalCreate: false,
        });
    }
    render() {
        return (
            <div>
                <a href="javascript:;" className="btn btn-success mr-2 mb-3" onClick={e => this.modalOpen(e)} ><i className="fa fa-plus" /> Thêm bài exam</a>
                <Modal show={this.state.modalCreate}>
                    <Modal.Header closeButton onClick={() => this.closeCreate()}>
                        <Modal.Title>Thêm câu hỏi vào bài exam</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <ul className="nav nav-tabs">
                            <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#taboneQuestion"><i className="fa fa-book" /> Câu hỏi đọc</a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwoQuestion"><i className="fa fa-star" /> Câu hỏi nghe </a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthreeQuestion"><i className="fa fa-bolt" /> Câu hỏi hình ảnh</a> </li>
                        </ul>
                        <div className="tab-content mt-3">
                            <div className="tab-pane fade show active" id="taboneQuestion" role="tabpanel">
                                <ModalListCauHoiDoc></ModalListCauHoiDoc>
                            </div>

                            <div className="tab-pane fade" id="tabtwoQuestion" role="tabpanel">
                                <ModalListCauHoiNghe></ModalListCauHoiNghe>
                            </div>
                            <div className="tab-pane fade" id="tabthreeQuestion" role="tabpanel">
                                <ModalListCauHoiHinhAnh></ModalListCauHoiHinhAnh>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeCreate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                <table className="table table-bordered" id="dataTableExam" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th >Exam</th>
                            <th >Câu hỏi</th>
                            <th className="chucnang" />
                        </tr>
                    </thead>
                    <tbody>
                        <QLSection></QLSection>
                    </tbody>
                </table>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({

    })
}

const mapDispatchToProps = (dispatch) => {
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QLListSection)
