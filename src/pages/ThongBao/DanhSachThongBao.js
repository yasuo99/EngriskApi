import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import notificationApi from '../../api/notificationApi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import ThongBao from '../../components/thongbao/ThongBao';
import Footer from '../Footer/Footer';

class DanhSachThongBao extends Component {
    constructor(props) {
        super(props);
        this.isComponentMounted = false;
        this.state = {
            notification: [],
            params: { pageSize: 100 }
        }
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        var result = await this.fetchNotification(this.state.params);
        if (this.isComponentMounted) {
            this.setState({
                notification: result
            })
        }
    }
    fetchNotification = async (params) => {
        return await notificationApi.getPublishing(params);
    }
    render() {
        const renderNotification = this.state.notification.map((notify) =>
            <div key={notify.id} className="col-lg-4 col-md-4 pb-3">
                <ThongBao notify={notify}></ThongBao>
            </div>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="danhsachthongbao">
                            <div className="container pt-3">
                                <h4 className="title">Danh sách thông báo</h4>
                                <div className="row mt-3">
                                   {renderNotification}
                                </div>
                            </div>
                        </section>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        );
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default DanhSachThongBao;