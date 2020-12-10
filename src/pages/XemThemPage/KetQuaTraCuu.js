import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import queryString from 'querystring';
import wordApi from '../../api/wordApi';
import Search from '../../components/xemthem/Search';

class KetQuaTraCuu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: {
                direction: '',
                word: {
                    examples: []
                }
            }
        }
        this.isComponentMounted = false;
    }
    componentDidMount = async () => {
        this.isComponentMounted = true;
        const { location: { location: { search } } } = this.props;
        var temp = queryString.parse(search.replace('?', ''));
        var result = await this.fetchResult(temp.search);
        console.log(result);
        if (this.isComponentMounted) {
            this.setState({
                result: result
            })
        }
        appendScript("/js/style.js");
    }
    fetchResult = async (keyword) => {
        const params = {
            search: keyword
        };
        var result = await wordApi.searchDetail(params);
        return result;
    }
    render() {
        const { result } = this.state;
        const renderExamples = this.state.result.word.examples.map((example) =>
            <div key={example.id} className="row">
                <div className="col-8 offset-2">
                    <h5 className="gachchan text-primary"><img src="/image/united-states.png" /> {example.eng}</h5>
                    <h5><img src="/image/vietnam.png" /> {example.vie}</h5>
                </div>
            </div>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="ketquatracuu">
                            <div className="container">
                                <div className="row">
                                    <div className="col-10 offset-1">
                                        <Search></Search>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-10 offset-1 mt-4">
                                        <div className="row">
                                            <div className="col-8"><h1 className="kechan"><img src={result.direction === 'en' ? "/image/english-language.png" : "/image/vietnamxl.png"} /> {result.direction === 'en' ? result.word.eng : result.word.vie}</h1></div>
                                            <div className="col-4 mt-4 text-right">
                                                <div className="dropdown">
                                                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Thêm vào danh sách
                </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <a className="dropdown-item" href="#">Từ vựng học tập</a>
                                                        <a className="dropdown-item" href="#">Từ vựng vui chơi</a>
                                                        <a className="dropdown-item" href="#">Từ vựng gia đinh</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="text2 mt-2">BẢN DỊCH</h5>
                                        <h2 className="mt-3"><img src={result.direction === 'en' ? "/image/vietnamxl.png" : "/image/english-language.png"} />{result.direction === 'en' ? result.word.vie : result.word.eng}</h2>
                                        <h5 className="text2 mt-4">VÍ DỤ</h5>
                                        {renderExamples}
                                    </div>
                                </div>
                            </div>
                        </main>

                        <Footer></Footer>
                    </div>
                </div>

            </div>

        );
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default KetQuaTraCuu;