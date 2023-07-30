import React, {useState} from 'react'
import {MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp, MdDeleteOutline} from "react-icons/md"
import {BiEditAlt} from "react-icons/bi"
import {useDispatch, useSelector} from 'react-redux'
import {findOneTodo, getAllTodos, setErrors, setIsOpenModalEdit} from '../slice/todoSlice'
import axios from 'axios'
import api from '../config/api'
import Swal from 'sweetalert2'

export default function Todo({task}) {
	const dispatch = useDispatch()
	const {isLoading, errors, todos, todo, isOpenModalEdit} = useSelector((state) => state.todos)
	const [isViewDetailTask, setIsViewDetailTask] = useState(false)

	const handleClickOpenModalEdit = async (id) => {
		if(id) {
			dispatch(findOneTodo(id))
		}
		dispatch(setErrors({}))
		dispatch(setIsOpenModalEdit(!isOpenModalEdit))
	}

	const handleChangeCheckbox = async (id, status) => {
		if(status) {
			try {
				await axios.put(`${api.undone}/${id}`)
				dispatch(getAllTodos())
			} catch(error) {
				console.log(error)
			}
		} else {
			try {
				await axios.put(`${api.done}/${id}`)
				dispatch(getAllTodos())
				dispatch(setErrors({}))
			} catch(error) {
				console.log(error)
			}
		}
	}

	const handleClickDeleteTask = async (id) => {
		Swal.fire({
			title: "Hapus",
			text: "Apakah anda yakin ingin menghapus task ini?",
			showCancelButton: true,
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			confirmButtonColor: "#16a34a",
			cancelButtonColor: "#dc2626",
		}).then(async (result) => {
			if(result.isConfirmed) {
				try {
					const response = await axios.delete(`${api.todo}/${id}`)
					if(response.status == 200) {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'task telah dihapus',
							showConfirmButton: false,
							timer: 2000
						})
						dispatch(getAllTodos())
						dispatch(setErrors({}))
					}
				} catch(error) {
					console.log(error)
				}
			}
		})
	}

	return (
		<li className="py-4">
			<div className="flex items-center">
				<input
					type="checkbox"
					onChange={() => handleChangeCheckbox(task.id, task.status)}
					className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
					checked={task.status}
				/>
				<label htmlFor="task1" className="ml-3 flex text-gray-900">
					<span onClick={() => setIsViewDetailTask(!isViewDetailTask)} className="text-lg font-medium mr-2 cursor-pointer">{task.title}</span>
					<span onClick={() => handleClickOpenModalEdit(task.id)} className="text-2xl cursor-pointer">
						<BiEditAlt />
					</span>
					<span onClick={() => handleClickDeleteTask(task.id)} className="text-2xl cursor-pointer">
						<MdDeleteOutline />
					</span>
					{
						!isViewDetailTask &&
						<span onClick={() => setIsViewDetailTask(!isViewDetailTask)} className="text-2xl cursor-pointer">
							<MdKeyboardDoubleArrowDown />
						</span>
					}
					{
						isViewDetailTask &&
						<span onClick={() => setIsViewDetailTask(!isViewDetailTask)} className="text-2xl cursor-pointer">
							<MdKeyboardDoubleArrowUp />
						</span>
					}
				</label>
			</div>
			{
				isViewDetailTask &&
				<div id="description" className="">
					<p className="text-justify	ps-7">{task.description}</p>
				</div>
			}
		</li>
	)
}
