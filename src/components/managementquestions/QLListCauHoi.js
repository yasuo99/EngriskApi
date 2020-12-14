import React, { Component } from "react"
import QLCauHoi from "./QLCauHoi";

class QLListCauHoi extends Component {
    render() {
        return (
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr>
                        <th >Câu hỏi</th>
                        <th className="cautraA">A</th>
                        <th className="cautraB">B</th>
                        <th className="cautraC">C</th>
                        <th className="cautraD">D</th>
                        <th className="dapAn">Đáp án câu hỏi</th>
                        <th className="chucnang"/>
                    </tr>
                </thead>
                <tbody>
                    <QLCauHoi></QLCauHoi>
                </tbody>
            </table>
        )
    }
}
export default QLListCauHoi;