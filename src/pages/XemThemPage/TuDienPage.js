import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Search from '../../components/xemthem/Search';
import Footer from '../Footer/Footer';

class TuDienPage extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <Search></Search>
                        <Footer></Footer>
                    </div>
                </div>          
                
               </div>
        );
    }
}
export default TuDienPage;