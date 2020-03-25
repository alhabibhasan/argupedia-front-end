import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import 'bootstrap/dist/css/bootstrap.min.css';


const alertConfig = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.FADE
}

const AlertTemplate = ({ style, options, message, close }) => (
    <div style={style}>
      {message}
    </div>
  )

const Root = () => (
    <AlertProvider template={AlertTemplate} {...alertConfig}>
      <App />
    </AlertProvider>
  )

ReactDOM.render(<Root/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (process.env.NODE_ENV !== 'production') {
  let axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}