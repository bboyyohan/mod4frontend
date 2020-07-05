import React from 'react'
import CalculationFields from './CalculationFields'
import GraphicDisplay from './GraphicDisplay'

class Calibre extends React.Component {

    state = {
        calibre: ''
    }


    selectHandler = (e) => {
        this.setState({
            calibre: e.target.value
        })
        debugger
        this.props.calibreGuns(this.state.calibre)
        // debugger
    }

    render(){
        return(
            
            <option onSelect={this.selectHandler} value={this.props.bulletObj.calibre}> {this.props.bulletObj.calibre} </option>
               
              
        
        

        )
    }
}

export default Calibre