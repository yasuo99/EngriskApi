import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class ThongBaoClient extends Component {
  render() {
    return (
        <li className="nav-item dropdown no-arrow mx-1">
        <Link className="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-bell fa-fw" />
          <span className="badge badge-danger badge-counter">3+</span>
        </Link>
        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
          <h6 className="dropdown-header">
            Alerts Center
          </h6>
          <Link className="dropdown-item d-flex align-items-center" to="#">
            <div className="mr-3">
              <div className="icon-circle bg-primary">
                <i className="fa fa-file-alt text-white" />
              </div>
            </div>
            <div>
              <div className="small text-gray-500">December 12, 2019</div>
              <span className="font-weight-bold">A new monthly report is ready to download!</span>
            </div>
          </Link>
          <Link className="dropdown-item d-flex align-items-center" to="#">
            <div className="mr-3">
              <div className="icon-circle bg-success">
                <i className="fa fa-donate text-white" />
              </div>
            </div>
            <div>
              <div className="small text-gray-500">December 7, 2019</div>
              $290.29 has been deposited into your account!
            </div>
          </Link>
          <Link className="dropdown-item d-flex align-items-center" to="#">
            <div className="mr-3">
              <div className="icon-circle bg-warning">
                <i className="fa fa-exclamation-triangle text-white" />
              </div>
            </div>
            <div>
              <div className="small text-gray-500">December 2, 2019</div>
              Spending Alert: We've noticed unusually high spending for your account.
            </div>
          </Link>
          <Link className="dropdown-item text-center small text-gray-500" to="#">Show All Alerts</Link>
        </div>
      </li>
    )
  }
}
export default ThongBaoClient;