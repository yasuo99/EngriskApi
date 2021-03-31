import React, {Component} from "react";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";

class FlashCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            listword : "",
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render(){
        return(
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="flashcard">
                            <div className="boxList">
                                <select 
                                    id="listword"
                                    onChange={this.handleChange}>
                                    <option >Danh sách từ vựng</option>
                                    <option >Giao Tiếp 1</option>
                                </select>
                            </div>
                            <div className="boxCommunicate">
                                <h5>CHỦ ĐỀ GIAO TIẾP HẰNG NGÀY</h5>
                                <div className="container">
                                    <div id="owl-carousel" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a className="carousel-control-prev" href="#owl-carousel" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true"></span></a> <a className="carousel-control-next" href="#owl-carousel" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span></a>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <div className="gachchan"></div>
                            </div>
                            <div className="boxToeic">
                                <h5>CHỦ ĐỀ LUYỆN THI TOEIC</h5>
                                <div className="container">
                                    <div id="owl-carousel-toeic" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3">
                                                        <div className="boxItem">
                                                            <img src="/image/family.jpg" alt="giaotiep"></img>
                                                            <div className="contentItem">
                                                                <h3 className="title">Gia đình</h3>
                                                                <span className="btn post">Học ngay</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a className="carousel-control-prev" href="#owl-carousel-toeic" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true"></span></a> <a className="carousel-control-next" href="#owl-carousel-toeic" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span></a>
                                        </div>
                                        
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
export default FlashCard;