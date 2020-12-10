import React, { Component } from "react"
import QLTaiLieu from "./QLTaiLieu"

class QLListTaiLieu extends Component {
    render() {
        return (
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr>
                        <th className="tieudeTL">Tiêu đề</th>
                        <th >Nội dung tài liệu</th>
                        <th className="fileTL">File đính kèm</th>
                        <th className="chucnang"/>
                    </tr>
                </thead>
                <tbody>
                    <QLTaiLieu></QLTaiLieu>
                    <QLTaiLieu></QLTaiLieu>
                    <QLTaiLieu></QLTaiLieu>
                </tbody>
            </table>
        )
    }
}
export default QLListTaiLieu;