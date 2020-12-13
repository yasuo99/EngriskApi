import React, { Component } from 'react'
import { getAllWord } from '../../actions/wordActions';
import $ from "jquery";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import { Dropdown, DropdownButton } from "react-bootstrap";
import axiosClient from '../../config/axiosClient';
import groupApi from '../../api/groupApi';

class FlashCardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            currentGroup: { words: [] },
            words: [],
            index: 0,
            currentWord: { examples: [] },
            loading: false
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        $(".flippable").on('click', function () {
            $(this).toggleClass("flipme")
        });
        this.setState({
            loading: true
        });
        this.isComponentMounted = true;
        const result = await this.fetchWord();
        const groups = await this.fetchGroups(1);
        if (this.isComponentMounted) {
            this.setState({
                groups: groups,
                words: result,
                currentWord: result[this.state.index],
                loading: false
            })
            console.log(this.state);
        }

    }
    examples = () => {
        this.state.currentWord.examples.map((example) =>
            <p>{example.eng}</p>
        )
    };
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
    fetchWord = async () => {
        return await getAllWord();
    }
    fetchGroups = async (id) => {
        return groupApi.getGroupsOfAccount(id);
    }
    selectGroup = (e) => {
        console.log(e.target.id);
        const currentGroup = this.state.groups[e.target.id - 1];
        this.setState({
            currentGroup: currentGroup,
            words: currentGroup.words
        });
        console.log(this.state);
    }
    selectWord = (e) => {
        e.preventDefault();
        const index = parseInt(e.target.id);
        const currentWord = this.state.words.filter(el => el.id === index);
        if (currentWord) {
            this.setState({
                index: index,
                currentWord: currentWord[0]
            });
            console.log(this.state);
        }
    }
    previousWord = () => {
        const index = this.state.index - 1;
        console.log(index);
        if (index >= 0) {
            this.setState({
                index: index,
                currentWord: this.state.words[index]
            });
        }
    }
    nextWord = () => {
        let index = this.state.index + 1;
        console.log(index);
        if (index <= this.state.words.length) {
            this.setState({
                index: index,
                currentWord: this.state.words[index]
            });
        }
    }
    render() {
        const renderGroups = this.state.groups.map((group) =>
            <Dropdown.Item onClick={(e) => this.selectGroup(e)} key={group.id} id={group.id}>{group.groupName}</Dropdown.Item>
        );
        const listWord = this.state.words.map((word) =>
            <li key={word.id} id={word.id} className="text-center word-list" onClick={this.selectWord}>{word.eng}</li>
        );
        // const examples = this.state.currentWord.examples.map((example) =>
        //     <p key={example.id}>{example.eng}</p>
        // );
        console.log(this.state.currentWord.examples);
        const { currentWord, index } = this.state;
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="flashcard">
                            <div className="container pt-5">
                                <div className="row">
                                    <div className="col-3">
                                        <DropdownButton id="dropdown-basic-button" title={this.state.currentGroup.groupName || "Danh sách từ vựng"}>
                                            {renderGroups}
                                        </DropdownButton>
                                    </div>

                                </div>
                                <div className="row mt-4">
                                    <div className="col-3 bg-xam">
                                        <ol type="1">
                                            <li><input className="d-flex justify-content-center" /></li>
                                            {listWord}
                                        </ol>
                                    </div>
                                    <div className="col-9 bg-flashcard">
                                        {index > 0 && <span className="fa fa-caret-up" onClick={this.previousWord}></span>}
                                        <div className="flip-container">
                                            <div className="flippable flashcard">
                                                <div className="front">
                                                    <h2 className="text-primary">{currentWord.eng}</h2>
                                                    <p>/ {currentWord.spelling} /</p>
                                                    {/* {examples} */}
                                                </div>
                                                <div className="back">
                                                    <div className="row">
                                                        <div className="col-8"><img src={currentWord.wordImg || "image/card.jpeg"} className="img-100 card-img-top img-fluid" /></div>
                                                        <div className="col-4"> <p>{currentWord.vie}</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {index < this.state.words.length - 1 && <span className="fa fa-caret-down" onClick={this.nextWord} />}
                                    </div>
                                </div>
                            </div>
                        </main>

                        <Footer></Footer>
                    </div>
                </div>

            </div>
        )
    }
}
export default FlashCardPage;