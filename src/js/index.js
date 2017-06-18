import '../scss/index.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DemoDashboard from './components/DemoDashboard';

class Main extends Component {
  render() {
    return (
      <DemoDashboard />
    );
  }
};

let element = document.getElementById('content');
ReactDOM.render(React.createElement(Main), element);

document.body.classList.remove('loading');
