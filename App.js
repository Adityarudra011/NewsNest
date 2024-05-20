import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 6;

  state  ={
    progess: 0,
  }
  setProgress = (progress)=>{
    this.setState({progess: progress})
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
          color='#FFFF00'
          progress={this.state.progess}/>
        <Routes>
          <Route  exact path ="/" element={<News setProgress = {this.setProgress} key='general' pageSize={this.pageSize} country="in" category="General"/>}/> 
          <Route exact path="/business"  element={<News setProgress = {this.setProgress} key='business'pageSize={this.pageSize} country="in" category="Business"/>} />
          <Route exact path="/health"  element={<News setProgress = {this.setProgress} key='health' pageSize={this.pageSize} country="in" category="Health"/>} />
          <Route exact path="/science"  element={<News setProgress = {this.setProgress} key='science' pageSize={this.pageSize} country="in" category="Science"/>} />
          <Route exact path="/technology"  element={<News setProgress = {this.setProgress} key='technology' pageSize={this.pageSize} country="in" category="Technology"/>} />
          <Route exact path="/sports" element={<News setProgress = {this.setProgress} key='sports' pageSize={this.pageSize} country="in" category="Sports"/>} />
        </Routes>
        </Router>
      </div>
    )
  }
}
