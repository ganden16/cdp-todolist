import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Main from './pages/Main'
import AuthMiddleware from './middleware/AuthMiddleware'
import GuestMiddleware from './middleware/GuestMiddleware'

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/register' element={<GuestMiddleware><Register /></GuestMiddleware>} />
				<Route path='/login' element={<GuestMiddleware><Login /></GuestMiddleware>} />
				<Route path='/' element={<AuthMiddleware> <Main /></AuthMiddleware>} />
			</Routes>
		</BrowserRouter>
	)
}