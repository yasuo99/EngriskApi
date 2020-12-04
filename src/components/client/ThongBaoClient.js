import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Moment from 'moment';
import notificationApi from '../../api/notificationApi';

class ThongBaoClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    }
    this.isComponentMounted = false;
  }
  componentDidMount = async () => {
    Moment.locale("en");
    this.isComponentMounted = true;
    if (this.isComponentMounted) {
      await this.fetchNotifications();
    }
  }
  fetchNotifications = async () => {
    try {
      const notifications = await notificationApi.getPublishing();
      this.setState({
        notifications: notifications
      });
      console.log(notifications);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { notifications } = this.state;
    const renderNotifications = this.state.notifications.map((notify) =>
      <Link key={notify.id} className="dropdown-item d-flex align-items-center" to={notify.url}>
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
          <span className="badge badge-danger badge-counter">{notifications.length}+</span>
        </Link>
        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
          <h6 className="dropdown-header">
            Alerts Center
          </h6>
          {renderNotifications}
          <Link className="dropdown-item text-center small text-gray-500" to="#">Show All Alerts</Link>
        </div>
      </li>
    )
  }
  componentWillUnmount() {
    this.isComponentMounted = false;
  }
}
export default ThongBaoClient;