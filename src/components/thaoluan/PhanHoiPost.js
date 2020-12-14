import React, { Component } from 'react';

class PhanHoiPost extends Component {
    render() {
        return (
            <div className="row mt-3 kechan">
                <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src="image/imag-01.jpg" /></div>
                <div className="col-md-11 pt-3">
                    <a href="#">Lap</a>
                    <p className="mt-3">Mong rằng doulingo có chức năng call giao tiếp để mọi người cùng luyện nói tiếng
                        anh với nhau</p>
                </div>
                <div className="baocao">
                    <a href="#" className="mr-3">TRẢ LỜI</a>
                    <a href="#" className="mr-3">BÁO CÁO</a>
                    <a href="#">TẶNG LINGOT</a>
                </div>
            </div>
        );
    }
}
export default PhanHoiPost;