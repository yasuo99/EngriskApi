import React, { Component } from 'react'

class DangTheoDoi extends Component {
    render() {
        return (
            <div className="theodoi mt-4">
                <div className="row pt-3">
                    <div className="col-8">
                        <h4>Đang Theo Dõi:</h4>
                    </div>
                    <div className="col-4 pt-2"><a href="#">SỬA ĐỔI</a></div>
                </div>
                <div className="nd-theodoi mt-2">
                    <img src="image/united-states.png" className="pr-3" />
                    <a href="#">Duolingo</a>
                </div>
                <div className="nd-theodoi mt-2">
                    <img src="image/united-states.png" className="pr-3" />
                    <a href="#">Duolingo</a>
                </div>
                <div className="nd-theodoi mt-2">
                    <img src="image/united-states.png" className="pr-3" />
                    <a href="#">Duolingo</a>
                </div>
            </div>

        )
    }
}
export default DangTheoDoi;