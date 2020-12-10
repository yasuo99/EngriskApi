import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';


class KetQuaTraCuu extends Component {
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
                                                <div className="dropdown">
                                                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Thêm vào danh sách
                </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <a className="dropdown-item" href="#">Từ vựng học tập</a>
                                                        <a className="dropdown-item" href="#">Từ vựng vui chơi</a>
                                                        <a className="dropdown-item" href="#">Từ vựng gia đinh</a>
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