import React, { Component } from "react"
import QLThongBao from "./QLThongBao"

class QLListThongBao extends Component {
    render() {
        return (
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr>
                        <th className="tieudeTB">Tiêu đề</th>
                        <th className="ngayTB">Ngày thông báo</th>
                        <th >Nội dung thông báo</th>
                        <th className="chucnang"/>
                    </tr>
                </thead>
                <tbody>
                    <QLThongBao></QLThongBao>
                    <QLThongBao></QLThongBao>
                    <QLThongBao></QLThongBao>
                </tbody>
            </table>
        )
    }
}
export default QLListThongBao;