import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import './App.css';
import menu from './components/menu/menu';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from './routes';
import GuardRoute from './guards/GuardRoute';
import * as signalR from '@microsoft/signalr';
const hubConnection = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Debug).withUrl("http://localhost:5000/notification", {
  accessTokenFactory: () => localStorage.getItem("token") || null}).build();
class App extends Component {
  constructor() {
    super();
    hubConnection == null ? hubConnection.stop() : hubConnection.start();
  }
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
            roles={route.roles}
            notificationHub={hubConnection} />
        )
      })
    }
    return <Switch>{result}</Switch>;

  }
}
export default App;
