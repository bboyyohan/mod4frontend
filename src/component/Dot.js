import React from 'react'

class Dot extends React.Component {
    // state = {
    //     styles: {
    //         position: 'absolute',
    //         top: 0 + 'px',
    //         left: 0+ 'px',
    //         tintColor: null,
    //         height: 0,
    //         width: 0,
    //         zIndex: 0
    //     }
    // }

    // componentDidMount(){
    //     this.setState({
    //         styles: {
    //             position: 'absolute',
    //             top: this.props.y + 'px',
    //             right: this.props.x + 'px',
    //             tintColor: "red",
    //             height: 30,
    //             width: 30,
    //             zIndex: 2
    //         }
    //     })
    // }
    render(){
        return(
            <div>
                <img className='image-hole'/>
            </div>
        )
    }
}

export default Dot