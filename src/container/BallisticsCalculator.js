import React from 'react'
import Calibre from './Calibre'
// import * as rho from '@mariuspopovici/rho'

class BallisticsCalculator extends React.Component {
    // Units are in metric
    /*
    calulations(initialMuzzleVelocity, initialHeight, angle) {
     // These calculations ignore air resistance
        const gravity = 9.81;
        const seconds = quadraticEquationPositive(gravity, Math.sin(angle)*initalMuzzleVelocity, initalHeight);
        const horizontalDistance = Math.cos(angle)*initialMuzzleVelocity;
        return horizontalDistance;
    }

    quadraticEquationPostive(a, b, c) {
        return (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    }

    airDensity(temp, dewPoint, altitude) {
        const seaLvlAirPressure = 1013; // unit is hPa
        return rho(temp, seaLvlAirPressure, dewPoint, 'metric', altitude);
    }
    */

    constructor() {
        super()
        this.state = {
            calibre: "",
            bulletWeight: 0,
            muzzleVelocity: 0,
            barrelLength: 0
        }
    }

    
    selectHandler = (e) => {
        this.setState({
            calibre: e.target.value
        })
        
        this.props.calibreGuns(e.target.value)
        let specificBullet = this.props.bulletType.filter(bullet => bullet.calibre === e.target.value)
        this.setMyState(specificBullet)
        
    }

    setMyState = (specificBullet) => {
        
        this.setState({
            calibre: specificBullet[0].calibre,
            bulletWeight: specificBullet[0].weight,
            muzzleVelocity: specificBullet[0].muzzle_velocity
        })
    }

    handleGunChange = (e) => {
        let specificGun = this.props.guns.filter(gun => gun.name === e.target.value)
        this.setState({
            barrelLength: specificGun[0].barrel_length
        })
    }


    render(){
        return(
            <div> 
                <form>
                    <label> Calibre (numeric values only)
                        <br/>
                    <select onChange={this.selectHandler}>
                        {this.props.bulletType.map(bullet => <Calibre bulletObj={bullet} key={bullet.id}/>)}
                    </select>
                    </label>


                    <br/>
                    <label>Weight:
                        <br/>
                        <input placeholder='Weight' name='bulletWeight' value={this.state.bulletWeight}/>
                    </label>
                    <br/>
                    <label>Muzzle Velocity:
                        <br/>
                        <input placeholder='Muzzle Velocity' name='muzzleVelocity' value={this.state.muzzleVelocity}/>
                    </label>
                    <br/>
                    {this.state.calibre 
                    ? 
                    <div>
                        <select onChange={this.handleGunChange}>
                            {this.props.guns.map(gun => <option>{gun.name}</option>)}
                        </select>
                        <br/>
                        Barrel Length:
                        <br/>
                        <input placeholder='Barrel Length' name='barrelLength' value={this.state.barrelLength}/>
                    </div>
                    :
                    <div></div>
                    }
                    
                    <input type="Submit" value="Submit Calculations"/>
                </form>
            </div>

        )
    }
}

export default BallisticsCalculator