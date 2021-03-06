import React from 'react';
import './App.css';
import Navbar from './component/Navbar'
import ContentContainer from './container/ContentContainer'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './component/Home'
import BallisticsCalculator from './container/ContentContainer'
import Account from './container/ContentContainer'
import MiniGame from './component/MiniGame'




class App extends React.Component{

  state = {
    currentUser: null,
    ownedGuns: [],
    user_owned_guns: [],
    // owned guns: [ b, c, d]
    // user_owned_guns: [1, 2, 3, 4]
    
  }

  currentUser = (user, guns, join) => {
    // debugger
    this.setState({currentUser: user,
    ownedGuns: guns, user_owned_guns: join })
  }

  // gunsNotOwned = () => {
    
  // }

  // getUserOwnedGuns

  //addGun is gunObj
  addGuns = (addGun) => {
    // debugger
    console.log("add")
    console.log(addGun)
    if (!this.state.user_owned_guns.find(uog => uog.gun_id === addGun.id && uog.user_id === this.state.currentUser.id)) {
      fetch("http://localhost:3000/user_owned_guns", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: this.state.currentUser.id,
          gun_id: addGun.id
          
        })
      }).then(res => res.json())
      .then(uog => {
        let updatedArr = [...this.state.user_owned_guns, uog]
        let updatedOwned = [...this.state.ownedGuns, addGun]
        
        this.setState({user_owned_guns: updatedArr, ownedGuns: updatedOwned})
      })}

        // let updatedArr = [...this.state.user_owned_guns, uog]
        // this.setState({user_owned_guns: updatedArr})
      // })

}

  deleteGuns = (delGun) => {
    let join_id = this.state.user_owned_guns.filter(gun => gun.gun_id === delGun && gun.user_id === this.state.currentUser.id)
    // this.state
    fetch(`http://localhost:3000/user_owned_guns/${join_id[0].id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(this.setState({ownedGuns: this.state.ownedGuns.filter(gun => gun.id !== delGun), user_owned_guns: this.state.user_owned_guns.filter(gun => gun.gun_id !== delGun && gun.user_id === this.state.currentUser.id)}))
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

            this.state.currentUser ? <ContentContainer component={Account} currentUser={this.state.currentUser} ownedGuns={this.state.ownedGuns} deleteGuns={this.deleteGuns} addGuns={this.addGuns}/> : <Redirect to='/'/>
              
          } />

          <Route path='/mini_game' render={() =>
            
              <ContentContainer component={MiniGame} />
          } />

        </Switch>
        
        
      </div>
    )
  }
}

export default App;
