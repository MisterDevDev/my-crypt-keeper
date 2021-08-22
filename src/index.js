import React from 'react';
import { render } from 'react-dom';
import App from './app';
import {Router} from 'react-router-dom'
import {createMemoryHistory, createBrowserHistory} from 'history'

const history =
  process.env.NODE_ENV === 'test'
    ? createMemoryHistory()
    : createBrowserHistory()

const app = document.querySelector('#app');

render(
    <Router history={history}>
       <App />
    </Router>,
    document.getElementById('app')
)   
