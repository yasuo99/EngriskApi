import React, { Component } from 'react'
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import ReactAudioPlayer from 'react-audio-player';
class ProgressWord extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="progressWord">
                            <div className="container">
                                <div className="boxProgressWord">
                                    <div className="head">
                                        Unlock your full language learning journey
                                </div>

                                    <div className="contentProgress">
                                        <h2 className="title">TỪ VỰNG CỦA BẠN</h2>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="graphOne" style={{ height: "100%" }}> </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="content">
                                                            <span>6</span>
                                                            <p>Các từ còn yếu</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="graphTwo" style={{ height: "100%" }}>
                                                            <div className="contentGraphTwo" style={{ width: "100%" }}></div></div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="content">
                                                            <span>6</span>
                                                            <p>Các từ còn yếu</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="graphThree" style={{ height: "100%" }}>
                                                            <div className="contentGraphThree" style={{ width: "100%" }}></div> </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="content">
                                                            <span>6</span>
                                                            <p>Các từ còn yếu</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contentWord">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <span>Lọc theo:</span>
                                                <select
                                                    type="select"
                                                    name="filter"
                                                    id="filter"
                                                >
                                                    <option value="communication">Tất cả từ vựng</option>
                                                    <option value="A">A</option>
                                                    <option value="B">B</option>

                                                </select>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <button className="btn btn-primary">Ôn tập ngay</button>
                                            </div>
                                        </div>
                                        <table className="table table-hover mt-5">
                                            <thead>
                                                <tr>
                                                    <th>Tiếng anh</th>
                                                    <th>Tiếng việt</th>
                                                    <th>Mức độ nắm vững từ</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="row">
                                                            <div className="box">
                                                                <img src="/image/english (1).jpg" className="img-contentWord"></img>
                                                                {/* <ReactAudioPlayer
                                                            src="my_audio_file.ogg"
                                                            autoPlay
                                                            controls
                                                            style={{width:'80px', height:'40px'}}
                                                        /> */}
                                                                <img src="/image/play.png" className="audio"></img>
                                                                <p className="content">Hello</p>
                                                            </div>
                                                        </div>

                                                    </td>
                                                    <td><p style={{ paddingTop: 10, fontSize: 16 }}>Xin chào</p></td>
                                                    <td>
                                                        <div className="box">
                                                            <img src="/image/rising.png" className="img-progress"></img>
                                                            <p className="text-progress">Chưa vững</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="boxMore">
                                                        <span className="fa fa-star mr-3"></span>
                                                        <span>
                                                            <svg width="30" height="6" viewBox="0 0 116 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 24.666C18.6274 24.666 24 19.2934 24 12.666C24 6.0386 18.6274 0.666016 12 0.666016C5.37258 0.666016 0 6.0386 0 12.666C0 19.2934 5.37258 24.666 12 24.666Z" />
                                                                <path d="M58 25C64.6274 25 70 19.6274 70 13C70 6.37258 64.6274 1 58 1C51.3726 1 46 6.37258 46 13C46 19.6274 51.3726 25 58 25Z" />
                                                                <path d="M104 25C110.627 25 116 19.6274 116 13C116 6.37258 110.627 1 104 1C97.3726 1 92 6.37258 92 13C92 19.6274 97.3726 25 104 25Z" />
                                                            </svg>
                                                        </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProgressWord;