import React, { Component } from "react";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import ListHistoryExam from "../../components/histories/ListHistoryExam";
import Footer from '../Footer/Footer';
class HistroriesExam extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="lichsuexam">
                            <div className="container">
                                <h2>Lịch sử exam</h2>
                                <p>Đây là những lần làm bài exam trên website</p>
                                <ListHistoryExam></ListHistoryExam>
                            </div>
                        </section>
                        <Footer></Footer>
                    </div>
                </div>

            </div>
        )
    }
}
export default HistroriesExam;