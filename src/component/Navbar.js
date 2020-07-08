import React from 'react'
import Modal from "react-bootstrap/Modal"
import {Link} from 'react-router-dom'



class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      login: false,
      username: '',
      password: ''
    }
  }

  clickLogin = (e) => {
    
    this.setState({
      login: !this.state.login
    })

    
  }

  login = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      if(data.error){
        alert(data.message)
      } else {
        console.log(data)
        this.props.currentUser(data.user_data, data.user_guns, data.user_owned_guns)
        //used to be data.user_data
      }
    })
    .then(() => this.setState({login: false, username: '', password: ''}))
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {this.state.login ? 
          <Modal show={this.state.login} onHide={this.clickLogin} >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {/* <p>Modal body text goes here.</p> */}
              <form onSubmit={this.login}>
                <label>
                Username
                <br/>
                <input type="text" name="username" value={this.state.value} onChange={this.handleChange} />
                
                </label>
                <br/>
                <label>
                Password
                <br/>
                <input type="password" name="password" value={this.state.value} onChange={this.handleChange} />
                </label>
                <br/>

                <input type="submit" value="Login" />
              </form>
            </Modal.Body>

            {/* <Modal.Footer>
              <button variant="secondary" onClick={this.clickLogin}>Close</button>
              <button variant="primary">Save changes</button>
            </Modal.Footer> */}
          </Modal>
        :
        <div></div>
        }
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item" >
            <Link to="/">
              <div className="nav-link">Home</div>
            </Link>
            </li>
            <li className="nav-item">
              <Link to="/">
                <div className="nav-link" onClick={this.clickLogin}>Login</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/account">
                <div className="nav-link" href="#">Account</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/calculator">
                <div className="nav-link">Ballistics Calculator</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mini_game">
                <div className="nav-link" >Mini Game</div>
              </Link>            
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