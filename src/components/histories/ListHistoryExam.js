import React, { Component } from "react"
import HistoryExam from "./HistoryExam"

class ListHistoryExam extends Component {
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Bài exam</th>
                        <th>Tài khoản</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Tổng thời gian làm bài</th>
                        <th>Số điểm đạt được</th>
                    </tr>
                </thead>
                <tbody>
                    <HistoryExam></HistoryExam>
                    <HistoryExam></HistoryExam>
                    <HistoryExam></HistoryExam>
                    <HistoryExam></HistoryExam>
                </tbody>
            </table>
        )
    }
}
export default ListHistoryExam;