import React, { Component } from "react";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

class Learn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            modalDisplay: false,
            useKeyBoard: false,
            typeQuestion: "QuizSapXep",
            check: "",
            next: false,
            chooseImg: false,
            answerSort: "",
            checkSort: "",
        }
    }
    handleSelectOption = (e) => {
        this.setState({
            selectedOption: e.target.value,
            chooseImg: true
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    openModal = () => {
        this.setState({
            modalDisplay: true
        })
    }
    closeModal = () => {
        this.setState({
            modalDisplay: false,
        })
    }
    ToToggleKeyBoard = () => {
        if (this.state.useKeyBoard === false) {
            this.setState({
                useKeyBoard: true,
            })
        }
        else {
            this.setState({
                useKeyBoard: false,
            })
        }

    }
    checkAnswer = () => {
        if (this.state.selectedOption === "answerC") {
            this.setState({
                check: true
            })
        }
        else {
            this.setState({
                check: false
            })
        }
        this.setState({
            next: true
        })
    }
    checkAnswerSort = (answerSort) => {
        if (this.state.answerSort === answerSort.target.value) {
            this.setState({
                checkSort: true,
            })
        }
        else {
            this.setState({
                checkSort: false
            })
        }
        this.setState({
            next: true
        })
    }
    onClickAnswerImg = () => {
        if (this.state.selectedOption !== "") {
            this.setState({
                chooseImg: true
            })
        }
        else {
            this.setState({
                chooseImg: false
            })
        }
    }
    render() {
        var { useKeyBoard, typeQuestion, check, checkSort, next, chooseImg } = this.state
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="learn">
                            <div className="container">
                                <p className="btn btn-listQuestion" onClick={e => this.openModal(e)}>Danh sách câu hỏi</p>
                                <div className="boxContent">
                                    {typeQuestion === "QuizHinhAnh" ? (
                                        <div>
                                            <div className="titleQuestion">
                                                <img src="/image/question.png" alt="question"></img>
                                                <p className="title">Đâu là nước Anh?</p>
                                            </div>
                                            <div className="answerQuestionImage">
                                                <div className="itemQuestion">
                                                    <div className="row mt-4">
                                                        {chooseImg === true && this.state.selectedOption === "answerA" ? (
                                                            <div className="col-md-3 offset-1">
                                                                <div className="itemAnswer backgroundChoose">
                                                                    <img src="/image/english (1).jpg"></img>
                                                                    <div className="row mt-3">
                                                                        <div className="col-10">
                                                                            <p className="answer">next</p>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <input type="checkbox"
                                                                                className="radioAnswer"
                                                                                value="answerA"
                                                                                checked={this.state.selectedOption === 'answerA'}
                                                                                onChange={this.handleSelectOption}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="col-md-3 offset-1">
                                                                <div className="itemAnswer">
                                                                    <img src="/image/english (1).jpg"></img>
                                                                    <div className="row mt-3">
                                                                        <div className="col-10">
                                                                            <p className="answer">next</p>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <input type="checkbox"
                                                                                className="radioAnswer"
                                                                                value="answerA"
                                                                                checked={this.state.selectedOption === 'answerA'}
                                                                                onChange={this.handleSelectOption} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {chooseImg === true && this.state.selectedOption === "answerB" ? (
                                                            <div className="col-md-3">
                                                                <div className="itemAnswer backgroundChoose">
                                                                    <img src="/image/english (1).jpg"></img>
                                                                    <div className="row mt-3">
                                                                        <div className="col-10">
                                                                            <p className="answer">next</p>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <input type="checkbox"
                                                                                className="radioAnswer"
                                                                                value="answerB"
                                                                                checked={this.state.selectedOption === 'answerB'}
                                                                                onChange={this.handleSelectOption}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="col-md-3">
                                                                <div className="itemAnswer">
                                                                    <img src="/image/english (1).jpg"></img>
                                                                    <div className="row mt-3">
                                                                        <div className="col-10">
                                                                            <p className="answer">next</p>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <input type="checkbox"
                                                                                className="radioAnswer"
                                                                                value="answerB"
                                                                                checked={this.state.selectedOption === 'answerB'}
                                                                                onChange={this.handleSelectOption} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {chooseImg === true && this.state.selectedOption === "answerC" ? (
                                                            <div className="col-md-3">
                                                                <div className="itemAnswer backgroundChoose">
                                                                    <img src="/image/english (1).jpg"></img>
                                                                    <div className="row mt-3">
                                                                        <div className="col-10">
                                                                            <p className="answer">next</p>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <input type="checkbox"
                                                                                className="radioAnswer"
                                                                                value="answerC"
                                                                                checked={this.state.selectedOption === 'answerC'}
                                                                                onChange={this.handleSelectOption}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="col-md-3">
                                                                <div className="itemAnswer">
                                                                    <img src="/image/english (1).jpg"></img>
                                                                    <div className="row mt-3">
                                                                        <div className="col-10">
                                                                            <p className="answer">next</p>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <input type="checkbox"
                                                                                className="radioAnswer"
                                                                                value="answerC"
                                                                                checked={this.state.selectedOption === 'answerC'}
                                                                                onChange={this.handleSelectOption} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                    </div>

                                                </div>
                                                {check === "" ? "" : (check === true ? (
                                                    <div className="boxNotifyCorrect">
                                                        <p className="title">Correct</p>
                                                        <p className="content">Well done !</p>
                                                    </div>
                                                ) : (
                                                    <div className="boxNotifyIncorrect">
                                                        <p className="title">Incorrect</p>
                                                        <p className="content">Sorry, sorry. Incorrect</p>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    ) : (typeQuestion === "Quiz" ? (
                                        <div>
                                            <div className="titleQuestion">
                                                <img src="/image/question.png" alt="question"></img>
                                                <p className="title">Departmental restructuring will be discussed at the _____ monthly meeting</p>
                                            </div>
                                            <div className="answerQuestion">
                                                <div className="itemAnswer">
                                                    <div className="row">
                                                        <div className="col-1 text-right">
                                                            <input type="radio"
                                                                className="radioAnswer"
                                                                value="answerA"
                                                                checked={this.state.selectedOption === 'answerA'}
                                                                onChange={this.handleSelectOption} />
                                                        </div>
                                                        <div className="col-11">
                                                            <p className="answer">next</p>
                                                        </div>

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-1 text-right">
                                                            {/* <img src="/image/check2.png" className="check"></img> */}
                                                            <input type="radio" className="radioAnswer"
                                                                value="answerB"
                                                                checked={this.state.selectedOption === 'answerB'}
                                                                onChange={this.handleSelectOption} />
                                                        </div>
                                                        <div className="col-11">
                                                            <p className="answer">next</p>
                                                        </div>

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-1 text-right">
                                                            <input type="radio" className="radioAnswer"
                                                                value="answerC"
                                                                id="answerC"
                                                                name="answerC"
                                                                checked={this.state.selectedOption === 'answerC'}
                                                                onChange={this.handleSelectOption} />
                                                        </div>
                                                        <div className="col-11">
                                                            <p className="answer">next</p>
                                                        </div>

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-1 text-right">
                                                            <input type="radio" className="radioAnswer"
                                                                value="answerD"
                                                                checked={this.state.selectedOption === 'answerD'}
                                                                onChange={this.handleSelectOption} />
                                                        </div>
                                                        <div className="col-11">
                                                            <p className="answer">next</p>
                                                        </div>

                                                    </div>
                                                </div>
                                                {check === "" ? "" : (check === true ? (
                                                    <div className="boxNotifyCorrect">
                                                        <p className="title">Correct</p>
                                                        <p className="content">Well done !</p>
                                                    </div>
                                                ) : (
                                                    <div className="boxNotifyIncorrect">
                                                        <p className="title">Incorrect</p>
                                                        <p className="content">Sorry, sorry. Incorrect</p>
                                                    </div>
                                                ))}



                                            </div>

                                        </div>
                                    ) : (
                                        <div>
                                            <div className="titleQuestionSort">
                                                <img src="/image/problem.png" alt="question"></img>
                                                <p className="title"><img src="/image/sound.png"></img> WHAT IS YOUR NAME ?</p>
                                            </div>
                                            {useKeyBoard === true ? (
                                                <div className="boxKeyBoard">
                                                    <textarea type="text" id="answerSort" name="answerSort" className="useKeyBoard" onChange={this.handleChange} placeholder="Nhập bằng tiếng việt"></textarea>
                                                    {checkSort === "" ? "" : (checkSort === true ? (
                                                        <div className="boxNotifyCorrect">
                                                            <p className="title">Correct</p>
                                                            <p className="content">Well done !</p>
                                                        </div>
                                                    ) : (
                                                        <div className="boxNotifyIncorrect">
                                                            <p className="title">Incorrect</p>
                                                            <p className="content">Sorry, sorry. Incorrect</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="answerQuestionSort">
                                                    <div className="box"></div>
                                                    <div className="boxAnswer">
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Em</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Em</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>
                                                        <p className="itemAnswer">Tôi</p>

                                                    </div>
                                                    {checkSort === "" ? "" : (checkSort === true ? (
                                                        <div className="boxNotifyCorrect">
                                                            <p className="title">Correct</p>
                                                            <p className="content">Well done !</p>
                                                        </div>
                                                    ) : (
                                                        <div className="boxNotifyIncorrect">
                                                            <p className="title">Incorrect</p>
                                                            <p className="content">Sorry, sorry. Incorrect</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}


                                        </div>
                                    ))}
                                    {typeQuestion === "QuizSapXep" ? (
                                        (next === false ? (
                                            <div className="row mt-7">
                                                <div className="col-6">
                                                    <p className="keyboard"
                                                        id="keyboard"
                                                        onChange={this.handleChange}
                                                        onClick={this.ToToggleKeyBoard}
                                                    ><img src="/image/keyboard.png"></img> SỬ DỤNG BÀN PHÍM</p>
                                                </div>
                                                <div className="col-6">
                                                    <button className="btn btn-check" onClick={this.checkAnswerSort}><img src="/image/checked (1).png"></img> Kiểm tra</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button className="btn btn-continue mt-7"><img src="/image/next (3).png"></img> Tiếp theo</button>
                                        ))

                                    ) : (next === false ? (<button className="btn btn-check" onClick={this.checkAnswer}><img src="/image/checked (1).png"></img> Kiểm tra</button>) : (<button className="btn btn-continue"><img src="/image/next (3).png"></img> Tiếp theo</button>))}

                                </div>

                            </div>
                            <Modal show={this.state.modalDisplay} onHide={this.closeModal}>
                                <table>
                                    <Modal.Header closeButton onClick={() => this.closeModal()}>
                                        <thead>
                                            <tr className="active text-center">
                                                <th className="question">Câu hỏi</th>
                                                <th className="achieved">Điểm đạt được</th>
                                                <th className="point">Số điểm</th>
                                                <th className="result">Kết quả</th>
                                            </tr>
                                        </thead>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <tr>
                                            <td className="question">Departmental restructuring will be discussed at the _____ monthly meeting</td>
                                            <td className="achieved">10</td>
                                            <td className="point">10</td>
                                            <td className="result"><img src="/image/tick.png"></img></td>
                                        </tr>
                                        <tr>
                                            <td className="question">Departmental restructuring will be discussed at the _____ monthly meeting</td>
                                            <td className="achieved">0</td>
                                            <td className="point">10</td>
                                            <td className="result"><img src="/image/cross.png"></img></td>
                                        </tr>
                                    </Modal.Body>
                                </table>
                            </Modal>

                        </main>
                    </div>
                </div>
            </div >
        )
    }
}
export default Learn;