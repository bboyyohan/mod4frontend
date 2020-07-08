import React from 'react'
import img1 from '../img/1.jpg'
import img2 from '../img/2.jpg'
import img3 from '../img/3.jpg'
import img4 from '../img/4.jpg'




class MiniGame extends React.Component {
    // n =.5

    calc = (e) => {
        console.log(e.clientX, e.clientY)
        const g = 41.67 //  ((ft^.5)/s)
        const n = .5
        const fo = 0
        let drop = (((g / this.state.initialVel) / (( 1 / this.state.projectileHorizontalRange ) - (1/(fo - (.75 + .00006 * this.state.projectileHorizontalRange) * n * this.state.projectileHorizontalRange)))))
        this.setState({
            projectileDrop: drop

        })
        console.log(e.clientY + 60 * drop)
    }


    state = {
        initialVel: 2000,
        projectileHorizontalRange: 400,
        projectileDrop: 0
        
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

        console.log(canvas)

            
        
        return(
            <div>
                <canvas ref="canvas" width={600} height={600} /> <img onClick={this.calc} ref="image" width={630} height={630} src={canvas} className="hidden" />
            </div>
        )
    }
}

export default MiniGame