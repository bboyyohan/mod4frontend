import React from 'react'
import Gun from './Guns'
import OwnedGuns from './OwnedGuns'
import CardDeck from "react-bootstrap/CardDeck"

class Account extends React.Component {
    // state = {
    //     ownedGuns: []
    // }

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

    

    render(){
        
        
        return(
            <div>
            <h1> This is your Username: {this.props.currentUser.username}</h1>



            <h1> All of the Guns: </h1>
                <CardDeck>
                    {this.props.guns.map(gun => <Gun gunObj={gun} key={gun.id} />)}
                </CardDeck>
                

            <h1>All of the Guns you Own: </h1>
            <CardDeck>
                {this.props.ownedGuns.map(gun => <Gun gunObj={gun} key={gun.id}> <button> X </button></Gun> )}
            </CardDeck>
                
            </div>
        )
    }
}

export default Account