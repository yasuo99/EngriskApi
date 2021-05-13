import React, { Component } from 'react'
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import { ProgressBar } from 'react-bootstrap';
import { HubConnectionState } from '@microsoft/signalr';
import sectionApi from '../../api/sectionApi';
import { connection } from '../../signalR/createSignalRConnection'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            params: {
                currentPage: 1,
                pageSize: 10
            },
            hasMore: true
        };
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const result = await this.fetchSections(this.state.params, this.props.isLoggedIn);
        console.log(result);
        if (result.length < 4) {
            this.setState({
                hasMore: false
            })
        }
        if (this.isComponentMounted) {
            if (connection.state == HubConnectionState.Disconnected) {
                connection.start();
            }
            connection.on('AddSection', (data) => {
                var section = JSON.parse(data);
                this.setState({
                    sections: [...this.state.sections, section]
                })
            })
            this.setState({
                sections: result
            });
        }
    }

    fetchSections = async (params, auth) => {
        return await sectionApi.getAll(params, auth);
    }
    fetchMoreSections = async () => {
        this.setState({
            params: { ...this.state.params, currentPage: this.state.params.currentPage + 1 }
        })
        var result = await sectionApi.getAll(this.state.params, this.props.isLoggedIn).catch((error) => {
            console.log(error);
            this.setState({
                hasMore: false
            });
            return;
        });
        console.log(result);
        if (result.length === 0) {
            this.setState({
                hasMore: false
            });
            return;
        }
        console.log(this.state);
        if (this.isComponentMounted) {
            this.setState({
                sections: this.state.sections.concat(result)
            })
        }
    }
    render() {
        const renderSections = this.state.sections.map((section, index) =>
            <a data-toggle="collapse" key={section.id} data-id={section.id} href={`#collapse${index}`} role="button" aria-expanded="false" aria-controls={`collapse${index}`}>
                <div className="card-hoc pt-2 mb-3">
                    <div className="headerLesson">
                        <div className="col-md-1">
                            <div className="iconLesson">
                                <img src={section.photoUrl || "./image/welcome.jpg"} alt="Lesson" width="60" height="60"></img>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="contentLesson">
                                <h2 className="title">{section.title}</h2>
                                <p className="description">{section.description}</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="progressLesson">
                                <ProgressBar now={(section.dpa / (section.totalQuizzes === 0 ? 1 : section.totalQuizzes)) * 100}></ProgressBar>
                                <span className="textProgress">{(section.dpa / (section.totalQuizzes === 0 ? 1 : section.totalQuizzes)) * 100}%</span>
                            </div>
                        </div>

                    </div>
                    <div className={index == 0 ? "collapse show border-top" : "collapse border-top"} id={`collapse${index}`}>
                        <div className="cardCollapse">
                            <div className="col-md-8 offset-1 contentCollapse">
                                <div className="container">
                                    <button className="rounded-circle bg-info">Từ vựng</button>
                                    <button className="rounded-circle bg-info">Quiz</button>
                                    <button className="rounded-circle bg-info">Luyện nghe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="home">
                            <div className="container">
                                <div className="col-md-10 offset-1">
                                    <div className="boxLesson">
                                        {renderSections}
                                    </div>

                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;