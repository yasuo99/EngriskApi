import React, { Component } from "react";
import { Link } from "react-browser-router"
import Moment from 'moment';
class ThongBao extends Component {
    constructor(props){
        super(props);
    }
    render() {
console.log("dm");
        return (
            <div className="boxInfor">
                <img src="/image/banner1.jpg" className="img-100 img-fluid img-infor" />
                <p className="dateInfor">{Moment(this.props.notify.publishedDate).format("MMMM Do YYYY")}</p>
                <div className="content">
                    <p>{this.props.notify.content}</p>
                    {this.props.notify.url && <a href={this.props.notify.url} className="btn btn-primary mt-2">Xem ngay</a>}
                </div>
            </div>
        );
    }
}
export default ThongBao;