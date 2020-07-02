import React from 'react';
import './App.css';
import Navbar from './component/Navbar'
import ContentContainer from './container/ContentContainer'

class App extends React.Component{
  render() {
    return(
      <div>
        <Navbar />
        <ContentContainer />
      </div>
    )
  }
}

export default App;
