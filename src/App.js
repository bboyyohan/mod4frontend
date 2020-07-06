import React from 'react';
import './App.css';
import Navbar from './component/Navbar'
import ContentContainer from './container/ContentContainer'
import {Route, Switch} from 'react-router-dom'
import Home from './component/Home'



class App extends React.Component{
  render() {
    return(
      <div>

        <Navbar />
        <ContentContainer />
        {/* // <ContentContainer /> */}
      </div>
    )
  }
}

export default App;
