import React, { Component } from "react";

class ModalCauHoiNghe extends Component {
    state = {
        check: "false",
      };
      handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value,
        });
      };
    render() {
        return (
            <tr>
                <td className="cauhoi-quiz">Đâu là "cà phê"?</td>
                <td>
                    <div className="card-hoc"><img src="image/rice.png" className="img-hoc" />
                          <h5 className="text-center mt-2">rice</h5>
                    </div>
                </td>
                <td>
                <div className="card-hoc"><img src="image/rice.png" className="img-hoc" />
                          <h5 className="text-center mt-2">rice</h5>
                        </div> 
                        </td>
                <td>
                <div className="card-hoc"><img src="image/rice.png" className="img-hoc" />
                          <h5 className="text-center mt-2">rice</h5>
                        </div></td>
                <td>A</td>
                <td>
                    <input type="radio" name="check" value="true" onChange={this.handleChange} id="check"></input>
                </td>
            </tr>
        );
    }
}
export default ModalCauHoiNghe;