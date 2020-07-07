import React from 'react'

class Guns extends React.Component {

    state = {
        filteredGuns: []
    }

    // filteredGuns = (e) => {
        
    //     this.setState({filteredGuns: [...this.state.filteredGuns, this.props.allGuns.filter(gun => this.props.gunObj.gun_id === gun.id)]})
    //     debugger
    // }

    ownedGuns = () => {
        setState
    }

    render() {
        
        
        return(
            // <button onClick={this.filteredGuns} value={this.state.filteredGuns}></button>
            <div> {this.props.gunObj.name} </div>
        )
    }
}

export default Guns