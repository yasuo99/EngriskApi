import React, { Component } from "react"
import QLTuVung from "./QLTuVung"

class QLListTuVung extends Component {
    render() {
        return (
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr>
                        <th className="english">English</th>
                        <th className="vietnam">Việt Nam</th>
                        <th className="loaitu">Loại từ vựng</th>
                        <th >Ví dụ</th>
                        <th className="hinhanh">Hình ảnh</th>
                        <th className="chucnang"/>
                    </tr>
                </thead>
                <tbody>
                    <QLTuVung></QLTuVung>
                </tbody>
            </table>
        )
    }
}
export default QLListTuVung;