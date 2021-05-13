import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Moment from 'moment';
import * as signalR from '@microsoft/signalr';
import { connect } from 'react-redux';
import { connection } from '../../signalR/createSignalRConnection';
import notificationApiV2 from '../../api/2.0/notificationApi';
const hubConnection = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Debug).withUrl("http://localhost:5000/notification", {
  accessTokenFactory: () => localStorage.getItem("token") || null
}).build();
class ThongBaoClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      params: {
        currentPage: 1,
        pageSize: 5
      }
    }
    this.isComponentMounted = false;

  }
  async componentDidMount() {
    Moment.locale("en");
    this.isComponentMounted = true;
    if (this.props.isLoggedIn) {
      if (connection.state == signalR.HubConnectionState.Disconnected) {
        try {
          connection.start();
          connection.on('NewNotification', (data) => {
            var notification = JSON.parse(data);
            console.log(notification);
            if (this.isComponentMounted) {
              this.setState({
                notifications: [notification, ...this.state.notifications]
              })
            }
          })
        }catch{
          console.log('loi');
        }
      }

    }
    const result = await this.fetchNotifications(this.props.account.id, this.state.params);
    console.log(result);
    if (this.isComponentMounted) {
      if (result) {
        this.setState({
          notifications: result.items
        });
      }
    }
  }
  fetchNotifications = async (id, params) => {
    try {
      const notifications = await notificationApiV2.get(id, params);
      return notifications;
    } catch (error) {
      console.log(error);
    }
  }
  displayNotificationType = (type) => {
    switch (type) {
      case 0:
        return "info"
      case 1:
        return "success"
      case 2:
        return "danger"
      default:
        break;
    }
  }
  seenNotification = async (id) => {
    return await notificationApiV2.seenNotification(this.props.account.id, id);
  }
  render() {
    const { notifications } = this.state;
    console.log(notifications);
    const renderNotifications = this.state.notifications.map((notify) =>
      <Link key={notify.id} data-id={notify.id} className="dropdown-item d-flex align-items-center" to={notify.url || "#"} onClick={(e) => this.seenNotification(e.target.dataset.id)}>
        <div className="mr-3">
          <div className={"icon-circle" + " bg-" + this.displayNotificationType(notify.type)}>
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
  const { isLoggedIn, account } = state.auth;
  return ({
    isLoggedIn: isLoggedIn,
    account: account
  })
}
export default connect(mapStateToProps)(ThongBaoClient);