import React from 'react'
import img1 from '../img/1.jpg'
import img2 from '../img/2.jpg'
import img3 from '../img/3.jpg'
import img4 from '../img/4.jpg'
import Dot from './Dot'




class MiniGame extends React.Component {

    calc = (e) => {
        console.log(e.clientX, e.clientY)
        const g = 41.67 //  ((ft^.5)/s)
        const n = .5
        const fo = 0
        let drop = (((g / this.state.initialVel) / (( 1 / this.state.projectileHorizontalRange ) - (1/(fo - (.75 + .00006 * this.state.projectileHorizontalRange) * n * this.state.projectileHorizontalRange)))))
        this.setState({
            // projectileDrop: drop
            // trajectoryDropY: e.clientY + 60 * drop,                             //  300px   -    60  *   105.6   in/s          *          18,000       inches               /       24000 inches/s
            // {this.state.confirmedWindDirection === 'windLeft' ? trajectoryDropX: (e.clientX) - 60 * (this.state.windMPH * 17.6/* inches/second*/) * ((this.state.projectileHorizontalRange * 36/* range from yards to inches*/) / (this.state.initialVel * 12 /*inches per second*/))) :},
            // draw: [...this.state.draw, true]                                            
                                                                             


        })
        
        // console.log(e.clientY + 60 * drop)
    }

    // windSpeed = (e) => {
    //     this.setState({confirmedWindDirection: e.target.name, selectedOption: e.target.value})
    //     if (e.target.name === 'windLeft'){
    //         this.setState({trajectoryDropX: -this.state.windMPH * 17.6})
    //     } else if (e.target.name === 'windRight'){
    //         this.setState({trajectoryDropX: this.state.windMPH * 17.6})
    //     }
    // }

    state = {
        initialVel: 2000,
        projectileHorizontalRange: 400,
        // projectileDrop: 0,
        trajectoryDropX: null,
        trajectoryDropY: null,
        draw: [],
        windMPH: Math.floor(Math.random() * (40 - 0 + 1)) + 0,
        windDirection: ['windLeft', 'windRight'],
        confirmedWindDirection: '',
        selectedOption: 'option1',
        dot: "",
        
    }


    
    componentDidMount() {
        // debugger
        const canvas = this.refs.canvas
        let ctx = canvas.getContext("2d")
        let img = this.refs.image
        // debugger
        img.onload = () => {
          ctx.drawImage(img, 0, 0)
          ctx.font = "40px Courier"
          ctx.fillText(this.state.dot, 210, 75)
        }
        // debugger
    }

    
    drawDot = (e) => {
        // console.log(e)
        // debugger
        let x = e.clientX
        let y = e.clientY
        let can = e.target
        let cntxt = can.getContext("2d")
        // debugger
        cntxt.font = "40px Courier"
        cntxt.fillText(".", x, y)


    }
      
    changeHandler = (e) => {
        // debugger
        this.setState({
            [e.target.name]: parseFloat(e.target.value)
        })
    }


    render() {
        // console.log(this.state.trajectoryDropX)
        // let canvas = ""
        // if (this.state.projectileHorizontalRange === 100 || this.state.projectileHorizontalRange === 200) {
        //     canvas = img1
        // } else if (this.state.projectileHorizontalRange === 300) {
        //     canvas = img2
        // } else if (this.state.projectileHorizontalRange === 400) {
        //     canvas = img3
        // } else {
        //     canvas = img4
        // }

        
        
        return(
            <div>
                           <canvas ref="canvas" width={640} height={425} onClick={this.drawDot}/>
                            <img ref="image" src={img1} className="hidden" />
  
            </div>
        )
    }
}

export default MiniGame