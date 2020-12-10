import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class KetQuaExam extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="ketquaexam">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6 offset-3">
                                        <h2 className="text-center mt-3 mb-4">KẾT QUẢ BÀI THI</h2>
                                    </div>
                                    <div className="ketquacauhoi">
                                        <div className="cauhoi">
                                            If you could please get back to me with your_______before the end of the day today, I will make
                                            sure
                                            that your order is processed in time for delivery by the end of the week.
              </div>
                                        <div className="dapan">
                                            <ol type="A" className="ml-4">
                                                <li>prefer</li>
                                                <li>preferred</li>
                                                <li>preferred</li>
                                                <li>preference</li>
                                            </ol>
                                        </div>
                                        <div className="ketqua">
                                            <div className="dropdown">
                                                <button type="button" className="btn btn-primary " data-toggle="collapse" data-target="#ketqua">Đáp án và giải
                    thích</button>
                                                <p className="collapse" id="ketqua">Sau tính từ sở hữu YOUR ta cần một danh từ, nên ta chọn ngay D.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ketquacauhoi">
                                        <div className="cauhoi">
                                            If you could please get back to me with your_______before the end of the day today, I will make
                                            sure
                                            that your order is processed in time for delivery by the end of the week.
              </div>
                                        <div className="dapan">
                                            <ol type="A" className="ml-4"> 
                                                <li>prefer</li>
                                                <li>preferred</li>
                                                <li>preferred</li>
                                                <li>preference</li>
                                            </ol>
                                        </div>
                                        <div className="ketqua">
                                            <button type="button" className="btn btn-primary " data-toggle="collapse" data-target="#ketqua1">Đáp án và giải
                  thích</button>
                                            <p className="collapse " id="ketqua1">Sau tính từ sở hữu YOUR ta cần một danh từ, nên ta chọn ngay D.</p>
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
export default KetQuaExam;