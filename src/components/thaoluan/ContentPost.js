import React, { Component } from "react"
import { Button, Modal } from 'react-bootstrap'
import CKEditor from "react-ckeditor-component";
import { connect } from "react-redux";
class ContentPost extends Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: '',
            id: "",
            modalEdit: false,
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
            modalEdit: false,
        });
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
                        <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
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
                        <Modal.Title>Cập nhật từ vựng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group pt-3">
                            <div className="card-input mt-4">
                                <span>Tiêu đề</span>
                                <input
                                    type="text"
                                    value={this.state.modalInputTitle}
                                    name="modalInputTitle"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Nội dung bài viết</span>
                                <textarea placeholder="Nhập nội dung bài viết" onChange={(e) => this.setState({ content: e.target.value })} className="tieude" />
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
}
const mapStateToProps = (state) => {
    const { account } = state.auth
    return {
        account: account
    }
}
export default connect(mapStateToProps)(ContentPost);