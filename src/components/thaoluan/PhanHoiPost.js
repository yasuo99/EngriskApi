import React, { Component } from 'react';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';

class PhanHoiPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }
    render() {
        console.log(this.props);
        const renderComments = this.props.comments.map((comment) =>
            <div className="row kechan d-block">
                <div key={comment.id} className="row mt-3 ">
                    <div className="col-md-1 nd-img"><img className="img-fluid mb-4 img-chitietthaoluan" src={comment.accountPhotoUrl || "/image/default-user-image.png"} /></div>
                    <div className="col-md-11 pt-3">
                        <a href="#">{comment.accountUsername}</a>
                        <p className="mt-3">{comment.comment}</p>
                    </div>
                    <a href="#" className="mr-3"><img src="/image/like.png"></img> 50</a>
                    <a href="#" className="mr-3"><img src="/image/dislike.png"></img> 59</a>
                </div>
                <div className="row mt-2">
                    <div className="baocao ">
                        <a href="#" className="mr-3">BÁO CÁO</a>
                        <a data-toggle="collapse" data-target="#demo" className="mr-3">BÌNH LUẬN</a>
                        <div id="demo" class="collapse binhluan">
                            <form>
                                <textarea rows={3} cols={120} placeholder="Gửi một bình luận mới" />
                                <button type="button" className="btn btn-primary mr-3 mt-2">ĐĂNG</button>
                                <button type="button" className="btn btn-primary mt-2">HỦY</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row reply-binhluan">
                    <div className="col-md-1"></div>
                    <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-2 img-chitietthaoluan" src={comment.accountPhotoUrl || "/image/default-user-image.png"} /></div>
                    <div className="col-md-10">
                        <a href="#">{comment.accountUsername}</a>
                        <p className="mt-1">{comment.comment}</p>
                    </div>
                </div>
            </div>
        )
        return (
            <div>
                {renderComments}
            </div>

        );
    }
}
export default PhanHoiPost;