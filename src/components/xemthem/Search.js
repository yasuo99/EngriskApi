import React, { Component } from "react";

class Search extends Component {
    render() {
        return (
            <div id="tudien">
                <div className="container">
                    <div className="row">
                        <div className="col-8 offset-2">
                            <div className="nd-tudien text-center">
                                <h4>Dịch Tiếng Anh-Tiếng Việt</h4>
                                <p>Xem giải nghĩa từ, ví dụ câu và nhiều điều khác.</p>
                            </div>
                            <form>
                                <div className="inner-form">
                                    <div className="input-field first-wrap">
                                        <img src="image/english-language.png" />
                                    </div>
                                    <div className="input-field second-wrap">
                                        <input id="search" type="text" placeholder="Nhập bằng Tiếng Anh hoặc Tiếng Việt" />
                                    </div>
                                    <div className="input-field third-wrap">
                                        <button className="btn btn-primary" type="button">
                                            DỊCH NGHĨA
                            </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Search;