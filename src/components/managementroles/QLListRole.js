import React, { Component } from "react"
import { appendScript } from "../../config/appendScript";
import QLRole from "./QLRole";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'

class QLListRole extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        $(function(){
            $("#dataTable").DataTable();
        })
    }
    fetchAccounts = async () => {

    }
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