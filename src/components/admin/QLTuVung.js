import React, { Component } from "react"

class QLTuVung extends Component {
    render() {
        // var { word } = this.props;
        return (
            <tr>
                <td>Fish</td>
                <td>Con cá</td>
                <td>Danh từ</td>
                <td><img src="../image/fish.png"></img></td>
                <td>I like eat fish <br/> Tôi thích ăn cá</td>
                <td>
                    <a href="#" className="btn btn-success mr-2"><i className="fa fa-info" /></a>
                    <a href="#" className="btn btn-primary mr-2" ><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
                </td>
            </tr>
        );
    }
}
export default QLTuVung;