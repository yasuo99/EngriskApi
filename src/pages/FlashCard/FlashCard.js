import React, { Component } from "react";
import wordCategoryApi from "../../api/2.0/wordCategoryApi";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
class FlashCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        var wordCategories = await this.fetchWordCategories();
        console.log(wordCategories.items);
        if (this.isComponentMounted) {

            this.setState({
                listCategory: wordCategories.items
            })
        }
    }
    fetchWordCategories = async () => {
        return await wordCategoryApi.getAll();
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    inform = (length) => {
        if(length == 0){toast('Chủ đề này hiện chưa có từ vựng', {type:'info'})}
    }
    render() {
        const renderCategories = this.state.listCategory.map((category) =>
            <Link key={category.id} data-id={category.id} to={category.words.length > 0 ? "/card-detail/" + category.id : "#"} onClick={() => this.inform(category.words.length)}>
                <div className="boxItem">
                    <img src="/image/family.jpg" alt="giaotiep"></img>
                    <div className="contentItem">
                        <h3 className="title">{category.categoryName}</h3>
                        <h5 className="title">Số từ {category.words.length}</h5>
                        <Link className="btn post" to={category.words.length > 0 ? "/card-detail/" + category.id : "#"}>Học ngay</Link>
                    </div>
                </div>
            </Link>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="flashcard">
                            <div className="container">
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
                                    <Carousel swipeable='true' centerMode={false} centerSlidePercentage={32} infiniteLoop={false}  onClickItem={(index,item) => console.log(item)} showThumbs={false} >
                                        {renderCategories}
                                    </Carousel>

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
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default FlashCard;