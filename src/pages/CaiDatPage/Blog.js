import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Search from '../../components/xemthem/Search';
import Footer from '../Footer/Footer';

class Blog extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <div>
                            <div className="started-bg">
                                <div className="slide" />
                            </div>
                            <div className="container">
                                <section className="started">
                                    <div className="st-box">
                                        <div className="st-image"><img src="/image/businessman.png" alt="#" /></div>
                                        <div className="st-title">Thanh Lập</div>
                                        <div className="st-subtitle">UX/UI Designer &amp; Front-end Developer</div>
                                        <div className="st-soc">
                                            <a target="blank" href="#" className="btn_animated">
                                                <span className="circle"><i className="fa fa-facebook" /></span>
                                            </a>
                                            <a target="blank" href="#" className="btn_animated">
                                                <span className="circle"><i className="fa fa-instagram" /></span>
                                            </a>
                                            <a target="blank" href="#" className="btn_animated">
                                                <span className="circle"><i className="fa fa-twitter" /></span>
                                            </a>
                                            <a href="#" className="btn_animated">
                                                <span className="circle"><i className="fa fa-skype" /></span>
                                            </a>
                                        </div>
                                    </div>
                                </section>
                                <section id="about">
                                    <div className="col-10 offset-1">
                                    <div className="content-box">
                                        <div className="row">
                                            <div className="col-5">
                                                <div className="info-list">
                                                    <ul>
                                                        <li><strong><span>Tên tài khoản:</span></strong> NguyenLap</li>
                                                        <li><strong><span>Level:</span></strong> 1</li>
                                                        <li><strong><span>Họ và tên:</span></strong> Nguyễn Thanh Lập</li>
                                                       
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-7">
                                                <div className="info-list">
                                                    <li><strong><span>Địa chỉ:</span></strong> 38/2 Tây Hòa Phường Phước Long A Quận 9 TP.HCM</li>
                                                    <li><strong><span>Phone:</span></strong> <a href="tel:12562548456">03.3939.2502</a></li>
                                                    <li><strong><span>E-mail:</span></strong> <a href="mailto:smorgan@domain.com">lap331351@gmail.com</a></li>
                                                </div>
                                               
                                            </div>
                                            <div className="bts">
                                                    <button type="button" className="btn btn-primary">THEO DÕI</button>
                                                </div>
                                        </div>
                                    </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default Blog;