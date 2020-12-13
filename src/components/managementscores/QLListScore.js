import React, { Component } from "react"
import QLScore from "./QLScore";


class QLListScore extends Component {
    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#tabone"><i className="fa fa-book" /> Điểm quy đổi phần đọc</a> </li>
                    <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwo"><i className="fa fa-star" /> Điểm quy đổi phần nghe </a> </li>
                </ul>
                <div className="tab-content mt-3">
                    <div className="tab-pane fade show active" id="tabone" role="tabpanel">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th >Số câu đúng</th>
                                    <th >Điểm</th>
                                    <th className="chucnang" />
                                </tr>
                            </thead>
                            <tbody>
                                <QLScore></QLScore>
                            </tbody>
                        </table>

                    </div>

                    <div className="tab-pane fade" id="tabtwo" role="tabpanel">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th >Số câu đúng</th>
                                    <th >Điểm</th>
                                    <th className="chucnang" />
                                </tr>
                            </thead>
                            <tbody>
                                <QLScore></QLScore>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}
export default QLListScore;