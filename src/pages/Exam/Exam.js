import { HubConnectionState } from '@microsoft/signalr';
import React, { Component } from 'react'
import { Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import examApi from '../../api/examApi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import { connection } from '../../signalR/createSignalRConnection';
import Footer from '../Footer/Footer';

class Exam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            params: {
                currentPage: 1,
                pageSize: 5
            },
            hasMore: true,
            histories: []
        }
        this.isComponentMounted = false;
    }
    componentDidMount = async () => {
        this.isComponentMounted = true;
        var exams = await this.fetchExam();
        if (this.isComponentMounted) {
            if(connection.state == HubConnectionState.Disconnected){
                connection.start();
            }
            connection.on("NewExam", (data) => {
                var exam = JSON.parse(data);
                this.setState({
                    exams: [exam,...this.state.exams]
                })
            })
            this.setState({
                exams: exams
            })
            if(this.props.isLoggedIn){
                const histories = await this.fetchHistories(this.props.account.id);
                this.setState({
                    histories: histories
                })
                console.log(histories);
            }
        }
    }
    fetchExam = async () => {
        var result = await examApi.getAll(this.state.params);
        return result;
    }
    fetchMoreExam = async () => {
        this.setState({
            params: { ...this.state.params, currentPage: this.state.params.currentPage + 1 }
        })
        var result = await examApi.getAll(this.state.params).catch((error) => {
            console.log(error);
            this.setState({
                hasMore: false
            });
            return;
        });
        if (result.length === 0) {
            this.setState({
                hasMore: false
            });
            return;
        }
        if (this.isComponentMounted) {
            this.setState({
                exams: this.state.exams.concat(result)
            })
        }
    }
    fetchHistories = async (id) => {
        return await examApi.getHistories(id);
    }
    render() {
        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Popover right</Popover.Title>
                <Popover.Content>
                    And here's some <strong>amazing</strong> content. It's very engaging.
                right?
              </Popover.Content>
            </Popover>
        );
        const popovers = [];
        this.state.exams.map((exam) => {

        })
        const renderExam = this.state.exams.map((exam) =>
            <OverlayTrigger key={exam.id} trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id="popover-basic">
                <Popover.Title as="h3">{exam.title}</Popover.Title>
                <Popover.Content>
                    {exam.detail}
                    <p>Số câu hỏi nghe: {exam.totalListening}</p>
                    <p>Số câu hỏi đọc: {exam.totalReading}</p>
                    <p>Tổng điểm bài thi: {exam.totalScore}</p>
                    {this.props.isLoggedIn && this.state.histories.some(el => el.examId === exam.id) && <p>Kết quả thi tốt nhất: Điểm: {this.state.histories.find((history) => history.examId === exam.id) && this.state.histories.find((history) => history.examId === exam.id).score }</p>}
                </Popover.Content>
            </Popover>}>
                <div className="card-hoc pt-2 mb-3">
                    <div className="row">
                        <div className="col-2 text-center">
                            <img src="/image/welcome.jpg" alt="welcome" className="img-hoc" />
                        </div>
                        <div className="col-7">
                            <a className="link-title">{exam.title} </a><Badge variant="primary">{exam.isNew ? "New" : "Old"}</Badge> {this.state.histories.some(el => el.examId == exam.id && el.isDone) && <Badge variant="success">Đã làm</Badge>}{this.state.histories.some(el => el.examId == exam.id && el.isPause) && <Badge variant="success">Tạm dừng</Badge>}
                            <p>Exp: {exam.exp}  </p>
                            <p>Price: {exam.price}</p>
                            <p>Duration: {exam.duration} minutes</p>
                        </div>
                        <div className="col-3 pr-4">
                            {(this.state.histories.some(h => h.examId == exam.id) == false || this.state.histories.some(h => h.examId == exam.id && h.isPause == false)) && <Link className="btn btn-primary do-btn" to={"/exam/" + exam.id}>Làm ngay<i className="fa fa-pencil"></i></Link>}
                            {this.state.histories.some(h => h.examId == exam.id && h.isPause) && <Link className="btn btn-primary do-btn" to={`/exam/${exam.id}?resume=true`}>Tiếp tục <i className="fa fa-pencil"></i></Link>}
                        </div>
                    </div>
                </div>
            </OverlayTrigger>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content" style={{overflow: 'auto', height:'100vh'}}>
                        <HeaderClient></HeaderClient>
                        <main id="scroll">
                            <div className="container">
                                <div className="row">
                                    <div id="trangchu" className="col-10 offset-1">
                                        {this.isComponentMounted && <InfiniteScroll
                                            dataLength={this.state.exams.length}
                                            next={this.fetchMoreExam}
                                            hasMore={this.state.hasMore}
                                            loader={<h4>Loading...</h4>}
                                            endMessage={
                                                <p style={{ textAlign: "center" }}>
                                                    <b>Hiện chưa có exam mới !!</b>
                                                </p>
                                            }
                                            height={500}
                                        >{renderExam}</InfiniteScroll>}
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
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
const mapStateToProps = (state) => {
    const {isLoggedIn, account} = state.auth;
    return{
        isLoggedIn: isLoggedIn,
        account: account
    }
}
export default connect(mapStateToProps)(Exam)