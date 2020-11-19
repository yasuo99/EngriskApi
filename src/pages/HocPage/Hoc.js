import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

class Hoc extends Component {
    render() {
        return (
            <div>

                <Header />
                <main id="hoc2">
                    <div class="container">
                        <div class="row kechan mt-5 kechan">
                            <div class="col-8 offset-2">
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