import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalListCauHoiDoc from "../modalcauhoi/ModalListCauHoiDoc";
import ModalListCauHoiHinhAnh from "../modalcauhoi/ModalListCauHoiHinhAnh";
import ModalListCauHoiNghe from "../modalcauhoi/ModalListCauHoiNghe";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import Modal from "../modal/Modal";
import QLSection from './QLSection';
export class QLListSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
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
        });
    }
    render() {
        return (
            <div>
                <a href="javascript:;" className="btn btn-success mr-2 mb-3" onClick={e => this.modalOpen(e)} ><i className="fa fa-plus" /> Thêm bài exam</a>
                <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                    <h2 className="text-center text-primary">Thêm câu hỏi vào bài exam</h2>
                    <hr className="sidebar-divider my-2" />
                    <ul className="nav nav-tabs">
                        <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#tabone"><i className="fa fa-book" /> Câu hỏi đọc</a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwo"><i className="fa fa-star" /> Câu hỏi nghe </a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthree"><i className="fa fa-bolt" /> Câu hỏi hình ảnh</a> </li>
                    </ul>
                    <div className="tab-content mt-3">
                        <div className="tab-pane fade show active" id="tabone" role="tabpanel">
                            <ModalListCauHoiDoc></ModalListCauHoiDoc>
                        </div>

                        <div className="tab-pane fade" id="tabtwo" role="tabpanel">
                            <ModalListCauHoiNghe></ModalListCauHoiNghe>
                        </div>
                        <div className="tab-pane fade" id="tabthree" role="tabpanel">
                            <ModalListCauHoiHinhAnh></ModalListCauHoiHinhAnh>
                        </div>
                    </div>
                    <div className="card-button">
                        <button onClick={e => this.handleSubmit(e)} type="button" className="btn btn-primary float-left">
                            Lưu lại
                                </button>
                    </div>
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
