import React, { Component } from "react"
import CKEditor from "react-ckeditor-component";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class ThemBaiViet extends Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: 'content',
        }
    }

    updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }

    onChange(evt) {
        console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            content: newContent
        })
    }

    onBlur(evt) {
        console.log("onBlur event called with event info: ", evt);
    }

    afterPaste(evt) {
        console.log("afterPaste event called with event info: ", evt);
    }
    render() {
        return (
            <div id="wrapper">
            <SubMenuClient></SubMenuClient>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <HeaderClient></HeaderClient>
                    <section id="thembaiviet">
                    <div className="container">
                        <div className="row">
                            <div className="col-8 mt-5">
                                <form className="form-baiviet">
                                    <button type="button" className="btn float-right">ĐĂNG</button>
                                    <button type="button" className="btn float-right mr-3">HỦY</button>
                                    <textarea type="text" className="tieude" placeholder="Gõ tiêu đề bài viết" />
                                    <CKEditor
                                        activeClass="p10"
                                        content={this.state.content}
                                        events={{
                                            "blur": this.onBlur,
                                            "afterPaste": this.afterPaste,
                                            "change": this.onChange
                                        }}
                                    />

                                    <h6 className="mt-3 float-left">Chọn file hình ảnh:</h6>
                                    <input type="file" accept="image/png, image/jpeg" className="mt-2 ml-3" />
                                </form>
                            </div>
                            <div className="col-4 mt-5">
                                <input className="form-control" type="text" placeholder="Tìm kiếm" aria-label="Search" />
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
                            </div>
                        </div>
                    </div>
                </section>
          
                    <Footer></Footer>
                </div>
            </div>          
            
           </div>
        )
    }
}
export default ThemBaiViet;