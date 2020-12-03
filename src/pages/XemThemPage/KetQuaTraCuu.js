import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import { appendScript } from '../../config/appendScript'
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';


class KetQuaTraCuu extends Component {
    componentDidMount() {
        appendScript("/js/style.js");
    }
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="ketquatracuu">
                            <div className="container">
                                <div className="row">
                                    <div className="col-10 offset-1">
                                        <form>
                                            <div className="inner-form">
                                                <div className="input-field first-wrap">
                                                    <img src="image/english-language.png" />
                                                </div>
                                                <div className="input-field second-wrap">
                                                    <input id="search" type="text" placeholder="Nhập bằng Tiếng Anh hoặc Tiếng Việt" />
                                                </div>
                                                <div className="input-field third-wrap">
                                                    <button className="btn btn-primary" type="button">
                                                        DỊCH NGHĨA
                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-10 offset-1 mt-4">
                                        <div className="row">
                                            <div className="col-8"><h1 className="kechan"><img src="/image/english-language.png" /> Hello</h1></div>
                                            <div className="col-4 mt-4 text-right">
                                                <div className="dropdown text-left">
                                                    <button onClick={this.myFunction} className="dropbtn ">Thêm vào danh sách</button>
                                                    <div id="myDropdown" className="dropdown-content">
                                                        <input type="text" placeholder="Search.." id="myInput" onKeyUp={this.filterFunction} />
                                                        <a href="#about">About</a>
                                                        <a href="#base">Base</a>
                                                        <a href="#blog">Blog</a>
                                                        <a href="#contact">Contact</a>
                                                        <a href="#custom">Custom</a>
                                                        <a href="#support">Support</a>
                                                        <a href="#tools">Tools</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="text2 mt-2">BẢN DỊCH</h5>
                                        <h2 className="mt-3"><img src="/image/vietnamxl.png" /> xin chào</h2>
                                        <div className="row">
                                            <div className="col-8 offset-2">
                                                <h5 className="gachchan text-primary"><img src="/image/united-states.png" /> Hello, Lap</h5>
                                                <h5><img src="/image/vietnam.png" /> Xin chào, Lap</h5>
                                            </div>
                                            <div className="col-8 offset-2">
                                                <h5 className="gachchan text-primary"><img src="/image/united-states.png" /> Hello, Lap</h5>
                                                <h5><img src="/image/vietnam.png" /> Xin chào, Lap</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <Footer></Footer>
                    </div>
                </div>

            </div>

        );
    }
}
export default KetQuaTraCuu;