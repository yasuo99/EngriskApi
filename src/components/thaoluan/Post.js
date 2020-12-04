import React, { Component } from "react"
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
class Post extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-2"><img className="img-fluid d-block mb-4 img-thaoluan" src="image/imag-01.jpg" /></div>
                <div className="col-md-8 pt-3">
        <h5><Link to={"/thao-luan-chi-tiet/" + this.props.post.id}>{this.props.post.title}</Link></h5>
                    <p><ReactTimeAgo date={this.props.post.date} locale="en-US"/></p>
                </div>
                <div className="col-2 text-right pt-3"><img src="image/iconfinder___Message_1904663.png" /> {this.props.post.totalComment}</div>
            </div>
        )
    }
}
export default Post;