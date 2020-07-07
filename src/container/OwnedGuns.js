import React from 'react'

class OwnedGuns extends React.Component {
    render() {
        return(
            <div>Your Guns{this.props.ownedGunObj.gun_id}</div>
        )
    }
}

export default OwnedGuns