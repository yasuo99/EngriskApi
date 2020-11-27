import React, { Component } from "react";
import Footer2 from "../Footer/Footer2";
import Header from "../Header/Header";

class NapTienPage extends Component {
    state = {
        sotien: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };
    render() {
        return (
            <div>
                <Header></Header>
                <main id="thanhtoan">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-8 offset-2 ">
                                <h5 className="mr-3 mt-2">Số tiền nạp</h5>
                                <input type="text" placeholder="Tối thiểu 1$ tối đa $100" 
                                  id="sotien"
                                  onChange={this.handleChange}
                                />
                                <div className="dropdown">
                                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Hình thức thanh toán
                </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">Thẻ tín dụng</a>
                                        <a className="dropdown-item" href="#">Thẻ tín dụng</a>
                                        <a className="dropdown-item" href="#">Thẻ tín dụng</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nd mt-5" />
                    </div>
                </main>
                <Footer2></Footer2>
            </div>
        )
    }
}
export default NapTienPage;