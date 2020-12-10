import React, { Component } from "react"
import QLQuiz from "./QLQuiz"

class QLListQuiz extends Component {
    render() {
        return (
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Quiz</th>
                        <th>Câu hỏi</th>
                        <th className="chucnang"></th>
                    </tr>
                </thead>
                <tbody>
                    <QLQuiz></QLQuiz>
                </tbody>
            </table>
        )
    }
}
export default QLListQuiz;