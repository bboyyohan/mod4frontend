import React from 'react';
import './App.css';
import Navbar from './component/Navbar'
import ContentContainer from './container/ContentContainer'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './component/Home'
import BallisticsCalculator from './container/ContentContainer'
import Account from './container/ContentContainer'
import OwnedGuns from './container/ContentContainer'
import Guns from './container/ContentContainer'




class App extends React.Component{

  state = {
    currentUser: null,
    ownedGuns: []
    
  }

  currentUser = (user, guns) => {
    this.setState({currentUser: user,
    ownedGuns: guns })
  }

  

  render() {
    return(
      <div>

        <Navbar currentUser={this.currentUser}/>
        <Switch>
          <Route exact path="/" render={() =>

          this.state.currentUser ? <Redirect to='/account'/> : <ContentContainer component={Home} /> 
          }/>
          <Route path="/calculator" render={() =>
      
              <ContentContainer component={BallisticsCalculator} />
          } />
          <Route path="/account" render={() =>

            this.state.currentUser ? <ContentContainer component={Account} currentUser={this.state.currentUser} ownedGuns={this.state.ownedGuns}/> : <Redirect to='/'/>
              
          } />

          <Route path='/owned_guns' render={() =>
            
              <ContentContainer component={OwnedGuns} />
          } />

          <Route path='/guns' render={() =>

            <ContentContainer component={Guns} />
          } />

        </Switch>
        
        
      </div>
    )
  }
}

export default App;
