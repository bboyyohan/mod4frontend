import React from 'react';
import './App.css';
import Navbar from './component/Navbar'
import ContentContainer from './container/ContentContainer'
import {Route, Switch} from 'react-router-dom'
import Home from './component/Home'
import BallisticsCalculator from './container/ContentContainer'



class App extends React.Component{
  render() {
    return(
      <div>

        <Navbar />
        <Switch>
          <Route exact path="/" render={() =>
      
              <ContentContainer component={Home} />
          } />
          <Route path="/calculator" render={() =>
      
              <ContentContainer component={BallisticsCalculator} />
          } />
        </Switch>
        {/* <ContentContainer /> */}
        
      </div>
    )
  }
}

export default App;
