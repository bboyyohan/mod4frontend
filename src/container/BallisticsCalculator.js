import React from 'react';
import Calibre from '../component/Calibre';
import GraphicDisplay from './GraphicDisplay'
import * as rho from '@mariuspopovici/rho';
import * as integrate from 'integrate-adaptive-simpson';
import * as nr from 'newton-raphson-method';
import MiniGame from '../component/MiniGame'

class BallisticsCalculator extends React.Component {
    // Units are in metric
    // calculations originally from npm package 'projectile-motion-with-air-resistance'
    // add these in (temp, dewPoint, altitude, initialHeight)
    calculations = (e) => {
        // e.preventDefault()
        // // debugger
        // this.setState({
        //     calibre: (this.state.calibre / 1000), // meters 
        //     bulletWeight: (this.state.weight / 15432), // kg
        //     muzzleVelocity: (this.state.muzzleVelocity / 3.281), // m/s
        //     // barrelLength: this.state.barrelLength,
        //     // ballisticCoefficient: 0,
        //     dragCoefficient: 0.5, //
        //     // windMPH: this.state.windMPH,
        //     // windMPS: this.state.windMPS,
        //     // windDirection: this.state.windDirection,
        //     // selectedOption: "option1",
        //     shootingAngle: ((this.state.shootingAngle) * Math.PI / 180), // radians 1° × π/180 = 0.01745rad
        //     //shootingRange: 0
        //     temp: (((this.state.temp - 32)) * 5/9), // celcius (70°F − 32) × 5/9 = 21.111°C
        //     dewPoint: (((this.state.dewPoint - 32)) * 5/9), // celcius
        //     initialHeight: (this.state.initialHeight /  3.281), // meters; this can also be used for drop on the minigame
        //     altitude: (this.state.altitude /  3.281) // meters 
        //     // maximumHeight: 0, 
        //     // horizontalRange: 0, 
        //     // timeOfFlight: 0 

        // })
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
    //Was there supposed to be a number between 'return' and '-' on line 57
    // added u_s 
      const t_s = (Q) => {
        return -1 * integrate(f_t, Q_0, Q) / Math.sqrt(gravity * airDensityConstants);
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
    

    //   return { maximumHeight, horizontalRange, timeOfFlight };
    // console.log(timeof)
      this.setState({maximumHeight: maximumHeight, horizontalRange: horizontalRange, timeOfFlight: timeOfFlight})
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
            // ballisticCoefficient: 0,
            dragCoefficient: 0,
            windMPH: 0,
            windMPS: 0,
            windDirection: '',
            selectedOption: "option1",
            shootingAngle: 0, // radians 1° × π/180 = 0.01745rad
            //shootingRange: 0
            temp: 0, // celcius (70°F − 32) × 5/9 = 21.111°C
            dewPoint: 0, // celcius
            initialHeight: 0, // meters; this can also be used for drop on the minigame
            altitude: 0, // meters 
            maximumHeight: 0, 
            horizontalRange: 0, 
            timeOfFlight: 0 
        }
    }

    selectHandler = (e) => {
        // debugger
        this.setState({
            calibre: parseFloat(e.target.value)
        })
        // debugger
        this.props.calibreGuns(e.target.value)
        let specificBullet = this.props.bulletType.filter(bullet => bullet.calibre === parseFloat(e.target.value))
        this.setMyState(specificBullet)
        
    }

