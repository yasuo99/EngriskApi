import React, { Component } from 'react';

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
            <div key={comment.id} className="row mt-3 kechan">
                <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src={comment.accountPhotoUrl || "/image/default-user-image.png"} /></div>
                <div className="col-md-11 pt-3">
                    <a href="#">{comment.accountUsername}</a>
                    <p className="mt-3">{comment.comment}</p>
                </div>
                <div className="baocao">
                    {/* <a href="#" className="mr-3">TRẢ LỜI
                    <p className="collapse" id="ketqua">Sau tính từ sở hữu YOUR ta cần một danh từ, nên ta chọn ngay D.</p>
                    </a> */}
                    <a data-toggle="collapse" data-target="#demo" className="mr-3">Collapsible</a>
                    <div id="demo" class="collapse">
                        <input type="text" ></input>
                    </div>
                    <a href="#" className="mr-3">BÁO CÁO</a>
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