import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import ListPost from '../../components/thaoluan/ListPost'
import Post from '../../components/thaoluan/Post';
import DangTheoDoi from '../../components/thaoluan/DangTheoDoi';

class ThaoLuanPage extends Component {
    render() {
        return (
            <div>
               <Header></Header>
                <section id="thaoluan">
                    <div className="container pt-3">
                        <div className="row">
                            <div className="col-8">
                                <div className="row mt-5">
                                    <div className="col-8">
                                        <h3>Diễn Đàn Ngôn Ngữ Duolingo</h3>
                                    </div>
                                    <div className="col-4 text-right">
                                        <h3 className="btn btn-primary">ĐĂNG BÀI MỚI</h3>
                                    </div>
                                </div>
                                <ul className="nav nav-tabs">
                                    <li className="nav-item"> <a href className="active nav-link" data-toggle="pill" data-target="#tabone"><i className="fa fa-book" /> ĐANG ĐƯỢC ƯU THÍCH</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href data-toggle="pill" data-target="#tabtwo"><i className="fa fa-star" /> MỚI </a> </li>
                                    <li className="nav-item"> <a href className="nav-link" data-toggle="pill" data-target="#tabthree"><i className="fa fa-bolt" /> ĐÃ THEO DÕI</a> </li>
                                </ul>
                                <div className="tab-content mt-3">
                                    <div className="tab-pane fade show active" id="tabone" role="tabpanel">
                                        <Post></Post>
                                    </div>
                                       
                                    <div className="tab-pane fade" id="tabtwo" role="tabpanel">
                                    <Post></Post>
                                    </div>
                                    <div className="tab-pane fade" id="tabthree" role="tabpanel">
                                    <Post></Post>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-5">
                                <input className="form-control" type="text" placeholder="Tìm kiếm" aria-label="Search" />
                                <DangTheoDoi></DangTheoDoi>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );

    }
    // showWords = (posts)=>{
    //     var result = null;
    //     if( posts.length > 0 ){
    //         result = posts.map((post, index) => {
    //             return(
    //                <Post
    //                     key = {index}
    //                     post = {post}
    //                     index = {index}
                   
    //                />
    //             )
    //         })
    //     }
    //     return result;
    // }

}
export default ThaoLuanPage;


