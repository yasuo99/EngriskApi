import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Search from '../../components/xemthem/Search';
import Footer from '../Footer/Footer';
import queryString from 'querystring';
import accountApi from '../../api/accountApi';
class Blog extends Component {
    constructor(props) {
        super(props);
        this.isComponentMounted = false;
        this.state = {
            account: {}
        }
    }
    async componentDidMount() {
        const { location: { location: { search } } } = this.props;
        var temp = queryString.parse(search.replace('?', ''));
        console.log(temp);
        this.isComponentMounted = true;
        try {
            const account = await this.fetchAccountBlog(temp.id);
            if (this.isComponentMounted) {
                this.setState({
                    account: account
                })
            }
        } catch (error) {
            if (error.response.status === 404) {
                window.location = '/loi';
            }
        }
    }
    fetchAccountBlog = async (id) => {
        return accountApi.getDetail(id);
    }
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
                                        <div className="st-image"><img src={this.state.account.photoUrl || "/image/businessman.png"} alt="#" /></div>
                                        <div className="st-title">{this.state.account.username}</div>
                                        <div className="st-subtitle">{this.state.account.fullname}</div>
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
                                                <div className="offset-md-4 col-7">
                                                    <div className="info-list">
                                                        <p><strong><span>Tuổi:</span></strong> {this.state.account.age}</p>
                                                        <p><strong><span>Địa chỉ:</span></strong> {this.state.account.address}</p>
                                                        <p><strong><span>Phone:</span></strong> <a href={"tel:" + this.state.account.phoneNumber}>{this.state.account.phoneNumber}</a></p>
                                                        <p><strong><span>E-mail:</span></strong> <a href={"mailto:" + this.state.account.email}>{this.state.account.email}</a></p>
                                                    </div>

                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="offset-1 col-3"><p>Số từ vựng đã học: {this.state.account.wordLearned}</p></div>
                                                <div className="offset-1 col-3"><p>Số quiz đã làm: {this.state.account.quizDone}</p></div>
                                                <div className="offset-1 col-3"><p>Số exam đã làm: {this.state.account.examDone}</p></div>
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
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default Blog;