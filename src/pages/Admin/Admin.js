import React, { Component } from "react";

class Admin extends Component {

  render() {
    return(
      <div>
        <div id="wrapper">
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fa fa-smile-o" />
              </div>
              <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
              <a className="nav-link" href="index.html">
                <i className="fa fa-fw fa-tachometer-alt" />
                <span>Dashboard</span></a>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
              Interface
            </div>
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fa fa-fw fa-cog" />
                <span>Giao diện</span>
              </a>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Tùy chỉnh giao diện:</h6>
                  <a className="collapse-item" href="banners.html">Banner</a>
                  <a className="collapse-item" href="cards.html">Footer</a>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                <i className="fa fa-fw fa-wrench" />
                <span>Content</span>
              </a>
              <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Quản lý nội dung:</h6>
                  <a className="collapse-item" href="management.html">Tài khoản</a>
                  <a className="collapse-item" href="management.html">Bài tập</a>
                  <a className="collapse-item" href="management.html">Thông báo</a>
                  <a className="collapse-item" href="management.html">Từ vựng</a>
                  <a className="collapse-item" href="management.html">Ví dụ</a>
                  <a className="collapse-item" href="management.html">Lịch sử nạp</a>
                  <a className="collapse-item" href="management.html">Báo lỗi</a>
                </div>
              </div>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
              Addons
            </div>
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                <i className="fa fa-fw fa-folder" />
                <span>Trang</span>
              </a>
              <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="404.html">Trang 404</a>
                  <a className="collapse-item" href="blank.html">Trang trống</a>
                  <a className="collapse-item" href="blank.html">Trang lỗi</a>
                </div>
              </div>
            </li>
          </ul>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars" />
                </button>
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fa fa-search fa-sm" />
                      </button>
                    </div>
                  </div>
                </form>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-search fa-fw" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fa fa-search fa-sm" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-bell fa-fw" />
                      <span className="badge badge-danger badge-counter">3+</span>
                    </a>
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                      <h6 className="dropdown-header">
                        Alerts Center
                      </h6>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-primary">
                            <i className="fa fa-file-alt text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">December 12, 2019</div>
                          <span className="font-weight-bold">A new monthly report is ready to download!</span>
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-success">
                            <i className="fa fa-donate text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">December 7, 2019</div>
                          $290.29 has been deposited into your account!
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-warning">
                            <i className="fa fa-exclamation-triangle text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">December 2, 2019</div>
                          Spending Alert: We've noticed unusually high spending for your account.
                        </div>
                      </a>
                      <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-envelope fa-fw" />
                      <span className="badge badge-danger badge-counter">7</span>
                    </a>
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                      <h6 className="dropdown-header">
                        Message Center
                      </h6>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                          <div className="status-indicator bg-success" />
                        </div>
                        <div className="font-weight-bold">
                          <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                          <div className="small text-gray-500">Emily Fowler · 58m</div>
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="" />
                          <div className="status-indicator" />
                        </div>
                        <div>
                          <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                          <div className="small text-gray-500">Jae Chun · 1d</div>
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="" />
                          <div className="status-indicator bg-warning" />
                        </div>
                        <div>
                          <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                          <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="" />
                          <div className="status-indicator bg-success" />
                        </div>
                        <div>
                          <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                          <div className="small text-gray-500">Chicken the Dog · 2w</div>
                        </div>
                      </a>
                      <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                    </div>
                  </li>
                  <div className="topbar-divider d-none d-sm-block" />
                  <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
                      <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                      <a className="dropdown-item" href="#">
                        <i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400" />
                        Profile
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fa fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                        Settings
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fa fa-list fa-sm fa-fw mr-2 text-gray-400" />
                        Activity Log
                      </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                        <i className="fa fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>

              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                  <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fa fa-download fa-sm text-white-50" /> Generate Report</a>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Earnings (Monthly)</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                          </div>
                          <div className="col-auto">
                            <i className="fa fa-calendar fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Earnings (Annual)</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                          </div>
                          <div className="col-auto">
                            <i className="fa fa-dollar fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Số tài khoản (Annual)</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">50</div>
                          </div>
                          <div className="col-auto">
                            <i className="fa fa-dollar fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Requests</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                          </div>
                          <div className="col-auto">
                            <i className="fa fa-comments fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                        <div className="dropdown no-arrow">
                          <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                          </a>
                          <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div className="dropdown-header">Dropdown Header:</div>
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="#">Something else here</a>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="chart-area">
                          <canvas id="myAreaChart" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                        <div className="dropdown no-arrow">
                          <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                          </a>
                          <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div className="dropdown-header">Dropdown Header:</div>
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="#">Something else here</a>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="chart-pie pt-4 pb-2">
                          <canvas id="myPieChart" />
                        </div>
                        <div className="mt-4 text-center small">
                          <span className="mr-2">
                            <i className="fa fa-circle text-primary" /> Direct
                          </span>
                          <span className="mr-2">
                            <i className="fa fa-circle text-success" /> Social
                          </span>
                          <span className="mr-2">
                            <i className="fa fa-circle text-info" /> Referral
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright © Your Website 2020</span>
                </div>
              </div>
            </footer>
          </div>
        </div>

        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fa fa-angle-up" />
        </a>
        <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <a className="btn btn-primary" href="login.html">Logout</a>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
  }
}


export default Admin;
