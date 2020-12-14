import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BinhLuanPost from '../../components/thaoluan/BinhLuanPost';
import ContentPost from '../../components/thaoluan/ContentPost';
import PhanHoiPost from '../../components/thaoluan/PhanHoiPost';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import postApi from '../../api/postApi';

class ThaoLuanChiTietPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            post:{}
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const {match : {match : {params}}} = this.props;
        const post = await this.fetchPostDetail(params.postId);
        if(this.isComponentMounted){
            this.setState({
                post: post
            });
        }
    }
    fetchPostDetail = async (id) =>{
        return await postApi.getDetail(id);
    }
    render() {
        return (
            <div id="wrapper">
            <SubMenuClient></SubMenuClient>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <HeaderClient></HeaderClient>
                    <section id="chitietthaoluan">
                    <div className="container pt-3">
                        <div className="row kechan">
                            <div className="col-6 diendan mt-5 mb-5">
                                <a href="#">DIỄN ĐÀN</a> <i className="fa fa-angle-right" /> <a href="#">Thảo luận</a>
                            </div>
                        </div>
                        <ContentPost></ContentPost>
                        <BinhLuanPost></BinhLuanPost>
                        <div className="row mt-5 kechan">
                            <div className="col-6">
                                <h3>BÌNH LUẬN</h3>
                            </div>
                            <div className="col-6 sapxep">
                                <div className="navbar navbar-expand-lg navbar-light">
                                    <div className="container">
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu-sapxep"> </button>
                                        <div className="collapse navbar-collapse" id="menu-sapxep">
                                            <ul>
                                                <li className="nav-item dropdown"> <a className="nav-link " href="#" data-toggle="dropdown">SẮP XẾP THEO BÀI ĐĂNG <i className="fa fa-chevron-down" /></a>
                                                    <div className="dropdown-menu sub-sapxep"> <a className="dropdown-item" href="#">Top bài
                                  đăng</a> <a className="dropdown-item" href="#">Mới nhất</a> <a className="dropdown-item" href="#">Cũ nhất</a></div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="phanhoi-binhluan">
                           <PhanHoiPost></PhanHoiPost>
                        </div>
                    </div>
                </section>

                    <Footer></Footer>
                </div>
            </div>          
            
           </div>
        );
    }
    componentWillUnmount(){
        this.isComponentMounted = false;
    }
}
export default ThaoLuanChiTietPage;