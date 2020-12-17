import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';

class PhanHoiPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            selectedCommentId: 0,
            comment: "",
            likeCommentId: 0
        }
        this.replyComment = this.replyComment.bind(this);
    }
    replyComment = async () => {
        await this.props.replyComment( this.state.comment,this.state.selectedCommentId);
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
                        <p className="mt-3">{comment.comment}</p>
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
                            <a href="#">{reply.accountUsername}</a>
                            <p className="mt-1">{reply.comment}</p>
                            <a href="#" className="mr-3"><img src="/image/like.png" id={reply.replyId} onClick={(e) => this.likeComment(e)}></img> {reply.like}</a>
                        </div>

                    </div>
                )}

            </div>
        )
        return (
            <div>
                {renderComments}
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