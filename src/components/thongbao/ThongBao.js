import React, { Component } from "react";
import { Link } from "react-browser-router"
import Moment from 'moment';
class ThongBao extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            // <div className="boxInfor">
            //     <img src="/image/banner1.jpg" className="img-100 img-fluid img-infor" />
            //     <p className="dateInfor">sâs</p>
            //     <div className="content">
            //         <p>{this.props.notify.content}</p>
            //         {this.props.notify.url && <a href={this.props.notify.url} className="btn btn-primary mt-2">Xem ngay</a>}
            //     </div>
            // </div>
            <div className="boxInfor">
                <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <div className="row">
                        <div className="header">
                            <div className="col-md-1">
                            <div className="avatar">
                                <img src="./image/welcome.jpg" alt="info" width="50" height="50"></img>
                            </div>
                            </div>
                            <div className="col-md-11">
                                <div className="content">
                                    <p className="dateInfor">10/05/2021</p>
                                    <p>Thông báo chúng tôi có một bài học chủ đề về cuộc sống quanh ta</p>
                                </div>
                            </div>
                        </div>
                        <div className="collapse" id="collapseExample">
                            <div className="cardCollapse">
                                <div className="col-md-8 offset-1 contentCollapse">
                                    <p>You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </a>

            </div>
        );
    }
}
export default ThongBao;
