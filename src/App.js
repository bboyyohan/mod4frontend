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
    ownedGuns: [],
    user_owned_guns: []
    // owned guns: [ b, c, d]
    // user_owned_guns: [1, 2, 3, 4]
    
  }

  currentUser = (user, guns, join) => {
    // debugger
    this.setState({currentUser: user,
    ownedGuns: guns, user_owned_guns: join })
  }

  // getUserOwnedGuns

  

  deleteGuns = (delGun) => {
    let join_id = this.state.user_owned_guns.filter(gun => gun.gun_id === delGun && gun.user_id === this.state.currentUser.id)
    // this.state
    fetch(`http://localhost:3000/user_owned_guns/${join_id[0].id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(this.setState({ownedGuns: this.state.ownedGuns.filter(gun => gun.id !== delGun)}))
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

            this.state.currentUser ? <ContentContainer component={Account} currentUser={this.state.currentUser} ownedGuns={this.state.ownedGuns} deleteGuns={this.deleteGuns}/> : <Redirect to='/'/>
              
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
