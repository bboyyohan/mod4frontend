import React from 'react'
import Gun from './Guns'
import OwnedGuns from './OwnedGuns'
import CardDeck from "react-bootstrap/CardDeck"

class Account extends React.Component {
   

    // componentDidMount(){
    //     this.getGuns()
    // }

    // getGuns = () => {
    //     // fetch(`http://localhost:3000/user_owned_guns/${this.props.currentUser.id}`)
    //     fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         this.setState({ownedGuns: data})

    //     })
    //     // debugger
    // }

    
    
// if u have user id and gun id make fetch call, when you add the gun, if it already exists dont do it
    render(){
        
        // let addButton = <Gun <button onClick={() => this.props.addGuns(this.props.gunObj)} > ✓ </button>
        
        return(
            <div>
            <h1> This is your Username: {this.props.currentUser.username}</h1>



            <h1> All of the Guns: </h1>
                <CardDeck>
                    {this.props.guns.map(gun => <Gun gunObj={gun} key={gun.id}  addGuns={this.props.addGuns} gunTrue={true}/>)}
                </CardDeck>
                
                

            <h1>All of the Guns you Own: </h1>
                <CardDeck>
                    {this.props.ownedGuns.map(gun => <Gun gunObj={gun} key={gun.id} deleteGuns={this.props.deleteGuns} gunTrue={false}/>)}
                </CardDeck>
                
            </div>
        )
    }
}

export default Account