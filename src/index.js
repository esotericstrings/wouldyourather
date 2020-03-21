import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import reducer from './reducers';
import middleware from './middleware';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(reducer, middleware);
if(process.env.NODE_ENV !== 'production') {
  window.store = store;
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);