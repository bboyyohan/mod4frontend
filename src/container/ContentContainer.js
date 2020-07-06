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
            <div>
                <BallisticsCalculator guns={this.state.gunsByCalibre} bulletType={this.state.bulletType} calibreGuns={this.calibreGuns}/>
            </div>
        )
    }
}

export default ContentContainer