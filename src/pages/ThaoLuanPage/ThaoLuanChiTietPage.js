import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BinhLuanPost from '../../components/thaoluan/BinhLuanPost';
import ContentPost from '../../components/thaoluan/ContentPost';
import PhanHoiPost from '../../components/thaoluan/PhanHoiPost';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import postApi from '../../api/postApi';
import { connect } from 'react-redux';

class ThaoLuanChiTietPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: { comments: [] },
            comment: ""
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const { match: { match: { params } } } = this.props;
        const post = await this.fetchPostDetail(params.postId);
        console.log(post);
        if (this.isComponentMounted) {
            this.setState({
                post: post
            });
        }
    }
    fetchPostDetail = async (id) => {
        return await postApi.getDetail(id);
    }
    handleChange = event => {
        this.setState({
            comment: event.target.value
        })
        console.log(this.state);
    }
    async handleSubmit() {
        let comment = {
            comment: this.state.comment
        }
        await postApi.commentToPost(this.state.post.id, comment);
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
                                        <a href="/thao-luan">DIỄN ĐÀN</a> <i className="fa fa-angle-right" /> <a href="#">Thảo luận</a>
                                    </div>
                                </div>
                                <ContentPost post={this.state.post}></ContentPost>
                                {this.props.isLoggedIn && <div className="binhluan">
                                    <div className="row mt-5">
                                        <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src={this.props.account.photoUrl || "/image/default-user-image.png"} /></div>
                                        <div className="col-md-11">
                                            <form onSubmit={this.handleSubmit}>
                                                <textarea rows={4} cols={120} placeholder="Gửi một bình luận mới" value={this.state.comment} onChange={this.handleChange} />
                                                <button type="submit" className="btn btn-primary mr-3 mt-2">ĐĂNG</button>
                                                <button type="button" className="btn btn-primary mt-2">HỦY</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>}
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
                                                        <li className="nav-item dropdown"> <a className="nav-link " href="#" data-toggle="dropdown">SẮP XẾP THEO<i className="fa fa-chevron-down" /></a>
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
                                    <PhanHoiPost comments={this.state.post.comments}></PhanHoiPost>
                                </div>
                            </div>
                        </section>

                        <Footer></Footer>
                    </div>
                </div>

            </div>
        );
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
const mapStateToProps = (state) => {
    const { account, isLoggedIn } = state.auth;
    return {
        account: account,
        isLoggedIn: isLoggedIn
    }
}
export default connect(mapStateToProps)(ThaoLuanChiTietPage);