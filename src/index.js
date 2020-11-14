import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";

//var element =  React.createElement('h1', { className: 'greating'}, 'Hello World!');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
