import React, { Component } from "react"
import { Button, Modal } from 'react-bootstrap'
import { connect } from "react-redux";
class ContentPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            id: "",
            titleEdit:"",
            modalEdit: false,
            modalDelete: false,
        };
    }
    submitEdit(e) {
        this.setState({
        });
        this.closeEdit();
    }

    openEdit() {
        this.setState({ modalEdit: true });
    }

    closeEdit() {
        this.setState({
            titleEdit:"",
            modalEdit: false,
        });
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
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div className="chude-binhluan">
                <div className="row mt-5">
                    <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src={this.props.post.accountPhotoUrl || "/image/default-user-image.png"} /></div>
                    <div className="col-md-9 pt-3">
                        <h5>{this.props.post.title}</h5>
                        <a href="#">{this.props.post.accountUsername}</a>
                        <hr />
                        <p className="mt-3 mb-3">{this.props.post.content}</p>
                    </div>
                    {(this.props.account.roles.includes("forumadmin") || this.props.account.roles.includes("forummod") || this.props.account.roles.includes("admin") || this.props.account.roles.includes("manager") || this.props.post.accountUsername === this.props.account.username) && <div className="col-2 chucnang">
                    <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e)}><i className="fa fa-edit" /></Button>
                    <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                    </div>}
                    <div className="baocao">
                        <a href="#" className="mr-3">Báo cáo <i className="fa fa-flag"></i></a>
                        <div className="rate">
                            <i className="fa fa-star checked"></i>
                            <i className="fa fa-star checked"></i>
                            <i className="fa fa-star checked"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                    </div>
                </div>
                {/* Modal phần sửa */}
                <Modal show={this.state.modalEdit}>
                    <Modal.Header closeButton onClick={() => this.closeEdit()}>
                        <Modal.Title>Cập nhật bài viết</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group pt-3">
                            <div className="card-input mt-4">
                                <span>Tiêu đề</span>
                                <input
                                    type="text"
                                    value={this.state.titleEdit}
                                    name="titleEdit"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Nội dung bài viết</span>
                                <textarea placeholder="Nhập nội dung bài viết" onChange={(e) => this.setState({ content: e.target.value })} className="tieude"/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeEdit()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitEdit(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                  {/* Modal phần xóa */}
                  <Modal show={this.state.modalDelete}>
                    <Modal.Header closeButton onClick={() => this.closeDelete()}>
                        <Modal.Title>Xác nhận xóa bài viết</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa bài viết này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

            </div>

        )
    }
}
const mapStateToProps = (state) => {
    const { account } = state.auth
    return {
        account: account
    }
}
export default connect(mapStateToProps)(ContentPost);