    setMyState = (specificBullet) => {
        // debugger
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
        // debugger
        this.setState({
            [e.target.name]: parseFloat(e.target.value)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // debugger
        this.setState({
            calibre: (this.state.calibre / 1000), // meters 
            bulletWeight: (this.state.weight / 15432), // kg
            muzzleVelocity: (this.state.muzzleVelocity / 3.281), // m/s
            // barrelLength: this.state.barrelLength,
            // ballisticCoefficient: 0,
            dragCoefficient: (this.state.dragCoefficient * 0.000703069), //
            // windMPH: this.state.windMPH,
            // windMPS: this.state.windMPS,
            // windDirection: this.state.windDirection,
            // selectedOption: "option1",
            shootingAngle: ((this.state.shootingAngle) * Math.PI / 180), // radians 1° × π/180 = 0.01745rad
            //shootingRange: 0
            temp: (((this.state.temp - 32)) * 5/9), // celcius (70°F − 32) × 5/9 = 21.111°C
            dewPoint: (((this.state.dewPoint - 32)) * 5/9), // celcius
            initialHeight: (this.state.initialHeight /  3.281), // meters; this can also be used for drop on the minigame
            altitude: (this.state.altitude /  3.281) // meters 
            // maximumHeight: 0, 
            // horizontalRange: 0, 
            // timeOfFlight: 0 

        })
        this.calculations()
    }

   

    //added handlesubmit instead of this.calculations

    render(){
        return(
            <div> 
                <form onSubmit={this.handleSubmit}> 
                    <label> Calibre (numeric values only):
                        <br/>
                    <select onChange={this.selectHandler} type="number"> 
                        <option>Choose a bullet type</option>
                        {this.props.bulletType.map(bullet => <Calibre bulletObj={bullet} key={bullet.id}/>)}
                    </select>
                    </label>


                    <br/>
                    <label>Weight:
                        <br/>
                        <input placeholder='Weight' name='bulletWeight' type="number" set="any" onChange={this.changeHandler} value={this.state.bulletWeight}/>
                    </label>
                    <br/>
                    <label>Muzzle Velocity:
                        <br/>
                        <input placeholder='Muzzle Velocity' name='muzzleVelocity' type="number" set="any" onChange={this.changeHandler} value={this.state.muzzleVelocity}/>
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
                        <input placeholder='Barrel Length' name='barrelLength' type="number" set="any" onChange={this.changeHandler} value={this.state.barrelLength}/>
                    </div>
                    :
                    <div></div>
                    }

                    <br/>

                    <h3> Ammunition </h3>
                    
                    {/* <label>Ballistic Coefficient:
                        <br/>
                        <input placeholder='Ballistic Coefficient' name='ballisticCoefficient' onChange={this.changeHandler} value={this.state.ballisticCoefficient}/>
                    </label>
                    <br/> */}

                    <label>Drag Coefficient:
                        <br/>
                        <input placeholder='Drag Coefficient' name='dragCoefficient' type="number" set="any" onChange={this.changeHandler} value={this.state.dragCoefficient}/>
                    </label>

                    
                    <h3> Environment</h3>
                    <div className="form-check">
                        <label>Wind:
                            <br/>
                            <input placeholder='Wind mph' name='windMPH' type="number" set="any" onChange={this.changeHandler} value={this.state.windMPH}/>
                            <br/>
                            <input placeholder='Wind m/s' name='windMPS' type="number" set="any" onChange={this.changeHandler} value={this.state.windMPS}/>
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
                        <br/>
                        <label>Temp:
                            <br/>
                                <input placeholder='Temperature in Fahrenheit' name='temp' type="number" set="any" onChange={this.changeHandler} value={this.state.temp}/>
                            <br/>
                        </label>
                        <br/>
                        <label>Dew Point:
                            <br/>
                                <input placeholder='Dew Point Temperature in Fahrenheit' name='dewPoint' type="number" set="any" onChange={this.changeHandler} value={this.state.dewPoint}/>
                            <br/>
                        </label>
                        <br/>
                        <label>Initial Height:
                            <br/>
                                <input placeholder='Initial Height' name='initialHeight' type="number" set="any" onChange={this.changeHandler} value={this.state.initialHeight}/>
                            <br/>
                        </label>
                        <br/>
                        <label>Altitude:
                            <br/>
                                <input placeholder='Altitude' name='altitude' type="number" set="any" onChange={this.changeHandler} value={this.state.altitude}/>
                            <br/>
                        </label>
                    </div>
                
                    <br/>

                    <h3> Fire Arm </h3>
                    <br/>
                    <label> Shooting Angle: </label>
                    <br/>
                        <input placeholder='Shooting Angle' name='shootingAngle' type="number" set="any" onChange={this.changeHandler} value={this.state.shootingAngle}/>
                    <br/>

                    

                    <input type="Submit" value="Submit Calculations"/>

                </form>
                <p>
                    Your Maximum Height for the Trajectory: {this.state.maximumHeight * 3.281} ft.
                    Your Horizontal Range for the Trajectory: {this.state.horizontalRange * 3.281 / 3} yds.
                    Your Time of Flight for the Trajectory: {this.state.timeOfFlight} sec.
                    Direction wind flows (negative is left, positive is right) with distance: {this.state.windMPS * 39.37} inches.
                    Amount of inches (negative is left, positive is right) the projectile travelled overall.: {this.state.windMPS * 39.37 * this.state.timeOfFlight} inches.
                </p>
                {/* <GraphicDisplay/> */}
                <MiniGame windspeed={this.state.windMPS} />
            </div>

        )
    }
}

export default BallisticsCalculator
