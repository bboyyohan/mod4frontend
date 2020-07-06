import React from 'react'

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
        return(
            <div>
            <h1> This is your Username: {this.props.currentUser.username}</h1>

            <h1> Your list of Guns:</h1>
                
                
            </div>
        )
    }
}

export default Account