import React, { Component } from 'react'
import Header from '../Header/Header';
import $ from "jquery";
    
   
class FlashCardPage extends Component {
    componentDidMount() {
        $(".flippable").on('click',function(){
            $(this).toggleClass("flipme")
          });
      }

    render() {
        return (
            <div>
                <Header></Header>
                <main id="flashcard">
                    <div className="container pt-5">
                        <div className="row">
                            <div className="col-3 bg-xam">
                            <ol type="1">
                                    <li><a href="#">abide by</a></li>
                                    <li><a href="#">agreement</a></li>
                                    <li><a href="#">assurance</a></li>
                                    <li><a href="#">cancellation</a></li>
                                    <li><a href="#">determine</a></li>
                                    <li><a href="#">engage</a></li>
                                    <li><a href="#">establish</a></li>
                                    <li><a href="#">abide by</a></li>
                                    <li><a href="#">agreement</a></li>
                                    <li><a href="#">assurance</a></li>
                                    <li><a href="#">cancellation</a></li>
                                    <li><a href="#">determine</a></li>
                                    <li><a href="#">engage</a></li>
                                    <li><a href="#">establish</a></li>
                                    <li><a href="#">abide by</a></li>
                                    <li><a href="#">agreement</a></li>
                                    <li><a href="#">assurance</a></li>
                                    <li><a href="#">cancellation</a></li>
                                    <li><a href="#">determine</a></li>
                                    <li><a href="#">engage</a></li>
                                    <li><a href="#">establish</a></li>
                                    <li><a href="#">abide by</a></li>
                                    <li><a href="#">agreement</a></li>
                                    <li><a href="#">assurance</a></li>
                                    <li><a href="#">cancellation</a></li>
                                    <li><a href="#">determine</a></li>
                                    <li><a href="#">engage</a></li>
                                    <li><a href="#">establish</a></li>
                                    <li><a href="#">abide by</a></li>
                                    <li><a href="#">agreement</a></li>
                                    <li><a href="#">assurance</a></li>
                                    <li><a href="#">cancellation</a></li>
                                    <li><a href="#">determine</a></li>
                                    <li><a href="#">engage</a></li>
                                    <li><a href="#">establish</a></li>
                                </ol>
                            </div>
                            <div className="col-9 bg-flashcard">
                                <div className="flip-container">
                                    <div className="flippable flashcard">
                                        <div className="front">
                                            <h2 className="text-primary">abide by</h2>
                                            <p>/ əˈbaɪd baɪ /</p>
                                            <p>To cooperate with that company, he had to abide by the contract's conditions.</p>
                                        </div>
                                        <div className="back">
                                            <div className="row">
                                                <div className="col-8"><img src="image/card.jpeg" className="img-100" /></div>
                                                <div className="col-4"> <p>tuân theo</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="fa fa-caret-down" />
                            </div>
                        </div>
                    </div>
                </main>
                </div>
        )
    }
}
export default FlashCardPage;