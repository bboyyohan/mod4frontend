import React from 'react'
import Gun from './Guns'
import OwnedGuns from './OwnedGuns'
class Account extends React.Component {
    state = {
        ownedGuns: []
    }

    componentDidMount(){
        this.getGuns()
    }

    getGuns = () => {
        fetch(`http://localhost:3000/user_owned_guns/${this.props.currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({ownedGuns: data})
        })
    }

    

    render(){
        
        let allGuns = this.props.allGuns.map(gun => gun)
        return(
            <div>
            <h1> This is your Username: {this.props.currentUser.username}</h1>



            <h1> All of the Guns: {this.state.guns.map(gun => <Gun gunObj={gun} key={gun.id} ownedGuns={this.ownedGuns}/>)}</h1>

            {/* <h1>All of the Guns you Own: {this.state.ownedGuns.map(gun => <Gun gunObj={gun} key={gun.id}/>)}</h1> */}
                
                
            </div>
        )
    }
}

export default Account