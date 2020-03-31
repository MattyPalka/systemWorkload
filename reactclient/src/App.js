import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socket from './utilities/socketConnection'
import Widget from './Widget'

class App extends Component {
  constructor() {
    super()
    this.state = {
      performanceData: {}
    }
  }

  componentDidMount() {
    socket.on('data', (data) => {
      // some new data received
      // make a copy of current state in order top mutate it
      const currentState = ({ ...this.state.performanceData })
      // make it an object with macAddress to quickly find it
      currentState[data.macAddress] = data
      this.setState({
        performanceData: currentState
      })
    })
  }

  render() {
    let widgets = []
    const data = this.state.performanceData
    //grab each machine property from data 
    Object.entries(data).forEach(([key, value]) => {
      widgets.push(<Widget key={key} data={value} />)
    })
    return (
      <div className="App">
        {widgets}
      </div>
    )
  }
}

export default App;
