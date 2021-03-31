import React, { Component } from "react";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import { ProgressBar } from 'react-bootstrap';
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
class FlashCardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memory: false,
            modalCreate : false,
            imageMemory : null,
            contentMemory : null,
            check : false,
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    ToToggleForm = () => {
        this.setState({
            memory: true,
        })
    }
    ToToggleMemory = () => {
        this.setState({
            check: true,
        })
    }
    openCreate = () =>{
        this.setState({
            modalCreate : true
        })
    }
    closeCreate = () => {
        this.setState({
            imageMemory : "",
            contentMemory : "",
            modalCreate: false,
        })
    }
    submitCreate = () =>{
        let formData = new FormData ();
        formData.append('file', this.state.imageMemory);
        formData.append('content',this.state.contentMemory)
        this.closeCreate();
    }
    fileChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }
    render() {
        var { memory, check } = this.state;
        return (

            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="flashcard-detail">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-3 kedoc">
                                        <Link to="/card" className="textReturn"><i className="fa fa-chevron-left"></i> Trở về</Link>
                                        <h4 className="title">Thẻ ghi nhớ</h4>
                                        <ProgressBar className="mt-5 mb-2" variant="success" />
                                        <div className="row">
                                            <div className="col-6 textProgress">TIẾN ĐỘ</div>
                                            <div className="col-6 textPoint">0/20</div>
                                        </div>
                                        <button className="btn btn-training"><img src="/image/training.png"></img> Luyện tập</button>
                                        <button className="btn btn-test"><img src="/image/test1.png"></img> Test toeic</button>
                                        <button className="btn btn-mix"><img src="/image/rgb.png"></img> Trộn thẻ</button>
                                        <button className="btn btn-add"><img src="/image/plus2.png"></img> Thêm từ vựng</button>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-10">
                                                <div className="boxContent">
                                                    <img src="/image/sound.png" className="sound"></img>
                                                    <h1 className="word">Abide by</h1>
                                                    <p className="synonym">(v) to comply with, to conform ( Tuân
theo )</p>
                                                    <p className="typeWord">v</p>

                                                    {memory === true ? (
                                                        <div>
                                                            <div className="container">
                                                                <div id="owl-carousel" className="carousel slide" data-ride="carousel">
                                                                    {check === true ? (
                                                                         <div className="row">
                                                                         <div className="col">
                                                                             <div className="cardMemory">
                                                                                <img src="/image/english (1).jpg" alt="imageMemory" className="imageMemory"></img>
                                                                                <p className="contentMemory">To cooperate with that company, he had to abide by the contract's conditions.</p>
                                                                             </div>
                                                                         </div>
                                                                     </div>
                                                                    ):
                                                                    (
                                                                        <div className="carousel-inner">
                                                                        <div className="carousel-item active">
                                                                            <div className="row">
                                                                                <div className="col">
                                                                                    <div className="boxMemory">
                                                                                        <i className="fa fa-plus" onClick={e=> this.openCreate(e)}></i>
                                                                                        <p className="content">Thêm mem mới</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>  
                                                                        </div>
                                                                        <div className="carousel-item" onChange={this.handleChange} onClick={this.ToToggleMemory} id="check">
                                                                            <div className="row">
                                                                                <div className="col">
                                                                                    <div className="cardMemory">
                                                                                       <img src="/image/english (1).jpg" alt="imageMemory" className="imageMemory"></img>
                                                                                       <p className="contentMemory">To cooperate with that company, he had to abide by the contract's conditions.</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <a className="carousel-control-prev" href="#owl-carousel" data-slide="prev"> <span className="fa fa-chevron-left" aria-hidden="true"></span></a> <a className="carousel-control-next" href="#owl-carousel" data-slide="next"> <span className="fa fa-chevron-right" aria-hidden="true"></span></a>
                                                                    </div>
                                                                  
                                                                    )}
                                                                     <Modal show={this.state.modalCreate} onHide={this.closeCreate}>
                                                                        <Modal.Header closeButton onClick={()=> this.closeCreate()}>
                                                                            <Modal.Title>
                                                                                <p className="title">Tạo mem cho:</p>
                                                                                <h5 className="mt-2">Abide by : (v) to comply with, to conform ( Tuân theo )</h5>
                                                                            </Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                            <div className="form-group">
                                                                            
                                                                                <div className="card-input">
                                                                                    <input type="file" name="file" accept="image/png, image/jpeg" onChange={e => this.fileChange(e)} />
                                                                                </div>
                                                                                <div className="card-input mt-2">
                                                                                   <textarea
                                                                                   placeholder="Something memorable..."
                                                                                   type="text"
                                                                                   value={this.state.contentMemory}
                                                                                   name="contentMemory"
                                                                                   onChange={e => this.handleChange(e)}></textarea>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                            <Button variant="secondary" onClick={() => this.closeCreate()}>Hủy</Button>
                                                                            <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                                                                        </Modal.Footer>
                                                                    </Modal>
                                                                      
                                                                </div>

                                                            </div>

                                                        </div>
                                                    ) :
                                                        (
                                                            <button className="btn btn-memory"
                                                                id="memory"
                                                                onChange={this.handleChange}
                                                                onClick={this.ToToggleForm}>Giúp tôi ghi nhớ từ này</button>
                                                        )}
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <button className="btn btn-next">
                                                    <i className="fa fa-chevron-right"></i>
                                                    <h5>Tiếp</h5>
                                                </button>
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
}
export default FlashCardDetail;