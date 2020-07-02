import React from 'react'
import CalculationFields from './CalculationFields'
import GraphicDisplay from './GraphicDisplay'

class Calibre extends React.Component {
    render(){
        return(
            <div> Calibre
                <CalculationFields />
                <GraphicDisplay />
            </div>

        )
    }
}

export default Calibre