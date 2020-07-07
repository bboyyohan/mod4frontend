import React from 'react'
import Card from "react-bootstrap/Card"
import CardDeck from "react-bootstrap/CardDeck"
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';

class Guns extends React.Component {

    // state = {
    //     filteredGuns: []
    // }

    // filteredGuns = (e) => {
        
    //     this.setState({filteredGuns: [this.state.filteredGuns]})
        
    // }

        handleClick = (delGun) => {
            // debugger
            // this.props.removeGun(delGun)
            // console.log(delGun)
            this.props.deleteGuns(delGun)

        }


    render() {
        // debugger
        
        return(
            
            <Card style={{ width: '18rem' }} >
                <Card.Img variant="top" src={this.props.gunObj.image} />
                <Card.Body>
                <Card.Title>{this.props.gunObj.name}</Card.Title>
                    {/* <Card.Text variant='bottom'>
                    
                    </Card.Text> */}
                
                    <Card.Footer className='footer'>
                        <small className="text-muted">{this.props.gunObj.barrel_length} inch barrel length</small>
                        {/* <button onClick={this.handleClick} value={this.props.gunObj.name}> X </button> */}
                        <button onClick={() => this.handleClick(this.props.gunObj.id)} > X </button>

                    </Card.Footer>
                </Card.Body>
            </Card>
            
        )
    }
}

export default Guns