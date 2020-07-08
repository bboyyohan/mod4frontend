import React from 'react';
import Calibre from '../component/Calibre';
import GraphicDisplay from './GraphicDisplay'
import * as rho from '@mariuspopovici/rho';
import * as integrate from 'integrate-adaptive-simpson';
import * as nr from 'newton-raphson-method';

class BallisticsCalculator extends React.Component {
    // Units are in metric
    // calculations originally from npm package 'projectile-motion-with-air-resistance'
    // add these in (temp, dewPoint, altitude, initialHeight)
    calculations() {
      const gravity = 9.81;
      const crossSectionalArea = Math.pow(this.state.calibre / 2, 2) * Math.PI;
      const airDensity = this.airDensity(this.state.temp, this.state.dewPoint, this.state.altitude);
    
      // Initial position and launch velocity
      const x_0 = 0.0;
      const initialHorizontalVelocity = this.state.muzzleVelocity * Math.cos(this.state.shootingAngle); // horizontal velocity
      const y_0 = this.state.initialHeight;
      const initialVerticalVelocity = this.state.muzzleVelocity * Math.sin(this.state.shootingAngle); // vertical velocity
    
      // Constants and function definitions for solution
      const airDensityConstants = (0.5 * this.state.dragCoefficient * airDensity * crossSectionalArea) / this.state.bulletWeight;
      const Q_0 = Math.asinh(initialVerticalVelocity / initialHorizontalVelocity);
      const A =
        gravity / (airDensityConstants * initialHorizontalVelocity ** 2.0) +
        (Q_0 + 0.5 * Math.sinh(2.0 * Q_0));
    
      const lam = (Q) => {
        return A - (Q + 0.5 * Math.sinh(2.0 * Q));
      };
    
      const u_s = (Q) => {
        return Math.sqrt(gravity / airDensityConstants) / Math.sqrt(lam(Q));
      };
      const v_s = (Q) => {
        return (
          (Math.sqrt(gravity / airDensityConstants) * Math.sinh(Q)) /
          Math.sqrt(lam(Q))
        );
      };
      const f_t = (Q) => {
        // time function
        return Math.cosh(Q) / Math.sqrt(lam(Q));
      };
      const f_x = (Q) => {
        // x function
        return Math.cosh(Q) / lam(Q);
      };
      const f_y = (Q) => {
        // y function
        return Math.sinh(2.0 * Q) / lam(Q);
      };
    
      const t_s = (Q) => {
        return -integrate(f_t, Q_0, Q) / Math.sqrt(gravity * airDensityConstants);
      };
      const x_s = (Q) => {
        return x_0 - integrate(f_x, Q_0, Q) / airDensityConstants;
      };
      const y_s = (Q) => {
        return y_0 - integrate(f_y, Q_0, Q) / (2.0 * airDensityConstants);
      };
      const y_s_p = (Q) => {
        return (-(1.0 / (2.0 * airDensityConstants)) * Math.sinh(2.0 * Q)) / lam(Q);
      };
    
      // Time of flight
      const Q_T_est = Math.asinh(-initialVerticalVelocity / initialHorizontalVelocity); // Initial estimate for Newton's method
      const Q_T = nr(y_s, y_s_p, Q_T_est); //newton(y_s, Q_T_est, y_s_p);
      const timeOfFlight = t_s(Q_T);
    
      // Horizontal range
      const horizontalRange = x_s(Q_T);
    
      // Maximum height
      const maximumHeight = y_s(0.0);
    
      return { maximumHeight, horizontalRange, timeOfFlight };
    }

    airDensity(temp, dewPoint, altitude) {
        const seaLvlAirPressure = 1013; // unit is hPa
        return rho(temp, seaLvlAirPressure, dewPoint, 'metric', altitude);
    }

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
            calibre: 0, // meters
            bulletWeight: 0, // kg
            muzzleVelocity: 0, // m/s
            barrelLength: 0,
            ballisticCoefficient: 0,
            dragCoefficient: 0,
            windMPH: 0,
            windMPS: 0,
            windDirection: '',
            selectedOption: "option1",
            shootingAngle: 0, // radians
            shootingRange: 0,
            temp: 0, // celcius
            dewPoint: 0, // celcius
            initialHeight: 0, // meters; this can also be used for drop on the minigame
            altitude: 0 // meters
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
