import React, { Component } from "react"
import Switch from "react-switch";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import notificationApi from "../../api/notificationApi";
import { Button, Modal } from 'react-bootstrap';
class QLListThongBao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            modalDelete: false,
            modalEdit: false,
            content:"",
            // Phần create
            nameCreate: "",
            dateCreate: "",
            contentCreate: "",
            // Phần edit
            nameEdit: "",
            dateEdit: "",
            contentEdit: "",

            notifications: []
        };
        this.isComponentMounted = false;
        this.handleChange = this.handleChange.bind(this);
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
        const notify = {
            content: this.state.contentCreate,
            url: this.state.nameCreate
        }
        this.closeCreate();
    }

    openCreate() {
        this.setState({ modalCreate: true });
    }

    closeCreate() {
        this.setState({
            nameCreate: "",
            modalCreate: false,
            contentCreate:""
        });
    }
    // Xử lý modal edit
    openEdit() {
        this.setState({ modalEdit: true });
    }
    closeEdit() {
        this.setState({
            nameCreate: "",
            contentEdit:"",
            modalEdit: false,
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
        const renderNotification = this.state.notifications.map((notification) =>
            <tr key={notification.id}>
                <td>{notification.id}</td>
                <td>{notification.publishedDate}</td>
                <td>{notification.content}</td>
                <td>
                    <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e)}><i className="fa fa-edit" /></Button>
                    <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>

                </td>
                <td>
                    <Switch id={notification.id} onChange={(props, event, id) => this.publishNotification(id)} checked={notification.isPublish} />
                </td>
            </tr>
        );
        return (
            <div>
                <Button variant="primary" className="btn btn-success mr-2 mb-3" onClick={e => this.openCreate(e)} ><i className="fa fa-plus" /> Thêm thông báo</Button>
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
                {/* Modal thêm */}
                <Modal show={this.state.modalCreate}>
                    <Modal.Header closeButton onClick={() => this.closeCreate()}>
                        <Modal.Title>Thêm thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input mt-4">
                                <span>Đường dẫn</span>
                                <input
                                    type="text"
                                    value={this.state.nameCreate}
                                    name="nameCreate"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Nội dung</span>
                                <textarea placeholder="Nhập nội dung thông báo" 
                                    onChange={e => this.handleChange(e)}
                                    value={this.state.contentCreate}
                                    name="contentCreate"
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeCreate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần xóa */}
                <Modal show={this.state.modalDelete}>
                    <Modal.Header closeButton onClick={() => this.closeDelete()}>
                        <Modal.Title>Xác nhận xóa thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa thông báo này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần sửa */}
                <Modal show={this.state.modalEdit}>
                    <Modal.Header closeButton onClick={() => this.closeEdit()}>
                        <Modal.Title>Cập nhật thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input mt-4">
                                <span>Đường dẫn</span>
                                <input
                                    type="text"
                                    value={this.state.nameEdit}
                                    name="nameEdit"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Nội dung</span>
                                <textarea placeholder="Nhập nội dung thông báo" 
                                    onChange={e => this.handleChange(e)}
                                    value={this.state.contentEdit}
                                    name="contentEdit"
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeEdit()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitEdit(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )


    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default QLListThongBao;