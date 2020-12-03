import React,{Component} from "react"
import TinNhanAdmin from "./TinNhanAdmin";

class ListTinNhan extends Component{
    render(){
        return(
            <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fa fa-envelope fa-fw" />
              <span className="badge badge-danger badge-counter">7</span>
            </a>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
              <h6 className="dropdown-header">
                Message Center
              </h6>
             <TinNhanAdmin></TinNhanAdmin>
             <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
            </div>
          </li>
        )
    }
}
export default ListTinNhan;