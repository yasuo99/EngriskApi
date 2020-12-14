import React, { Component } from "react"
import QLRole from "./QLRole";


class QLListRole extends Component {
    render() {
        return (
            <div>

                <table className="table table-bordered mt-2" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th >Tài khoản</th>
                            <th className="chucnang-role">User</th>
                            <th className="chucnang-role">Admin</th>
                            <th className="chucnang-role">Quản trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        <QLRole></QLRole>
                        <QLRole></QLRole>
                        <QLRole></QLRole>
                        <QLRole></QLRole>
                        <QLRole></QLRole>
                        <QLRole></QLRole>
                        <QLRole></QLRole>
                        <QLRole></QLRole>
                        <QLRole></QLRole>

                    </tbody>
                </table>
            </div>
        )
    }
}
export default QLListRole;