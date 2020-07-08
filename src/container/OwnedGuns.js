import React from 'react'
import Card from "react-bootstrap/Card"
import CardDeck from "react-bootstrap/CardDeck"

class OwnedGuns extends React.Component {
   
    
    render() {
        let filteredGuns = this.props.allGuns.filter(gun => gun.id === this.props.ownedGunObj.gun_id)
        return(
            <div>Your Guns 
                
                
            </div>

           
        )
    }
}

export default OwnedGuns

