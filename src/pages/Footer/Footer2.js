import React from "react";
import { Link } from "react-router-dom";

const Footer2 = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-5">
                        <div className="row kechan pt-3">
                            <div className="col-2 text-center">
                                <h6><Link to="#">GIỚI THIỆU</Link></h6>
                            </div>
                            <div className="col-2 text-center">
                                <h6><Link to="#">HỌC ĐƯỜNG</Link></h6>
                            </div>
                            <div className="col-2 text-center">
                                <h6><Link to="#">ỨNG DỤNG</Link></h6>
                            </div>
                            <div className="col-2 text-center">
                                <h6><Link to="#">TRỢ GIÚP</Link></h6>
                            </div>
                            <div className="col-2 text-center">
                                <h6><Link to="#">ĐIỀU KHOẢN</Link></h6>
                            </div>
                            <div className="col-2 text-center">
                                <h6><Link to="#">QUYỀN RIÊNG TƯ</Link></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}
export default Footer2;