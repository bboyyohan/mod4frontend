import React from 'react'
import Calibre from '../component/Calibre'
import GraphicDisplay from './GraphicDisplay'
// import * as rho from '@mariuspopovici/rho'

class BallisticsCalculator extends React.Component {
    // Units are in metric
    /*
    calculations(initialMuzzleVelocity, initialHeight, angle) {
     // These calculations ignore air resistance
        const gravity = 9.81;
        const seconds = quadraticEquationPositive(gravity, Math.sin(angle)*initialMuzzleVelocity, initialHeight);
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
    windSpeed = (e) => {
        this.setState({windDirection: e.target.name, selectedOption: e.target.value})
        if (e.target.name === 'windLeft'){
            this.setState({windMPS: -this.state.windMPH / 2.237})
        } else if (e.target.name === 'windRight'){
            this.setState({windMPS: this.state.windMPH / 2.237})
        }
    }

    constructor() {
        super()
        this.state = {
            calibre: "",
            bulletWeight: 0,
            muzzleVelocity: 0,
            barrelLength: 0,
            ballisticCoefficient: 0,
            dragCoefficient: 0,
            windMPH: 0,
            windMPS: 0,
            windDirection: '',
            selectedOption: "option1",
            shootingAngle: 0,
            shootingRange: 0
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

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render(){
        return(
            <div> 
                <form>
                    <label> Calibre (numeric values only):
                        <br/>
                    <select onChange={this.selectHandler}>
                        <option>Choose a bullet type</option>
                        {this.props.bulletType.map(bullet => <Calibre bulletObj={bullet} key={bullet.id}/>)}
                    </select>
                    </label>


                    <br/>
                    <label>Weight:
                        <br/>
                        <input placeholder='Weight' name='bulletWeight' onChange={this.changeHandler} value={this.state.bulletWeight}/>
                    </label>
                    <br/>
                    <label>Muzzle Velocity:
                        <br/>
                        <input placeholder='Muzzle Velocity' name='muzzleVelocity' onChange={this.changeHandler} value={this.state.muzzleVelocity}/>
                    </label>
                    <br/>
                    {this.state.calibre 
                    ? 
                    <div>
                        <select onChange={this.handleGunChange}>
                            <option>Choose a gun</option>
                            {this.props.guns.map(gun => <option>{gun.name}</option>)}
                        </select>
                        <br/>
                        Barrel Length:
                        <br/>
                        <input placeholder='Barrel Length' name='barrelLength' onChange={this.changeHandler} value={this.state.barrelLength}/>
                    </div>
                    :
                    <div></div>
                    }

                    <br/>

                    <h3> Ammunition </h3>
                    
                    <label>Ballistic Coefficient:
                        <br/>
                        <input placeholder='Ballistic Coefficient' name='ballisticCoefficient' onChange={this.changeHandler} value={this.state.ballisticCoefficient}/>
                    </label>
                    <br/>

                    <label>Drag Coefficient:
                        <br/>
                        <input placeholder='Drag Coefficient' name='dragCoefficient' onChange={this.changeHandler} value={this.state.dragCoefficient}/>
                    </label>

                    
                    <h3> Environment</h3>
                    <div className="form-check">
                    <label>Wind:
                        <br/>
                        <input placeholder='Wind mph' name='windMPH' onChange={this.changeHandler} value={this.state.windMPH}/>
                        <br/>
                        <input placeholder='Wind m/s' name='windMPS' value={this.state.windMPS}/>
                        <br/>
                        <label> left </label>
                        <br/>
                        <input name='windLeft' type="radio" className="form-check-input" value="option1" checked={this.state.selectedOption === "option1"}
                               onClick={this.windSpeed}/>
                        <br/>
                        <label> right </label>
                        <br/>
                        <input name='windRight' type="radio" className="form-check-input" value="option2" checked={this.state.selectedOption === "option2"}
                               onClick={this.windSpeed}/>
                    </label>
                    </div>
                
                    <br/>

                    <h3> Fire Arm </h3>
                    <br/>
                    <label> Shooting Angle: </label>
                    <br/>
                        <input placeholder='Shooting Angle' name='shootingAngle' onChange={this.changeHandler} value={this.state.shootingAngle}/>
                    <br/>

                    <label> Shooting Range: </label>
                    <br/>
                        <input placeholder='Shooting Range' name='shootingRange' onChange={this.changeHandler} value={this.state.shootingRange}/>
                    <br/>

                    

                    <input type="Submit" value="Submit Calculations"/>

                </form>
                <GraphicDisplay/>
            </div>

        )
    }
}

export default BallisticsCalculator