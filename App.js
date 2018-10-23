import React, { Component } from 'react';
import axios from 'axios';
import Router from './src/Router';
import { baseURL } from './src/config';


export default class App extends Component {
  componentWillMount() {
    axios.defaults.baseURL = baseURL;
    axios.defaults.timeout = 4500;
  }

  render() {
    return (
      <Router />
    );
  }
}
