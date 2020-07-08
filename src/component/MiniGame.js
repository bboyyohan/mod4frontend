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

    windSpeed = (e) => {
        this.setState({confirmedWindDirection: e.target.name, selectedOption: e.target.value})
        if (e.target.name === 'windLeft'){
            this.setState({trajectoryDropX: -this.state.windMPH * 17.6})
        } else if (e.target.name === 'windRight'){
            this.setState({trajectoryDropX: this.state.windMPH * 17.6})
        }
    }

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
        selectedOption: 'option1'
        
    }


    
    componentDidMount() {
        this.setState({confirmedWindDirection: this.state.windDirection[Math.floor(Math.random() * this.state.windDirection.length)]})
    }
    


    changeHandler = (e) => {
        // debugger
        this.setState({
            [e.target.name]: parseFloat(e.target.value)
        })
    }


    render() {
        console.log(this.state.trajectoryDropX)
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
                <canvas ref="canvas" width={600} height={600} />
                {/* <img ref="image" src={img4} className="hidden" /> */}
                <img onClick={this.calc} ref='image' width={630} height={630} src={canvas} className="hidden" /> 
                {this.state.draw.map(image => <img className='image-hole'/>)}
            
                <label>Wind:
                    <br/>
                    <input placeholder='Wind mph' name='windMPH' type="number" set="any" onChange={this.changeHandler} value={this.state.windMPH}/>
                    <br/>
                    <input placeholder='Wind m/s' name='trajectoryDropX' type="number" set="any" onChange={this.changeHandler} value={this.state.trajectoryDropX}/>
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
               
            </div>
        )
    }
}

export default MiniGame