import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';
import { Button, Modal } from 'react-bootstrap'
class PhanHoiPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            selectedCommentId: 0,
            comment: "",
            likeCommentId: 0,
            content: '',
            modalEdit: false,
            modalDelete: false,
        }
        this.replyComment = this.replyComment.bind(this);
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
    replyComment = async () => {
        await this.props.replyComment(this.state.comment, this.state.selectedCommentId);
        this.setState({
            comment: ""
        })
    }
    likeComment = async (e) => {
        e.preventDefault();
        this.props.likeComment(e.target.id);
    }
    render() {
        const renderComments = this.props.comments.map((comment) =>
            <div key={comment.id} className="row kechan d-block">
                <div className="row mt-3 ">
                    <div className="col-md-1 nd-img"><img className="img-fluid mb-4 img-chitietthaoluan" src={comment.accountPhotoUrl || "/image/default-user-image.png"} /></div>
                    <div className="col-md-11 pt-3">
                    <a href="#">{comment.accountUsername}</a>
                        <span className="more">
                            <p className="mt-3">{comment.comment}
                            <span className="dropdown">
                                <a className="ml-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src="/image/morel.png"></img>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Button variant="primary" className="dropdown-item mr-2" onClick={e => this.openEdit(e)}>Chỉnh sửa bình luận</Button>
                                    <Button variant="primary" className="dropdown-item" onClick={e => this.openDelete(e)}>Xóa bình luận</Button>
                                </div>
                            </span>
                            </p>
                        </span>

                        

                    </div>
                    <a href="#" className="mr-3"><img src="/image/like.png" id={comment.id} onClick={(e) => this.likeComment(e)}></img> {comment.like}</a>

                </div>
                {this.props.isLoggedIn && <div className="row mt-2">
                    <div className="baocao ">
                        <a href="#" className="mr-3">BÁO CÁO</a>
                        <a data-toggle="collapse" data-target={`#demo${comment.id}`} id={comment.id} onClick={(e) => this.setState({ selectedCommentId: e.target.id })} className="mr-3">BÌNH LUẬN</a>
                        <div id={`demo${comment.id}`} className="collapse binhluan">
                            <form>
                                <textarea rows={3} cols={120} placeholder="Gửi một bình luận mới" value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })} />
                                <button type="button" className="btn btn-primary mr-3 mt-2" onClick={this.replyComment}>ĐĂNG</button>
                                <button type="button" className="btn btn-primary mt-2">HỦY</button>
                            </form>
                        </div>

                    </div>
                </div>}
                {comment.replies.map((reply) =>
                    <div key={reply.id} className="row reply-binhluan">
                        <div className="col-md-1"></div>
                        <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-2 img-chitietthaoluan" src={reply.accountPhotoUrl || "/image/default-user-image.png"} /></div>
                        <div className="col-md-10">
                        <a href="#">{comment.accountUsername}</a>
                        <span className="more">
                            <p className="mt-3">{comment.comment}
                            <span className="dropdown">
                                <a className="ml-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src="/image/morel.png"></img>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Button variant="primary" className="dropdown-item mr-2" onClick={e => this.openEdit(e)}>Chỉnh sửa bình luận</Button>
                                    <Button variant="primary" className="dropdown-item" onClick={e => this.openDelete(e)}>Xóa bình luận</Button>
                                </div>
                            </span>
                            </p>
                        </span>
                            <a href="#" className="mr-3"><img src="/image/like.png" id={reply.replyId} onClick={(e) => this.likeComment(e)}></img> {reply.like}</a>
                        </div>

                    </div>
                )}


            </div>
        )
        return (
            <div>
                {renderComments}
                {/* Modal phần sửa */}
                <Modal show={this.state.modalEdit}>
                    <Modal.Header closeButton onClick={() => this.closeEdit()}>
                        <Modal.Title>Cập nhật bình luận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group pt-3">
                            <div className="card-input mt-4">
                                <span>Nội dung bình luận</span>
                                <textarea placeholder="Nhập nội dung bài viết" onChange={(e) => this.setState({ content: e.target.value })} className="tieude" />
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
                        <Modal.Title>Xác nhận xóa bình luận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa bình luận này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    const { isLoggedIn } = state.auth;
    return {
        isLoggedIn: isLoggedIn
    }
}
export default connect(mapStateToProps)(PhanHoiPost);