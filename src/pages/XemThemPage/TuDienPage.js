import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../../components/xemthem/Search';
import Footer2 from '../Footer/Footer2';
import Header from '../Header/Header';

class TuDienPage extends Component {
    render() {
        return (
            <div>
               <Header></Header>
               <Search></Search>
                <Footer2></Footer2>
               </div>
        );
    }
}
export default TuDienPage;