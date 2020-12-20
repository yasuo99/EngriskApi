import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class RankingExam extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="rankingExam">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="panel">
                                            <div className="panel-heading">
                                                <div className="row">
                                                    <h4 className="title">BẢNG XẾP HẠNG</h4>
                                                </div>
                                            </div>
                                            <table className="table table-hover table-bordered table-striped">
                                                <thead>
                                                    <tr className="active text-center">
                                                        <th>#</th>
                                                        <th className="taikhoan">Tên tài khoản</th>
                                                        <th>Bài exam</th>
                                                        <th>Số điểm đạt được</th>
                                                        <th>Thời gian hoàn thành</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-center">
                                                    <tr className="table-warning">
                                                        <td><img src="/image/ranking.png" /></td>
                                                        <td><span><img src="/image/teamwork.png" />NguyenLap</span></td>
                                                        <td>Test 1</td>
                                                        <td><span className="label label-success">95/100</span></td>
                                                        <td>45 phút</td>
                                                    </tr>
                                                    <tr className="table-success">
                                                        <td><img src="/image/silver-medal.png" /></td>
                                                        <td><span><img src="/image/teamwork.png" />NguyenLap</span></td>
                                                        <td>Test 1</td>
                                                        <td><span className="label label-success">95/100</span></td>
                                                        <td>45 phút</td>
                                                    </tr>
                                                    <tr className="table-info">
                                                        <td><img src="/image/bronze-medal.png" /></td>
                                                        <td><span><img src="/image/teamwork.png" />NguyenLap</span></td>
                                                        <td>Test 1</td>
                                                        <td><span className="label label-success">95/100</span></td>
                                                        <td>45 phút</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td><span><img src="/image/teamwork.png" />NguyenLap</span></td>
                                                        <td>Test 1</td>
                                                        <td><span className="label label-success">95/100</span></td>
                                                        <td>45 phút</td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td><span><img src="/image/teamwork.png" />NguyenLap</span></td>
                                                        <td>Test 1</td>
                                                        <td><span className="label label-success">95/100</span></td>
                                                        <td>45 phút</td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td><span><img src="/image/teamwork.png" />NguyenLap</span></td>
                                                        <td>Test 1</td>
                                                        <td><span className="label label-success">95/100</span></td>
                                                        <td>45 phút</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
export default RankingExam;