import React, { Component } from 'react'
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import { ProgressBar } from 'react-bootstrap';
class Home extends Component {

    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="home">
                            <div className="container">
                                <div className="col-md-10 offset-1">
                                    <div className="boxLesson">
                                        <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                            <div className="row">
                                                <div className="headerLesson">
                                                    <div className="col-md-1">
                                                        <div className="iconLesson">
                                                            <img src="./image/welcome.jpg" alt="Lesson" width="60" height="60"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="contentLesson">
                                                            <h2 className="title">Lesson 1: I'm Lap</h2>
                                                            <p className="description">Saying your name</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="progressLesson">
                                                            <ProgressBar now={20}></ProgressBar>
                                                            <span className="textProgress">0%</span>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="collapse" id="collapseExample">
                                                    <div className="cardCollapse">
                                                        <div className="col-md-8 offset-1 contentCollapse">
                                                            <p>You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder.</p>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </a>

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
export default Home;