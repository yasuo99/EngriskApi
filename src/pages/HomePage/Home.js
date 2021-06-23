import React, { Component } from "react";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import { ProgressBar } from "react-bootstrap";
import { HubConnectionState } from "@microsoft/signalr";
import sectionApi from "../../api/sectionApi";
import { connection } from "../../signalR/createSignalRConnection";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "../Footer/Footer";
import sectionApiV2 from "../../api/2.0/sectionApi";
import routeApi from "../../api/2.0/routeApi";
import { getAll, selectRoute } from "../../actions/routeActions";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      tempSections: [],
      params: {
        currentPage: 1,
        pageSize: 30,
      },
      hasMore: true,
      searchQuery: "",
    };
    this.isComponentMounted = false;
  }
  async componentDidMount() {
    console.log(this.props.route);
    this.isComponentMounted = true;

    if (this.isComponentMounted) {
      if (this.props.isLoggedIn) {
        if (connection.state == HubConnectionState.Disconnected) {
          connection.start();
        }
        const result = await routeApi.getAllEngriskRoute(this.props.account.id)
        this.props.getAll(result)
        this.props.selectRoute(result.engrisk[0])
        this.setState({
          routes: result,
        });
      }
      else {
        const result = await routeApi.getAnonymousRoute();
        this.setState({
          routes: result,
        })
        this.props.getAll(result)
        this.props.selectRoute(result.engrisk[0])
      }
    }
  }
  searchSection = () => {
    if (this.state.searchQuery !== "") {
      console.log(this.state.searchQuery);
      this.setState({
        sections: this.props.route.sections.filter((sec) =>
          sec.sectionName
            .toLowerCase()
            .includes(this.state.searchQuery.toLowerCase())
        ),
      });
    } else {
      this.setState({
        sections: this.state.tempSections,
      });
    }
  };
  render() {
    const renderSections = this.props.route.sections.map((section, index) => (
      <div key={index}>
        <div className="card-hoc pt-2 mb-3">
          <div
            className="headerLesson"
            data-toggle="collapse"
            key={section.id}
            data-id={section.id}
            href={`#collapse${index}`}
            role="button"
            aria-expanded="false"
            aria-controls={`collapse${index}`}
          >
            <div className="col-md-1">
              <div className="iconLesson">
                <img
                  src={section.photoUrl || "./image/welcome.jpg"}
                  alt="Lesson"
                  width="60"
                  height="60"
                ></img>
              </div>
            </div>
            <div className="col-md-8">
              <div className="contentLesson">
                <h2 className="title">{section.sectionName}</h2>
              </div>
            </div>
            <div className="col-md-3">
              {this.props.isLoggedIn ? (
                <div className="progressLesson">
                  <ProgressBar
                    now={section.isDone ? 100 : 0}
                    variant="primary"
                  ></ProgressBar>
                  <span className="textProgress">
                    {section.isDone ? 100 : 0}%
                  </span>
                </div>
              ) : (
                <div className="progressLesson">
                  <ProgressBar now={0}></ProgressBar>
                  <span className="textProgress">{0}%</span>
                </div>
              )}
            </div>
          </div>
          <div
            className={
              index == 0 ? "collapse show border-top" : "collapse border-top"
            }
            id={`collapse${index}`}
          >
            <div className="cardCollapse">
              <div className="col-md-8 offset-1 contentCollapse">
                <p className="title">{section.description}</p>
                <div className="container">
                  {["bottom"].map((placement) => (
                    <OverlayTrigger
                      key={placement}
                      placement={placement}
                      overlay={
                        !section.isCurrentLocked ? (
                          <Tooltip id={`tooltip-${placement}`} style={{}}>
                            Học từ vựng <br /> <hr className="text-white"></hr>
                            Sử dụng thẻ ghi nhớ để học từ vựng mới
                          </Tooltip>
                        ) : this.props.isLoggedIn ? (
                          <Tooltip id={`tooltip-${placement}`}>
                            Hoàn thành section trước đó để mở khóa
                          </Tooltip>
                        ) : (
                          <Tooltip id={`tooltip-${placement}`}>
                            Đăng nhập để tiếp tục học
                          </Tooltip>
                        )
                      }
                    >
                      <button
                        className={
                          section.isCurrentLocked
                            ? "rounded-circle bg-warning"
                            : "rounded-circle"
                        }
                      >
                        <Link
                          className={
                            section.isCurrentLocked
                              ? "nav-link disabled"
                              : "nav-link"
                          }
                          to={`/sections/${section.id}/vocabulary`}
                          disabled
                        >
                          <img
                            src="./image/flash-card.png"
                            width="24"
                            height="24"
                          ></img>
                        </Link>
                        {section.isCurrentLocked && (
                          <span className="rounded">
                            <i className="fa fa-lock lock-icon text-primary"></i>
                          </span>
                        )}
                      </button>
                    </OverlayTrigger>
                  ))}
                  <div className="kengang"></div>
                  {["bottom"].map((placement) => (
                    <OverlayTrigger
                      key={placement}
                      placement={placement}
                      overlay={
                        !section.isCurrentLocked ? (
                          <Tooltip id={`tooltip-${placement}`}>
                            Làm quiz
                            <br />
                            Luyện tập thông qua các bài quiz
                          </Tooltip>
                        ) : this.props.isLoggedIn ? (
                          <Tooltip id={`tooltip-${placement}`}>
                            Hoàn thành section trước đó để mở khóa
                          </Tooltip>
                        ) : (
                          <Tooltip id={`tooltip-${placement}`}>
                            Đăng nhập để tiếp tục học
                          </Tooltip>
                        )
                      }
                    >
                      <button
                        className={
                          section.isCurrentLocked
                            ? "rounded-circle bg-warning"
                            : "rounded-circle"
                        }
                      >
                        <Link
                          className={
                            section.isCurrentLocked
                              ? "nav-link disabled"
                              : "nav-link"
                          }
                          to={`/sections/${section.id}/learn`}
                        >
                          <img
                            src="./image/test1.png"
                            width="24"
                            height="24"
                          ></img>
                        </Link>
                        {section.isCurrentLocked && (
                          <span className="rounded">
                            <i className="fa fa-lock lock-icon text-primary"></i>
                          </span>
                        )}
                      </button>
                    </OverlayTrigger>
                  ))}
                  <div className="kengang"></div>
                  {["bottom"].map((placement) => (
                    <OverlayTrigger
                      key={placement}
                      placement={placement}
                      overlay={
                        !section.isCurrentLocked ? (
                          <Tooltip id={`tooltip-${placement}`}>
                            Luyện nghe <br />
                            Rèn luyện khả năng nghe
                          </Tooltip>
                        ) : this.props.isLoggedIn ? (
                          <Tooltip id={`tooltip-${placement}`}>
                            Hoàn thành section trước đó để mở khóa
                          </Tooltip>
                        ) : (
                          <Tooltip id={`tooltip-${placement}`}>
                            Đăng nhập để tiếp tục học
                          </Tooltip>
                        )
                      }
                    >
                      <button
                        className={
                          section.isCurrentLocked
                            ? "rounded-circle bg-warning"
                            : "rounded-circle"
                        }
                      >
                        <Link
                          className={
                            section.isCurrentLocked
                              ? "nav-link disabled"
                              : "nav-link"
                          }
                          to="/card"
                        >
                          <img
                            src="./image/headphones.png"
                            width="24"
                            height="24"
                          ></img>
                        </Link>
                        {section.isCurrentLocked && (
                          <span className="rounded">
                            <i className="fa fa-lock lock-icon text-primary"></i>
                          </span>
                        )}
                      </button>
                    </OverlayTrigger>
                  ))}
                  <div className="kengang2"></div>
                  {["bottom"].map((placement) => (
                    <OverlayTrigger
                      key={placement}
                      placement={placement}
                      overlay={
                        !section.isCurrentLocked ? (
                          <Tooltip
                            id={`tooltip-${placement}`}
                            style={{ backgroundColor: "white" }}
                          >
                            Hội thoại
                            <br />
                            Học cách sử dụng từ ngữ vào ngữ cảnh
                          </Tooltip>
                        ) : this.props.isLoggedIn ? (
                          <Tooltip id={`tooltip-${placement}`}>
                            Hoàn thành section trước đó để mở khóa
                          </Tooltip>
                        ) : (
                          <Tooltip id={`tooltip-${placement}`}>
                            Đăng nhập để tiếp tục học
                          </Tooltip>
                        )
                      }
                    >
                      <button
                        className={
                          section.isCurrentLocked
                            ? "rounded-circle bg-warning"
                            : "rounded-circle"
                        }
                      >
                        <Link
                          className={
                            section.isCurrentLocked
                              ? "nav-link disabled"
                              : "nav-link"
                          }
                          to="/card"
                        >
                          <img
                            src="./image/conversation.png"
                            width="24"
                            height="24"
                          ></img>
                        </Link>
                        {section.isCurrentLocked && (
                          <span className="rounded">
                            <i className="fa fa-lock lock-icon text-primary"></i>
                          </span>
                        )}
                      </button>
                    </OverlayTrigger>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
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
                    <div id='chat-menu'>
                      <div className="head">Danh sách bài học</div>
                    </div>
                    {renderSections}
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
}
const mapStateToProps = (state) => {
  const { isLoggedIn, account } = state.auth;
  const { route } = state.route
  return {
    isLoggedIn: isLoggedIn,
    account: account,
    route: route
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAll: (routes) => dispatch(getAll(routes)),
    selectRoute: (route) => dispatch(selectRoute(route))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
