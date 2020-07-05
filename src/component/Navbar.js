import React from 'react'
import Modal from "react-bootstrap/Modal"


class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      login: false 
    }
  }

  clickLogin = () => {
    this.setState({
      login: !this.state.login
    })

    
  }

  render() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item" onClick={this.clickLogin}>
              <a className="nav-link" href="#">Login 
                {/* <span className="sr-only"> */}
                  {this.state.login ? 
                    <Modal show={this.state.login}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <p>Modal body text goes here.</p>
                      </Modal.Body>

                      <Modal.Footer>
                        <button variant="secondary">Close</button>
                        <button variant="primary">Save changes</button>
                      </Modal.Footer>
                    </Modal>
                  :
                  <div></div>
                  }
                  {/* </span> */}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Ballistics Calculator</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Owned Guns</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">All Guns</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    )
  }
}

export default Navbar