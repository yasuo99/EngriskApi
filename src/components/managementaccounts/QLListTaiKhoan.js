import React, { Component } from "react"
import QLTaiKhoan from "./QLTaiKhoan"

class QLListTaiKhoan extends Component {
    render() {
        return (
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr>
                        <th className="taikhoan">Tên tài khoản</th>
                        <th className="email">Email</th>
                        <th className="hoten">Họ và tên</th>
                        <th className="sdt">Số điện thoại</th>
                        <th className="chucnang"/>
                        <th className="lock"></th>
                    </tr>
                </thead>
                <tbody>
                    <QLTaiKhoan></QLTaiKhoan>
                </tbody>
            </table>
        )
    }
}
export default QLListTaiKhoan;