import React from 'react'
import Calibre from './Calibre'

class BallisticsCalculator extends React.Component {
    render(){
        return(
            <div> 
                <select>
                    {this.props.bulletType.map(bullet => <option value={bullet.calibre}>{bullet.calibre}</option>)}
                </select>

                <form>

                        <input placeholder='Weight' value={this.props.bulletType.weight}/>
                        <input type="Submit" value="Submit Calculations"/>
                </form>
            </div>

        )
    }
}

export default BallisticsCalculator