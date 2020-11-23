import React, {Component} from 'react';
import Word from '../../components/xemthem/Word';
import ListWord from '../../components/xemthem/ListWord';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Footer2 from '../Footer/Footer2';
import {actFetchWordsRequest} from "../../actions/xemThemActions"


class TuVungPage extends Component{

    componentDidMount(){
        this.props.fetchAllWords();
     }
    render(){
        var { words } = this.props;
        return(
            <div>
                <Header></Header>           
                <ListWord>
                    {this.showWords(words)}
                </ListWord>
                <Footer2></Footer2>
            </div>
        );
    }
    showWords = (words)=>{
        var result = null;
        if( words.length > 0 ){
            result = words.map((word, index) => {
                return(
                   <Word
                        key = {index}
                        word = {word}
                        index = {index}
                   
                   />
                )
            })
        }
        return result;
    }
}
const mapStateToProps = state => {
    return{
        words : state.xemthem
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllWords : () => {
            dispatch(actFetchWordsRequest());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TuVungPage);

