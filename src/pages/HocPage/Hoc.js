import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import wordApi from '../../api/wordApi';
import Header from '../Header/Header';
import Loader from 'react-loader-spinner';
class Hoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordList: [],
            loading: true
        }
    }
    async componentDidMount() {
        const {match} = this.props;
        console.log(match);
        try {
            const wordList = await wordApi.getAll();
            this.setState({
                wordList,
                loading: false
            })
            console.log(wordList);
        }
        catch (error) {
            console.log(error);
            this.setState({ loading: false });
        }
    }

    render() {
        const { wordList, loading } = this.state;
        return (
            <div>
                <Header />
                <main id="hoc2">
                    <div class="container">
                        <div class="row kechan mt-5 kechan">
                            <div class="col-8 offset-2">
                                {loading == false && <Loader type="Rings"
                                    color="#00BFFF"
                                    height={100}
                                    width={100}
                                    timeout={5000} />}
                                <h2>reputation</h2>
                                <p class="mb-5">Có nghĩa là?</p>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="dapan">
                                            <p>lỗi thời</p>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="dapan">
                                            <p>lỗi thời</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="dapan">
                                            <p>lỗi thời</p>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="dapan">
                                            <p>lỗi thời</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="dapan">
                                            <p>lỗi thời</p>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="dapan">
                                            <p>lỗi thời</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col-6"><button class="btn btn-primary">Bỏ qua</button></div>
                            <div class="col-6 text-right"><button class="btn btn-primary">Tiếp theo</button></div>
                        </div>
                    </div>
                </main>
            </div>

        )
    }
}
export default Hoc;