import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import React, {Fragment, useEffect, useState} from 'react'
import api from '../config/api'
import {Helmet} from 'react-helmet'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {findOneTodo, getAllTodos, setErrors, setIsOpenModalEdit, setTodo} from '../slice/todoSlice'
import Swal from 'sweetalert2'
import Navbar from "../components/Navbar"
import {Dialog, Transition} from "@headlessui/react"
import Todo from "../components/Todo"

export default function Main() {
	const dispatch = useDispatch()
	const {errors, todos, todo, isOpenModalEdit} = useSelector((state) => state.todos)
	const initialFormAddTask = {
		title: '',
		description: '',
	}
	const [formAddTask, setFormAddTask] = useState(initialFormAddTask)

	useEffect(() => {
		dispatch(getAllTodos())
	}, [])

	const handleClickOpenModalEdit = async (id) => {
		dispatch(findOneTodo(id))
		dispatch(setIsOpenModalEdit(!isOpenModalEdit))
	}

	const handleInputChangeDetailTodoForm = (e) => {
		dispatch(setTodo({
			...todo,
			[e.target.name]: e.target.value
		}))
	}
	const handleSubmitAddTask = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post(api.todo, {
				title: formAddTask.title,
				description: formAddTask.description,
			})
			if(response.status == 200) {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'task baru berhasil ditambahkan',
					showConfirmButton: false,
					timer: 2000
				})
				setFormAddTask(initialFormAddTask)
				dispatch(getAllTodos())
				dispatch(setErrors({}))
			}
		} catch(error) {
			dispatch(setErrors(error.response.data.errors))
		}
	}
	const handleSubmitEditForm = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.put(`${api.todo}/${todo.id}`, {
				title: todo.title,
				description: todo.description
			})
			if(response.status == 200) {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'task berhasil diperbarui',
					showConfirmButton: false,
					timer: 2000
				})
				dispatch(setIsOpenModalEdit(false))
				dispatch(getAllTodos())
				dispatch(setErrors({}))
			}
		} catch(error) {
			dispatch(setErrors(error.response.data.errors))
		}
	}
	return (
		<>
			<Helmet>
				<title>TodoList</title>
			</Helmet>
			<Navbar />
			<div className="mx-auto bg-white shadow-lg rounded-lg mt-20 md:h-full h-80">
				<div className="px-4 py-2">
					<h1 className="text-gray-800 font-bold text-xl uppercase text-center">Your Tasks</h1>
				</div>
				<div className="overflow-auto h-64 md:h-80">
					<ul className="divide-y divide-gray-200 px-4 mb-5">
						<div className="grid md:gap-x-5">
							{
								todos.length > 0 &&
								todos.map(todo => (
									<Todo key={`task${todo.id}`} task={todo} />
								))
							}
						</div>
					</ul>
				</div>
			</div>
			<div className="flex justify-center w-full">
				<div className="transform overflow-hidden p-6">
					<p className="text-xl text-center mx-auto flex font-bold leading-6 text-gray-900">
						Add Task
					</p>
					<form className="flex gap-2" onSubmit={handleSubmitAddTask}>
						<div className="mt-5">
							<input
								name="title"
								type="text"
								placeholder="Todo"
								className="py-1 px-3 font-bold placeholder:font-normal hover:border-main-purple outline-none w-full text-xl border-gray-300 border-b-2"
								value={formAddTask.title}
								onChange={(e) => setFormAddTask({...formAddTask, title: e.target.value})}
							/>
							{errors.length > 0 &&
								errors.map(
									(err, index) =>
										err.field == "title" && (
											<p key={index} className="text-red-500">
												{err.message}
											</p>
										)
								)}
						</div>
						<div className="mt-5">
							<input
								name="description"
								type="text"
								placeholder="Deskripsi"
								className="py-1 px-3 hover:border-main-purple outline-none w-full text-lg border-gray-300 border-b-2"
								value={formAddTask.description}
								onChange={(e) => setFormAddTask({...formAddTask, description: e.target.value})}
							/>
							{errors.length > 0 &&
								errors.map(
									(err, index) =>
										err.field == "description" && (
											<p key={index} className="text-red-500">
												{err.message}
											</p>
										)
								)}

						</div>
						<div className="mt-5">
							<button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white rounded px-5 py-1" type="submit">
								Add
							</button>
						</div>
					</form>
				</div>
			</div>
			<Transition appear show={isOpenModalEdit} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => {handleClickOpenModalEdit()}}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h1"
										className="items-center md:gap-28 mb-2  flex md:text-2xl font-bold leading-6 text-gray-900"
									>
										Update Task
									</Dialog.Title>
									<form onSubmit={handleSubmitEditForm} className="w-full flex flex-col gap-2">
										<div className="mb-9 mt-5">
											<input
												name="title"
												type="text"
												placeholder="Todo"
												className="py-1 px-3 font-bold placeholder:font-normal hover:border-main-purple outline-none w-full text-xl border-gray-300 border-b-2"
												value={todo.title}
												onChange={handleInputChangeDetailTodoForm}
											/>
											{errors.length > 0 &&
												errors.map(
													(err, index) =>
														err.field == "title" && (
															<p key={index} className="text-red-500">
																{err.message}
															</p>
														)
												)}
										</div>
										<div>
											<input
												type="text"
												name="description"
												placeholder="Deskripsi"
												className="py-1 px-3 hover:border-main-purple outline-none w-full text-lg border-gray-300 border-b-2"
												value={todo.description}
												onChange={handleInputChangeDetailTodoForm}
											/>
											{errors.length > 0 &&
												errors.map(
													(err, index) =>
														err.field == "description" && (
															<p key={index} className="text-red-500">
																{err.message}
															</p>
														)
												)}
										</div>
										<button
											className="w-1/3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
											type="submit"
										>
											Update
										</button>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			<ToastContainer
				position="bottom-center"
				autoClose={2000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	)
}
