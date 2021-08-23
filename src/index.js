import React from 'react';
import { render } from 'react-dom';
import App from './app';
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import history from './history'


const app = document.querySelector('#app');

render(
    <Provider store={store}>
    <Router history={history}>
       <App />
    </Router>
    </Provider>,
    document.getElementById('app')
)   
