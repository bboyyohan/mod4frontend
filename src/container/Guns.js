import React from 'react'
import Card from "react-bootstrap/Card"
import CardDeck from "react-bootstrap/CardDeck"
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';

class Guns extends React.Component {



    render() {
        
        return(
            
            <Card style={{ width: '18rem' }} >
                <Card.Img variant="top" src={this.props.gunObj.image} />
                <Card.Body>
                <Card.Title>{this.props.gunObj.name}</Card.Title>
                    <Card.Footer className='footer'>
                        <small className="text-muted">{this.props.gunObj.barrel_length} inch barrel length</small>
                        {this.props.gunTrue ? <button onClick={() => this.props.addGuns(this.props.gunObj)} > ✓ </button> : <button onClick={() => this.props.deleteGuns(this.props.gunObj.id)} > X </button>}
                    </Card.Footer>
                </Card.Body>
            </Card>
            
        )
    }
}

export default Guns