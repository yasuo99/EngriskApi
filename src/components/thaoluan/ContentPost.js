import React, { Component } from "react"
import Modal from "../modal/Modal";
import CKEditor from "react-ckeditor-component";
class ContentPost extends Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: '',
            id: "",
            modal: false,
        };

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
            modal:false,
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
                    <div className="col-2 chucnang">
                        <a href="javascript:;" className="btn btn-primary mr-2" onClick={e => this.modalOpen(e)} ><i className="fa fa-edit" /></a>
                        <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
                    </div>
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
                <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                    <h2 className="text-center text-primary">Chỉnh sửa bài viết</h2>
                    <hr className="sidebar-divider my-0" />
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
                            <span>Hình ảnh bài viết</span><input type="file" accept="image/png, image/jpeg" />
                        </div>
                    </div>
                    <div className="card-button mt-5">
                        <button onClick={e => this.handleSubmit(e)} type="button" className="btn btn-primary float-left">
                            Lưu lại
                        </button>
                    </div>
                </Modal>
            </div>

        )
    }
}
export default ContentPost;