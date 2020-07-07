import React from 'react'
import BallisticsCalculator from './BallisticsCalculator'
import {
    Switch,
    Route
  } from "react-router-dom";
import Home from '../component/Home'
import Account from './Account'
import OwnedGuns from './OwnedGuns';
import Guns from './Guns'



class ContentContainer extends React.Component {
    constructor(){
        super()
        this.state = {
            bulletType: [],
            guns: [],
            gunsByCalibre: []
        }
    }

    componentDidMount(){
        this.fetchBulletType()
        this.fetchGuns()
    }

    fetchGuns = () => {
        fetch('http://localhost:3000/guns')
        .then(res => res.json())
        .then(allGunsData => this.setState({guns: allGunsData, gunsByCalibre: allGunsData}))
    }

    fetchBulletType = () => {
        fetch("http://localhost:3000/bullet_types").then(res => res.json()).then(bulletTypeData => this.setState({
            bulletType: bulletTypeData
        }))
    }

    calibreGuns = (calibre) => {
        console.log(calibre)
        // debugger
        let filteredBulletArray = this.state.bulletType.filter(bulletType => bulletType.calibre === calibre)
        
        this.setState({
            gunsByCalibre: this.state.guns.filter(gun => gun.bullet_type_id === filteredBulletArray[0].id)
        })
    }

    render(){
        return(
            // <Switch >
            //     <div>
            //         <BallisticsCalculator guns={this.state.gunsByCalibre} bulletType={this.state.bulletType} calibreGuns={this.calibreGuns}/>
                
            //     </div>
            // </Switch>
            <Switch>
                <Route exact path="/" render={() =>
            
                    <Home />
                } />
                <Route path="/calculator" render={() =>
            
                    <BallisticsCalculator guns={this.state.gunsByCalibre} bulletType={this.state.bulletType} calibreGuns={this.calibreGuns}/>
                } />
                <Route path="/account" render={() =>

                    <Account currentUser={this.props.currentUser} guns={this.state.guns} ownedGuns={this.props.ownedGuns} deleteGuns={this.props.deleteGuns}/>
                }/>
                <Route path="/owned_guns" render={() =>
                    
                    <OwnedGuns />
                }/>

                <Route path="/guns" render={() =>
                    <Guns />
                }/>
            </Switch>
        )
    }
}

export default ContentContainer