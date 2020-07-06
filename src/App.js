import React from 'react';
import './App.css';
import Navbar from './component/Navbar'
import ContentContainer from './container/ContentContainer'
import {Route, Switch} from 'react-router-dom'
import Home from './component/Home'
import BallisticsCalculator from './container/ContentContainer'
import Account from './container/ContentContainer'
import OwnedGuns from './container/ContentContainer'
import Guns from './container/ContentContainer'



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
          <Route path="/account" render={() =>

              <ContentContainer component={Account} />
          } />

          <Route path='/owned_guns' render={() =>
            
              <ContentContainer component={OwnedGuns} />
          } />

          <Route path='/guns' render={() =>

            <ContentContainer component={Guns} />
          } />
        </Switch>
        {/* <ContentContainer /> */}
        
      </div>
    )
  }
}

export default App;
