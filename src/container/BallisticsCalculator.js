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
            calibre: ""
        }
    }

    


    render(){
        return(
            <div> 
                <label> Calibre (numeric values only)
                    <br/>
                <select >
                    {this.props.bulletType.map(bullet => <Calibre calibreGuns={this.props.calibreGuns} bulletObj={bullet} key={bullet.id} />)}
                </select>
                </label>


                 <form>

                         <input placeholder='Weight' value={this.props.bulletType.weight}/>
                         <input type="Submit" value="Submit Calculations"/>
                 </form>
            </div>

        )
    }
}

export default BallisticsCalculator