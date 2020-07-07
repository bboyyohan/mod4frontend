import React from 'react'
import CanvasDraw from "react-canvas-draw";

class GraphicDisplay extends React.Component {

    state ={
        brushRadius: 3,
        lazyRadius: 0
    }

    render(){
        return(
            <div> GraphicDisplay
               <CanvasDraw lazyRadius={this.state.lazyRadius} brushRadius={this.state.brushRadius} onChange={() => console.log("onChange")} />
            </div>

        )
    }
}

GraphicDisplay.defaultProps = {
    onChange: null,
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 400,
    canvasHeight: 400,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false
  };

export default GraphicDisplay