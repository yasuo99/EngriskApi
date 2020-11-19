import React, {Component} from 'react';
import { Route, Switch, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import './App.css';
import menu from './components/menu/menu';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from './routes';

class App extends Component {
  render() {
      return (
        <div>
          <BrowserRouter>
          <Router>
          <ToastContainer />
          <menu></menu>
          <div>
            {this.showContenMenus(routes)}
          </div>
          </Router>
          </BrowserRouter>
        </div>
      );
  }
  showContenMenus= (routes)=>{
    var result = null;
    if(routes.length > 0){
      result = routes.map((route, index) =>{
        return(
          <Route 
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        )
      })
    }
  return <Switch>{result}</Switch>;

  }
}
export default App;
