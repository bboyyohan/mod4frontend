import React from 'react'
import img1 from '../img/1.jpg'
import img2 from '../img/2.jpg'
import img3 from '../img/3.jpg'
import img4 from '../img/4.jpg'
import Dot from './Dot'



// each grid diff 


class MiniGame extends React.Component {

    calc = (e) => {
        const g = 41.67 //  ((ft^.5)/s)
        const n = .5
        const fo = 0
        
        //starting muzzle vel * distance 
        // distance travleled / muzzle vel = time spent in air
        // then calculate how much that bullet shoulda moved to left or right, mult that number by
        // the speed of the air flow. then mult that by pixel (60). - / + depends on what we doing

        // we mult by 3 to convert yards to ft , travel time is at ft atm         
        let travelTime = ((3 * this.state.projectileHorizontalRange) / ((this.state.initialVel)))


        // convert mph to f/s... mi * 1.467, take travelTime * 1.467 * 6 * 60(pixel) * 12 = inches we traveled 
        let inchesTraveled = travelTime * 1.467 * 6 * 120 * 12 

        this.state.projectileHorizontalRange === 100 || this.state.projectileHorizontalRange === 200 ? inchesTraveled = travelTime * 1.467 * 6 * 120 * 12 : inchesTraveled = travelTime * 1.467 * 6 * 60 * 12

        // let drop = (((g / this.state.initialVel) / (( 1 / this.state.projectileHorizontalRange ) - (1/(fo - (.75 + .00006 * this.state.projectileHorizontalRange) * n * this.state.projectileHorizontalRange)))))
        let drop = (((g / this.state.initialVel) / (( 1 / this.state.projectileHorizontalRange ) - ( 1 / (fo - (3 * n * (this.state.projectileHorizontalRange ))) / 4))))
        // windmovement is.... 

        let windMovement = 0
         this.state.confirmedWindDirection === 'windLeft' ?  windMovement = e.clientX - inchesTraveled  : windMovement = e.clientX + inchesTraveled
        //{this.state.confirmedWindDirection === 'windLeft' ? this.setState({trajectoryDropX: (e.clientX) - 60 * (this.state.windMPH * 17.6/* inches/second*/) * ((this.state.projectileHorizontalRange * 36/* range from yards to inches*/) / (this.state.initialVel * 12 /*inches per second*/))}) : this.setState({trajectoryDropX: (e.clientX) + 60 * (this.state.windMPH * 17.6/* inches/second*/) * ((this.state.projectileHorizontalRange * 36/* range from yards to inches*/) / (this.state.initialVel * 12 /*inches per second*/))})}
        this.setState({
            // projectileDrop: drop
            trajectoryDropY: e.clientY + 60 * drop,                             //  300px   -    60  *   105.6   in/s          *          18,000       inches               /       24000 inches/s
            trajectoryDropX: windMovement
            //{this.state.confirmedWindDirection === 'windLeft' ? trajectoryDropX: (e.clientX) - 60 * (this.state.windMPH * 17.6/* inches/second*/) * ((this.state.projectileHorizontalRange * 36/* range from yards to inches*/) / (this.state.initialVel * 12 /*inches per second*/)) : (e.clientX) - 60 * (this.state.windMPH * 17.6/* inches/second*/) * ((this.state.projectileHorizontalRange * 36/* range from yards to inches*/) / (this.state.initialVel * 12 /*inches per second*/))}
            // draw: [...this.state.draw, true]                                            
                                                                             
        // fo -3(n * r)) / 4)

        })
        this.drawDot(e)
        this.state.projectileHorizontalRange === 100 || this.state.projectileHorizontalRange === 200 ? console.log(inchesTraveled / 120) : console.log(inchesTraveled / 60)
        debugger
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
        initialVel: 3239,
        distanceArray: [100, 200, 300, 400, 500],
        projectileHorizontalRange: [],

        // projectileDrop: 0,
        // trajectoryDropX: 315, //had this before trying windspeed
        trajectoryDropX: 0,
        trajectoryDropY: 0,
        draw: [],
        // windMPH: Math.floor(Math.random() * (9 - 0 + 1)) + 0,
        windMPH: 30,
        // 9 mph, takes max amount and min 
        windDirection: ['windLeft', 'windRight'],
        confirmedWindDirection: "",
        selectedOption: 'option1'
        
    }


    
    componentDidMount() {
        // 
        this.setState({ projectileHorizontalRange: this.state.distanceArray[Math.floor(Math.random() * this.state.distanceArray.length)],
            confirmedWindDirection: this.state.windDirection[Math.floor(Math.random() * this.state.windDirection.length)]
        })
        const canvas = this.refs.canvas
        let ctx = canvas.getContext("2d")
        let img = this.refs.image
        // 
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 630, 630)
          ctx.font = "40px Courier"
        //   ctx.fillText("this.state.dot", 210, 75)
        }
        // 
    }

    
    drawDot = (e) => {
        // 
        
        let can = e.target
        let cntxt = can.getContext("2d")
        // 
        cntxt.font = "40px Courier"
        cntxt.fillText(".", (e.clientX - 12), this.state.trajectoryDropY)
        // cntxt.fillText(".", (e.clientX - 12), (e.clientY - 54))
        

    }
      
    changeHandler = (e) => {
        // 
        this.setState({
            [e.target.name]: parseFloat(e.target.value)
        })
    }


    render() {
        let canvas = ""
        if (this.state.projectileHorizontalRange === 100 || this.state.projectileHorizontalRange === 200) {
            canvas = img1
        } else if (this.state.projectileHorizontalRange === 300) {
            canvas = img2
        } else if (this.state.projectileHorizontalRange === 400) {
            canvas = img3
        } else {
            canvas = img4
        }

        
        
        return(
            <div>
                           <canvas ref="canvas" width={630} height={630} onClick={this.calc}/>
                            <img ref="image" src={canvas} className="hidden" />
  
            </div>
        )
    }
}

export default MiniGame