import React, {useEffect, useState} from 'react'
import api from '../config/api'
import {Link} from 'react-router-dom'
import {PropagateLoader} from "react-spinners"
import {Helmet} from 'react-helmet'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {setErrors, setIsLoading} from '../slice/todoSlice'
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'

export default function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const {isLoading, errors} = useSelector((state) => state.todos)
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: ''
	})
	useEffect(() => {
		dispatch(setErrors([]))
	}, [])
	const handleSubmitRegister = async (e) => {
		e.preventDefault()
		try {
			dispatch(setIsLoading(true))
			await axios.post(api.register, {
				name: form.name,
				email: form.email,
				password: form.password,
			})
			Swal.fire({
				position: 'center-center',
				icon: 'success',
				title: 'registrasi berhasil, dialihkan dalam 3 detik',
				showConfirmButton: false,
				timer: 3000
			})
			setTimeout(() => {
				navigate('/login')
			}, 3000)
		} catch(error) {
			dispatch(setErrors(error.response.data.errors))
		} finally {
			dispatch(setIsLoading(false))
		}
	}
	return (
		<>
			<div className="flex flex-col md:flex-row h-screen">
				<Helmet>
					<title>Register</title>
				</Helmet>
				<div className="md:flex hidden w-full md:w-1/2 bg-orange-400 justify-around items-center">
					<div className="flex items-center justify-center py-2 px-5">
						<div className="ml-5 flex flex-col">
							<span className="text-5xl text-white font-bold font-sans italic">
								Register Your Account
							</span>
						</div>
					</div>
				</div>

				<div className="flex flex-1 flex-col justify-center px-6 md:px-8 md:py-12 pb-16">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
						<h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Registrasi
						</h2>
					</div>
					<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
						<form className="space-y-6" onSubmit={handleSubmitRegister}>
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Nama
								</label>
								<div className="mt-2">
									<input
										id="name"
										name="name"
										type="text"
										className="block w-full rounded-2xl border-0 py-1.5 pl-4  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={form.name}
										onChange={(e) => setForm({...form, name: e.target.value})}
									/>
									{errors.length > 0 &&
										errors.map(
											(err, index) =>
												err.field == "name" && (
													<p key={index} className="text-red-500">
														{err.message}
													</p>
												)
										)}
								</div>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="text"
										className="block w-full rounded-2xl border-0 py-1.5 pl-4  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={form.email}
										onChange={(e) => setForm({...form, email: e.target.value})}
									/>
									{errors.length > 0 &&
										errors.map(
											(err, index) =>
												err.field == "email" && (
													<p key={index} className="text-red-500">
														{err.message}
													</p>
												)
										)}
								</div>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										className="block w-full rounded-2xl border-0 py-1.5 pl-4  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={form.password}
										onChange={(e) => setForm({...form, password: e.target.value})}
									/>
									{errors.length > 0 &&
										errors.map(
											(err, index) =>
												err.field == "password" && (
													<p key={index} className="text-red-500">
														{err.message}
													</p>
												)
										)}
								</div>
							</div>
							<div>
								{!isLoading ? (
									<button
										type="submit"
										className="flex w-full justify-center rounded-2xl bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										Kirim
									</button>
								) : (
									<div className="flex justify-center">
										<PropagateLoader color="#d6b136" speedMultiplier={4} />
									</div>
								)}
							</div>
						</form>

						<p className="mt-10 text-center text-sm text-gray-500">
							Sudah punya akun?{" "}
							<Link
								to="/login"
								className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							>
								Login di sini
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
