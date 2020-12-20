import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class RankingWord extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="rankingWord">
                            <div className="container">
                                <div className="row  mt-5">
                                    <div className="col-md-4">
                                        <div className="card user-card">
                                            <div className="card-block">
                                                <div className="user-image">
                                                    <img src="/image/businessman.png" className="img-radius" alt="User-Profile-Image" />
                                                </div>
                                                <h6 className="title">NguyenLap</h6>
                                                <p className="text-muted">Nguyễn Thanh Lập</p>
                                                <hr />
                                                <p className="text-muted mt-5">Đã học được: 1000 từ vựng</p>
                                                <ul className="list-unstyled activity-leval">
                                                    <li className="active" />
                                                    <li className="active" />
                                                    <li className="active" />
                                                    <li />
                                                    <li />
                                                </ul>
                                                <div className="bg-green counter-block text-center p-2">
                                                    <img src="/image/rankingl.png" />
                                                </div>
                                                <hr />
                                                <div className="row justify-content-center user-social-link">
                                                    <div className="col-auto"><a href="#!"><i className="fa fa-facebook text-facebook" /></a></div>
                                                    <div className="col-auto"><a href="#!"><i className="fa fa-twitter text-twitter" /></a></div>
                                                    <div className="col-auto"><a href="#!"><i className="fa fa-dribbble text-dribbble" /></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card user-card">
                                            <div className="card-block">
                                                <div className="user-image">
                                                    <img src="/image/businessman.png" className="img-radius" alt="User-Profile-Image" />
                                                </div>
                                                <h6 className="title">NguyenLap</h6>
                                                <p className="text-muted">Nguyễn Thanh Lập</p>
                                                <hr />
                                                <p className="text-muted mt-5">Đã học được: 1000 từ vựng</p>
                                                <ul className="list-unstyled activity-leval">
                                                    <li className="active" />
                                                    <li className="active" />
                                                    <li className="active" />
                                                    <li />
                                                    <li />
                                                </ul>
                                                <div className="bg-yellow counter-block text-center p-2">
                                                    <img src="/image/rankingl.png" />
                                                </div>
                                                <hr />
                                                <div className="row justify-content-center user-social-link">
                                                    <div className="col-auto"><a href="#"><i className="fa fa-facebook text-facebook" /></a></div>
                                                    <div className="col-auto"><a href="#"><i className="fa fa-twitter text-twitter" /></a></div>
                                                    <div className="col-auto"><a href="#"><i className="fa fa-dribbble text-dribbble" /></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card user-card">
                                            <div className="card-block">
                                                <div className="user-image">
                                                    <img src="/image/businessman.png" className="img-radius" alt="User-Profile-Image" />
                                                </div>
                                                <h6 className="title">NguyenLap</h6>
                                                <p className="text-muted">Nguyễn Thanh Lập</p>
                                                <hr />
                                                <p className="text-muted mt-5">Đã học được: 1000 từ vựng</p>
                                                <ul className="list-unstyled activity-leval">
                                                    <li className="active" />
                                                    <li className="active" />
                                                    <li className="active" />
                                                    <li />
                                                    <li />
                                                </ul>
                                                <div className="bg-blue counter-block text-center p-2">
                                                    <img src="/image/rankingl.png" />
                                                </div>
                                                <hr />
                                                <div className="row justify-content-center user-social-link">
                                                    <div className="col-auto"><a href="#"><i className="fa fa-facebook text-facebook" /></a></div>
                                                    <div className="col-auto"><a href="#"><i className="fa fa-twitter text-twitter" /></a></div>
                                                    <div className="col-auto"><a href="#"><i className="fa fa-dribbble text-dribbble" /></a></div>
                                                </div>
                                            </div>
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
export default RankingWord;