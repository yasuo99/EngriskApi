import React, { Component } from "react"
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import vi from 'javascript-time-ago/locale/vi'
class Post extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="row p-2">
                <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src={this.props.post.accountPhotoUrl || "/image/default-user-image.png"} /></div>
                <div className="col-md-8 pt-3">
        <h5><Link to={"/thao-luan-chi-tiet/" + this.props.post.id}>{this.props.post.title}</Link></h5>
                    <p><ReactTimeAgo date={this.props.post.createdDate !== undefined ? this.props.post.createdDate : Date.now().toLocaleString()} locale='vi'/></p>
                </div>
                <div className="col-2 text-right pt-3"><img src="/image/iconfinder___Message_1904663.png" /> {this.props.post.totalComment}</div>
            </div>
        )
    }
}
export default Post;