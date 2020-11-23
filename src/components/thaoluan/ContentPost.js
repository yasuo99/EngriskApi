import React, { Component } from "react"

class ContentPost extends Component {
    render() {
        return (
            <div className="chude-binhluan">
                <div className="row mt-5">
                    <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src="image/imag-01.jpg" /></div>
                    <div className="col-md-11 pt-3">
                        <h4>Tìm hiểu về những loại bánh ngọt trên thế giới</h4>
                        <a href="#">Lap</a>
                        <p className="mt-3">Mong rằng doulingo có chức năng call giao tiếp để mọi người cùng luyện nói tiếng
        anh với nhau</p>
                    </div>
                    <div className="baocao">
                        <a href="#" className="mr-3">BÁO CÁO</a>
                        <a href="#">TẶNG LINGOT</a>
                    </div>
                </div>
            </div>

        )
    }
}
export default ContentPost;