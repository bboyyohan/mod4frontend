import React from 'react'
import BallisticsCalculator from './BallisticsCalculator'


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
        .then(allGunsData => this.setState({guns: allGunsData}))
    }

    fetchBulletType = () => {
        fetch("http://localhost:3000/bullet_types").then(res => res.json()).then(bulletTypeData => this.setState({
            bulletType: bulletTypeData
        }))
    }

    calibreGuns = (calibre) => {
        let filteredBulletArray = this.state.bulletType.filter(bulletType => bulletType.calibre === calibre)
        return this.state.guns.filter(gun => gun.bullet_type_id === filteredBulletArray.id)
    }

    render(){
        return(
            <div>
                <BallisticsCalculator guns={this.calibreGuns()} bulletType={this.state.bulletType} calibreGuns={this.calibreGuns}/>
            </div>
        )
    }
}

export default ContentContainer