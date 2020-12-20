import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import { appendScript } from '../../config/appendScript'
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import queryString from 'querystring';
import wordApi from '../../api/wordApi';
import Search from '../../components/xemthem/Search';
import groupApi from '../../api/groupApi';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

class KetQuaTraCuu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: {
                direction: '',
                word: {
                    examples: []
                }
            },
            groups: []
        }
        this.selectGroup = this.selectGroup.bind(this);
        this.isComponentMounted = false;
    }
    componentDidMount = async () => {
        this.isComponentMounted = true;
        const { location: { location: { search } } } = this.props;
        var temp = queryString.parse(search.replace('?', ''));
        var result = await this.fetchResult(temp.search);
        console.log(result);
        if (this.isComponentMounted) {
            if (this.props.isLoggedIn) {
                const groups = await this.fetchGroup(this.props.account.id);
                console.log(groups);
                this.setState({
                    groups: groups
                })
            }
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
    fetchGroup = async (id) => {
        return await groupApi.getGroupsOfAccount(id);
    }
    addWordToGroup = async (groupId,wordId) => {
        return await groupApi.addWordToGroup(groupId,wordId);
    }
    selectGroup = async (e) => {
        const groupId = e.target.id;
        var result = await this.addWordToGroup(groupId, this.state.result.word.id);
        if(result.status === 200){
            toast("Thành công");
            const groups = await this.fetchGroup(this.props.account.id);
            if(this.isComponentMounted){
                this.setState({
                    groups: groups
                })
            }
        }
        else{
            toast("Thêm từ vựng vào nhóm thất bại");
        }
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
        const renderGroups = this.state.groups.map((group) =>
            <a key={group.id} id={group.id} onClick={(e) => this.selectGroup(e)} className="dropdown-item" href="#">{group.groupName} {group.words.some(el => el.eng === result.word.eng) && <img src="/image/remove.png" />}</a>
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
                                            <div className="col-8"><h2 className="kechan"><img src={result.direction === 'en' ? "/image/english-language.png" : "/image/vietnamxl.png"} /> {result.direction === 'en' ? result.word.eng : result.word.vie}</h2></div>
                                            {this.props.isLoggedIn && <div className="col-4 mt-4 text-right">
                                                <div className="dropdown">
                                                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Thêm vào danh sách</button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        {renderGroups}
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                        <h5 className="text2 mt-2">BẢN DỊCH</h5>
                                        <h3 className="mt-3"><img src={result.direction === 'en' ? "/image/vietnamxl.png" : "/image/english-language.png"} className="mr-2"/>{result.direction === 'en' ? result.word.vie : result.word.eng}</h3>
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
const mapStateToProps = (state) => {
    const { account, isLoggedIn } = state.auth;
    return {
        account: account,
        isLoggedIn: isLoggedIn
    }
}
export default connect(mapStateToProps)(KetQuaTraCuu);