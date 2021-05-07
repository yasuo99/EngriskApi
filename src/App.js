import React, { Component } from 'react';
import {Switch, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import './App.css';
import menu from './components/menu/menu';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from './routes';
import GuardRoute from './guards/GuardRoute';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Router>
            <ToastContainer />
            <menu></menu>
            <div>
              {this.showContentMenus(routes)}
            </div>
          </Router>
        </BrowserRouter>
      </div>
    );
  }
  showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <GuardRoute key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
            guard={route.guard}
            roles={route.roles}/>
        )
      })
    }
    return <Switch>{result}</Switch>;

  }
}
export default App;
