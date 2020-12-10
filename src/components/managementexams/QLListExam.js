import React, { Component } from "react"
import QLExam from "./QLExam"

class QLListExam extends Component {
    render() {
        return (
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr>
                        <th >Exam</th>
                        <th >Câu hỏi</th>
                        <th className="chucnang"/>
                    </tr>
                </thead>
                <tbody>
                    <QLExam></QLExam>
                </tbody>
            </table>
        )
    }
}
export default QLListExam;