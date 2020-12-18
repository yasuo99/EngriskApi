import React, { Component } from "react"
import HistoryExam from "./HistoryExam"
import Moment from 'moment';
class ListHistoryExam extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const renderHistory = this.props.histories.map((history) =>
            <tr key={history.id}>
                <td>{history.examTitle}</td>
                <td>{Moment(history.start_At).format("MMMM Do YYYY")}</td>
                <td>{Moment(history.end_At).format("MMMM Do YYYY")}</td>
                <td>{history.totalTime} giây</td>
                <td>{history.score}</td>
            </tr>
        );
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Bài exam</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Tổng thời gian làm bài</th>
                        <th>Số điểm đạt được</th>
                    </tr>
                </thead>
                <tbody>
                   {renderHistory}
                </tbody>
            </table>
        )
    }
}
export default ListHistoryExam;