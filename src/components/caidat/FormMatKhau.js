import React, {Component} from 'react'

class FormMatKhau extends Component{
    render(){
        return(
            <div className="col-8 mt-5">
            <form>
              <div className="row">
                <div className="col-8"><h3>Mật khẩu</h3></div>
                <div className="col-4 text-right"><button className="btn btn-primary">Lưu thay đổi</button></div>
              </div>
              <div className="nd">
                <div className="row">
                  <div className="col-4 text-right"><span className="mr-5">Mật khẩu hiện tại</span></div>
                  <div className="col-8"><input type="text" name="tendangnhap" /></div>
                </div>
                <div className="row mt-4">
                  <div className="col-4 text-right"><span className="mr-5">Mật khẩu mới</span></div>
                  <div className="col-8"><input type="text" name="tendangnhap" /></div>
                </div>
              </div>
            </form>
          </div>
      
        )
    }
}
export default FormMatKhau;