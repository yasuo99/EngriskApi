import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';

class TuVungPage extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="tuvung">
                            <div className="container mt-5">
                                <h2 className="pb-3">Đã học từ vựng Tiếng Anh</h2>
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Từ vựng</th>
                                            <th>Từ loại</th>
                                            <th>Lần cuối luyện tập</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Places</a></td>
                                            <td>Noun</td>
                                            <td>3 ngày trước</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </main>

                        <Footer></Footer>
                    </div>
                </div>

            </div>

        );
    }
}
export default TuVungPage;