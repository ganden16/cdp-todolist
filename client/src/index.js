import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Provider} from 'react-redux'
import store from './store'

let token = Cookies.get('token')
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);