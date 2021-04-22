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
import { Button } from 'react-bootstrap';
import { Formik, Field, Form } from "formik";

const post = {
    contentPost: '',
    fileImage: '',
    fileContent: '',
}
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
                            <div className="container">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="row mt-4">
                                            <div className="col-8 mb-3">
                                                <h3>Diễn Đàn Ngôn Ngữ</h3>
                                            </div>
                                            {this.props.isVerified && <div className="col-4 text-right">
                                                <Link className="btn btn-primary" to="/thao-luan/them-bai-viet">ĐĂNG BÀI MỚI</Link>
                                            </div>}
                                        </div>
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#tabone"><i className="fa fa-book" /> ĐANG ĐƯỢC YÊU THÍCH</a> </li>
                                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwo"><i className="fa fa-star" /> MỚI </a> </li>
                                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthree"><i className="fa fa-bolt" /> ĐÃ THEO DÕI</a> </li>
                                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabfour"><i className="fa fa-share-alt" /> CHIA SẺ</a> </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane fade show active" id="tabone" role="tabpanel">
                                                {this.isComponentMounted && renderHighRatePost}
                                            </div>

                                            <div className="tab-pane fade" id="tabtwo" role="tabpanel">
                                                {this.isComponentMounted && renderNewPost}
                                            </div>
                                            <div className="tab-pane fade" id="tabthree" role="tabpanel">

                                            </div>
                                            <div className="tab-pane fade" id="tabfour" role="tabpanel">
                                                <img src="/image/user2.png" className="img-user"></img>
                                                <p className="username">Nguyễn Lập</p>
                                                <Formik
                                                    initialValues={post}
                                                    onSubmit={async (values, { resetForm }) => {
                                                        await new Promise((r) => setTimeout(r, 500));
                                                        alert(JSON.stringify(values, null, 2));
                                                        resetForm({})
                                                    }}
                                                >
                                                    {({ }) => (
                                                        <div>
                                                            <Form className="content" >
                                                                {/* <div className="fileMemory">
                                                                <label htmlFor="fileMemory">Chọn file ảnh
                                                            <Field
                                                                        type="file"
                                                                        id="fileMemory"
                                                                        name="fileMemory" />
                                                                </label>
                                                            </div>
                                                            <div className="contentMemory">
                                                                <Field
                                                                    className="contentMemory"
                                                                    placeholder="Nhập nội dung thẻ nhớ"
                                                                    type="text"
                                                                    id="contentMemory"
                                                                    name="contentMemory"
                                                                    component="textarea"
                                                                    defaultValue={""} />
                                                            </div>

                                                            <div className="row function">
                                                                <button className="createMemory" type="submit" >TẠO THẺ</button>
                                                            </div> */}
                                                                <div className="contentPost">
                                                                    <Field
                                                                        className="contentPost"
                                                                        placeholder="Bạn muốn chia sẻ điều gì thế?"
                                                                        type="text"
                                                                        id="contentPost"
                                                                        name="contentPost"
                                                                        component="textarea"
                                                                        defaultValue={""} />
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-8 offset-2 ">
                                                                        <div className="function">
                                                                            <p className="title">Thêm vào bài viết</p>
                                                                            <img src="/image/pictures.png" className="f-image"></img>
                                                                            <img src="/image/file-storage.png" className="f-file"></img>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-8 offset-2">
                                                                        <button className="save" type="submit" >Đăng</button>
                                                                    </div>

                                                                </div>
                                                            </Form>
                                                        </div>
                                                    )}
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 mt-4">
                                        <div className="search">
                                            <input type="text" className="searchFollowingPost" placeholder="Tìm kiếm" />
                                            <button type="submit" className="searchButton">
                                                <i className="fa fa-search" />
                                            </button>
                                        </div>
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
    const { id, isVerified } = state.auth.account;
    const { isLoggedIn } = state.auth;
    return {
        id: id,
        isVerified: isVerified,
        isLoggedIn: isLoggedIn
    }
}
export default connect(mapStateToProps)(ThaoLuanPage);


