import React from 'react'
import CalculationFields from './CalculationFields'
import GraphicDisplay from './GraphicDisplay'

class Calibre extends React.Component {

    render(){
        return(
            
            <option value={this.props.bulletObj.calibre}> {this.props.bulletObj.calibre} </option>
               
              
        
        

        )
    }
}

export default Calibre