import React from 'react'
import BallisticsCalculator from './BallisticsCalculator'


class ContentContainer extends React.Component {
    constructor(){
        super()
        this.state = {
            bulletType: [],
            guns: []
        }
    }

    componentDidMount(){
        this.fetchBulletType()
        this.fetchGuns()
    }

    fetchGuns = () => {
        fetch('http://localhost:3000/guns')
        .then(res => res.json())
        .then(allGunsData => this.setState ({guns: allGunsData}))
    }

    fetchBulletType = () => {
        fetch("http://localhost:3000/bullet_types").then(res => res.json()).then(bulletTypeData => this.setState({
            bulletType: bulletTypeData
        }))
    }

    render(){
        return(
            <div>Hello World
                <BallisticsCalculator guns={this.state.guns} bulletType={this.state.bulletType}/>
            </div>
        )
    }
}

export default ContentContainer