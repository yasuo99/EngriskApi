import React, { Component } from "react";
import { Link } from "react-browser-router"
class ThongBao extends Component {
    render() {
        return (
            <div className="boxInfor">
                <img src="/image/banner1.jpg" className="img-100 img-fluid img-infor" />
                <p className="dateInfor">02/02/2018</p>
                <div className="content">
                    <p>Hôm này website đã cập nhật một số bài quiz mới với chủ đề rất hay và thực tế. Cùng nhau học nào!!! </p>
                    <a href="#" className="btn btn-primary mt-2">Xem ngay</a>
                </div>
            </div>
        );
    }
}
export default ThongBao;