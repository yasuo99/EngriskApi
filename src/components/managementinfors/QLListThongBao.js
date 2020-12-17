import React, { Component } from "react"
import QLThongBao from "./QLThongBao"
import Modal from "../modal/Modal";
import Switch from "react-switch";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import notificationApi from "../../api/notificationApi";
import ModalDelete from "../modal/ModalDelete";
import ModalEdit from "../modal/ModalEdit";
class QLListThongBao extends Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: '',
            modal: false,
            name: "",
            date: "",
            modalInputName: "",
            modalInputDate: "",
            modalInputContent: "",
            notifications: []
        };
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;

        var result = await this.fetchNotification();
        if (this.isComponentMounted) {
            this.setState({
                notifications: result
            });
            $(function () {
                $("#dataTable").DataTable();
            });
        }
    }
    fetchNotification = async () => {
        return await notificationApi.getAll();
    }
    publishNotification = async (id) => {
        await notificationApi.publishNotification(id);
        var result = await this.fetchNotification();
        if (this.isComponentMounted) {
            this.setState({
                notifications: result
            });
        }
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
        const notify = {
            content: this.state.modalInputContent,
            url: this.state.modalInputName
        }
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
        const renderNotification = this.state.notifications.map((notification) =>
            <tr key={notification.id}>
                <td>{notification.id}</td>
                <td>{notification.publishedDate}</td>
                <td>{notification.content}</td>
                <td>
                    <a href="#" className="btn btn-primary mr-2" onClick={e => this.modalOpen(e)} ><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger" onClick={e => this.modalOpenDelete(e)}><i className="fa fa-trash" /></a>
                    <ModalEdit show={this.state.modalEdit} handleClose={e => this.modalClose(e)}>
                        <h2 className="text-center text-primary">Cập nhật thông báo</h2>
                        <hr className="sidebar-divider my-0" />
                        <div className="form-group">
                            <div className="card-input mt-4">
                                <span>Đường dẫn</span>
                                <input
                                    type="text"
                                    value={this.state.modalInputName}
                                    name="modalInputName"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Nội dung</span>
                                <input
                                    type="datetime-local"
                                    value={this.state.modalInputContent}
                                    name="modalInputContent"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className="card-button">
                            <button onClick={e => this.handleSubmit(e)} type="button" className="btn btn-primary float-left">
                                Lưu lại
                        </button>
                        </div>
                    </ModalEdit>
                    <ModalDelete show={this.state.modalDelete} handleClose={e => this.modalClose(e)}>
                        <h3 className="title"> <img src="/image/trash.png"></img> Xác nhận xóa thông báo</h3>
                        <p className="content">
                            Bạn có chắc chắn muốn xóa thông báo này ra khỏi hệ thống không?
                </p>
                        <button onClick={e => this.handleSubmitDelete(e)} type="button" className="btn btn-info float-right">
                            Xác nhận
                </button>
                    </ModalDelete>
                </td>
                <td>
                    <Switch id={notification.id} onChange={(props, event, id) => this.publishNotification(id)} checked={notification.isPublish} />
                </td>
            </tr>
        );
        return (
            <div>
                <a href="javascript:;" className="btn btn-success mr-2 mb-3" onClick={e => this.modalOpen(e)} ><i className="fa fa-plus" /> Thêm thông báo</a>
                {this.isComponentMounted && <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th className="tieudeTB">Tiêu đề</th>
                            <th className="ngayTB">Ngày thông báo</th>
                            <th >Nội dung thông báo</th>
                            <th className="chucnang" />
                            <th className="lock"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderNotification}
                    </tbody>
                </table>}
                <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                    <h2 className="text-center text-primary">Thêm thông báo</h2>
                    <hr className="sidebar-divider my-0" />
                    <div className="form-group">
                        <div className="card-input mt-4">
                            <span>Đường dẫn</span>
                            <input
                                type="text"
                                value={this.state.modalInputName}
                                name="modalInputName"
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div className="card-input mt-4">
                            <span>Nội dung thông báo</span>
                            <input
                                type="text"
                                value={this.state.modalInputContent}
                                name="modalInputContent"
                                onChange={e => this.handleChange(e)}
                            />
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
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default QLListThongBao;