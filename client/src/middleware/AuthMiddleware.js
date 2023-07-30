import Cookies from 'js-cookie'
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function AuthMiddleware({children}) {
	const token = Cookies.get('token')
	const navigate = useNavigate()

	useEffect(() => {
		if(!token) {
			navigate('/login')
		}
	}, [token])

	if(token) {
		return (
			children
		)
	}

}
