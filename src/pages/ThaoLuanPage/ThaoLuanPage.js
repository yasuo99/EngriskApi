import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListPost from '../../components/thaoluan/ListPost'
import Post from '../../components/thaoluan/Post';
import DangTheoDoi from '../../components/thaoluan/DangTheoDoi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import postApi from '../../api/postApi';
import Paypal from '../../components/paypal/Paypal';
import { connect } from 'react-redux';
class ThaoLuanPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPosts: [],
            newPosts: [],
            highRatePosts: [],
            followingPosts: []
        };
        this.isComponentMounted = false;
    }
    componentDidMount = async () => {
        this.isComponentMounted = true;
        var posts = await this.fetchAllPosts();
        var newPosts = await this.fetchNewPosts();
        if (this.isComponentMounted) {
            if (this.props.isLoggedIn) {
                var followingPosts = await this.fetchFollowingPosts();
                this.setState({
                    followingPosts: followingPosts
                });
            }
            this.setState({
                allPosts: posts,
                newPosts: newPosts,
            });
        }
    }
    fetchAllPosts = async () => {
        return await postApi.getAll();
    }
    fetchNewPosts = async () => {
        return await postApi.getNewPost();

    }
    fetchRatingPosts = async () => {
        var highRatePosts = await postApi.getHighRate();
        this.setState({
            highRatePosts: highRatePosts
        })
    }
    fetchFollowingPosts = async () => {
        var token = localStorage.getItem('token');
        var followingPosts = await postApi.getFollowing(this.props.id, token);
        return followingPosts;
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
    render() {
        const renderHighRatePost = this.state.allPosts.map((post) =>
            <Post key={post.id} post={post} />
        )
        const renderNewPost = this.state.newPosts.map((post) =>
            <Post key={post.id} post={post} />
        )
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="thaoluan">
                            <div className="container pt-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="row mt-5">
                                            <div className="col-8">
                                                <h3>Diễn Đàn Ngôn Ngữ</h3>
                                            </div>
                                            <div className="col-4 text-right">
                                                <Link className="btn btn-primary" to="/thao-luan/them-bai-viet">ĐĂNG BÀI MỚI</Link>
                                            </div>
                                        </div>
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#tabone"><i className="fa fa-book" /> ĐANG ĐƯỢC YÊU THÍCH</a> </li>
                                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwo"><i className="fa fa-star" /> MỚI </a> </li>
                                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthree"><i className="fa fa-bolt" /> ĐÃ THEO DÕI</a> </li>
                                        </ul>
                                        <div className="tab-content mt-3">
                                            <div className="tab-pane fade show active" id="tabone" role="tabpanel">
                                                {this.isComponentMounted && renderHighRatePost}
                                            </div>

                                            <div className="tab-pane fade" id="tabtwo" role="tabpanel">
                                                {this.isComponentMounted && renderNewPost}
                                            </div>
                                            <div className="tab-pane fade" id="tabthree" role="tabpanel">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 mt-5">
                                        <input className="form-control" type="text" placeholder="Tìm kiếm" aria-label="Search" />
                                        <DangTheoDoi posts={this.state.followingPosts}></DangTheoDoi>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Footer></Footer>
                    </div>
                </div>

            </div>
        );

    }
}
const mapStateToProps = (state) => {
    const { id } = state.auth.account;
    const { isLoggedIn } = state.auth;
    return {
        id: id,
        isLoggedIn: isLoggedIn
    }
}
export default connect(mapStateToProps)(ThaoLuanPage);


