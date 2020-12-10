import React, { Component } from "react";
import { Link } from "react-browser-router"

class QLNapTien extends Component {
    render() {
        return (
            <tr>
                <td>lap@gmail.com</td>
                <td>100.000VNĐ</td>
                <td>12-09-2020</td>
                <td>paypal</td>             
                <td>
                    <a href="#" className="btn btn-primary mr-2" ><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
                </td>
            </tr>
        );
    }
}
export default QLNapTien;