import React from 'react'
import CalculationFields from '../container/CalculationFields'
import GraphicDisplay from '../container/GraphicDisplay'

class Calibre extends React.Component {

    render(){
        return(
            
            <option value={parseFloat(this.props.bulletObj.calibre)}> {parseFloat(this.props.bulletObj.calibre)} </option>
               
              
        
        

        )
    }
}

export default Calibre