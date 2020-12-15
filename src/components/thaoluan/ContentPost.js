import React, { Component } from "react"

class ContentPost extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="chude-binhluan">
                <div className="row mt-5">
                    <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src={this.props.post.accountPhotoUrl || "/image/default-user-image.png"} /></div>
                    <div className="col-md-11 pt-3">
                        <h5>{this.props.post.title}</h5>
                        <a href="#">{this.props.post.accountUsername}</a>
                        <hr/>
                        <p className="mt-3">{this.props.post.content}</p>
                    </div>
                    <div className="baocao">
                        <a href="#" className="mr-3">Báo cáo <i className="fa fa-flag-alt"></i></a>
                    </div>
                </div>
            </div>

        )
    }
}
export default ContentPost;