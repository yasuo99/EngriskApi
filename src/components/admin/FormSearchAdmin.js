import React, {Component} from 'react'


class FormSearchAdmin extends Component{
    render(){
        return(
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
  
        )
    }
}
export default FormSearchAdmin;

