import React, {Component} from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import menu from './components/menu/menu';
import routes from './routes';

class App extends Component {
  render() {
      return (
        <div>
          <Router>
          <menu></menu>
          <div>
            {this.showContenMenus(routes)}
          </div>
          </Router>
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
