import React, { Component } from 'react'
import { Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import examApi from '../../api/examApi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

export default class Exam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            params: {
                currentPage: 1,
                pageSize: 4
            },
            hasMore: true
        }
        this.isComponentMounted = false;
    }
    componentDidMount = async () => {
        this.isComponentMounted = true;
        var exams = await this.fetchExam();
        if (this.isComponentMounted) {
            this.setState({
                exams: exams
            })
            console.log(exams);
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
                </Popover.Content>
            </Popover>}>
                <div className="card-hoc pt-2 mb-3">
                    <div className="row">
                        <div className="col-2 text-center">
                            <img src="/image/welcome.jpg" alt="welcome" className="img-hoc" />
                        </div>
                        <div className="col-8">
                            <a className="link-title">{exam.title} </a><Badge variant="primary">{exam.isNew ? "New" : "Old"}</Badge>
                            <p>Exp: {exam.exp}  </p>
                            <p>Price: {exam.price}</p>
                            <p>Duration: {exam.duration}</p>
                        </div>
                        <div className="col-2 pr-4">
                            <Link className="btn btn-primary do-btn" to={"/exam/" + exam.id}>Do <i className="fa fa-pencil"></i></Link>
                        </div>
                    </div>
                </div>
            </OverlayTrigger>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
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
                                            scrollableTarget="content-wrapper"
                                        >{renderExam}
                                        </InfiniteScroll>}
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
