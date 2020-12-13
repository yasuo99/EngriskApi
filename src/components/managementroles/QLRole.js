import React, { Component } from "react";
import { Link } from "react-browser-router"
class QLRole extends Component {
    
    render() {
        return (
            <tr>
                <td>NguyenLap</td>
                <td><input type="radio" name="role" value="user" onChange={this.handleChange} id="user"></input></td>
                <td><input type="radio" name="role" value="admin" onChange={this.handleChange} id="admin"></input></td>
                <td><input type="radio" name="role" value="quantri" onChange={this.handleChange} id="quantri"></input></td>
            </tr>
        );
    }
}
export default QLRole;