import React from 'react'

class Dot extends React.Component {
    state = {
        styles: {
            top: 0,
            left: 0,
            tintColor: null,
            height: 0,
            width: 0
        }
    }

    componentDidMount(){
        this.setState({
            styles: {
                top: this.props.y,
                left: this.props.x,
                tintColor: "red",
                height: 30,
                width: 30
            }
        })
    }
    render(){
        return(
            <div>
                {/* <img style={this.state.styles} src={this.props.img}/> */}
            </div>
        )
    }
}

export default Dot