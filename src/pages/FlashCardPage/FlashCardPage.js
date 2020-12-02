import React, { Component } from 'react'
import Header from '../Header/Header';
import { getAllWord } from '../../actions/wordActions';
import $ from "jquery";

class FlashCardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: [],
            index: 0,
            currentWord: { examples: [] },
            loading: false
        }
        this.isComponentMounted = false;
    }
    componentDidMount = async () => {
        $(".flippable").on('click', function () {
            $(this).toggleClass("flipme")
        });
        this.setState({
            loading: true
        });
        this.isComponentMounted = true;
        if (this.isComponentMounted) {
            const result = await this.fetchWord();
            this.setState({
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
    selectWord = (e) => {
        const index = e.target.id;
        console.log(index);
        this.setState({
            index: index,
            currentWord: this.state.words[index]
        });
    }
    previousWord = (e) => {
        e.preventDefault();
        const index = this.state.index - 1;
        if(index >= 0){
            this.setState({
                index: index,
                currentWord: this.state.words[index]
            });
        }
    }
    nextWord = (e) => {
        e.preventDefault();
        const index = this.state.index + 1;
        if (index <= this.state.words.length) {
            this.setState({
                index: index,
                currentWord: this.state.words[index]
            });
        }
    }
    render() {
        const listWord = this.state.words.map((word) =>
            <li key={word.id} id={word.id - 1} className="text-center word-list" onClick={this.selectWord}>{word.eng}</li>
        );
        const examples = this.state.currentWord.examples.map((example) =>
            <p key={example.exampleId}>{example.example.eng}</p>
        );
        const { currentWord ,index} = this.state;

        console.log(index);
        return (
            <div>
                <Header></Header>
                <main id="flashcard">
                    <div className="container pt-5">
                        <div className="row">
                            <div className="col-3 bg-xam">
                                <ol type="1">
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
                                            {examples}
                                        </div>
                                        <div className="back">
                                            <div className="row">
                                                <div className="col-8"><img src={currentWord.wordImg || "image/card.jpeg"} className="img-100 card-img-top" /></div>
                                                <div className="col-4"> <p>{currentWord.vie}</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {index < this.state.words.length -1 && <span className="fa fa-caret-down" onClick={this.nextWord} />}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
export default FlashCardPage;