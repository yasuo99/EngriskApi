import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Moment from 'moment';
import notificationApi from '../../api/notificationApi';
import * as signalR from '@microsoft/signalr';
import { connect } from 'react-redux';
const hubConnection = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Debug).withUrl("http://localhost:5000/notification", {
  accessTokenFactory: () => localStorage.getItem("token") || null
}).build();
class ThongBaoClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      params: {
        pageSize: 4
      }
    }
    this.isComponentMounted = false;

  }
  async componentDidMount() {
    Moment.locale("en");
    this.isComponentMounted = true;
    if(this.props.isLoggedIn){
      hubConnection.start();
      hubConnection.on('Notification', (data) => {
        if (this.isComponentMounted) {
          this.setState({
            notifications: data
          })
        }
      })
    }
    const result = await this.fetchNotifications(this.state.params);
    if (this.isComponentMounted) {
      if (result) {
        this.setState({
          notifications: result
        });
      }
    }
  }
  fetchNotifications = async (params) => {
    try {
      const notifications = await notificationApi.getPublishing(params);
      return notifications;
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { notifications } = this.state;
    const renderNotifications = this.state.notifications.map((notify) =>
      <Link key={notify.id} className="dropdown-item d-flex align-items-center" to={notify.url || "/"}>
        <div className="mr-3">
          <div className={"icon-circle" + " bg-" + notify.type}>
            <i className="fa fa-donate text-white" />
          </div>
        </div>
        <div>
          <div className="small text-gray-500">{Moment(notify.publishedDate).format("MMMM Do YYYY")}</div>
          {notify.content}
        </div>
      </Link>
    )
    return (
      <li className="nav-item dropdown no-arrow mx-1">
        <Link className="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-bell fa-fw" />
          <span className="badge badge-danger badge-counter">{this.props.isLoggedIn ? notifications.length : 1}+</span>
        </Link>
        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
          <h6 className="dropdown-header text-center">
            Thông báo
          </h6>
          {this.props.isLoggedIn ? renderNotifications : <div className="dropdown-item d-flex align-items-center"> <div className="mr-3">
            <div className={"icon-circle" + " bg-info"}>
              <i className="fa fa-donate text-white" />
            </div>
          </div>
            <div>
              <div className="small text-gray-500">{Moment(Date.now()).format("MMMM Do YYYY")}</div>
              Chào mừng bạn đến với Engrisk
            </div></div>}
          <Link className="dropdown-item text-center small text-gray-500" to="/thongbao">Show All Alerts</Link>
        </div>
      </li>
    )
  }
  componentWillUnmount() {
    this.isComponentMounted = false;
  }
}
const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;
  return ({
    isLoggedIn: isLoggedIn
  })
}
export default connect(mapStateToProps)(ThongBaoClient);