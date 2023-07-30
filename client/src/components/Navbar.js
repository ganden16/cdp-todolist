import React, {useEffect, useState} from 'react'
import {Menu} from '@headlessui/react'
import api from '../config/api'
import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {useNavigate} from 'react-router-dom'

export default function Navbar() {
	const navigate = useNavigate();
	const [user, setUser] = useState({})

	useEffect(() => {
		axios.get(api.me)
			.then(res => setUser(res.data.data))
	}, [])

	const handleClickLogout = () => {
		Swal.fire({
			title: "Keluar",
			text: "Apakah anda yakin ingin keluar?",
			showCancelButton: true,
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			confirmButtonColor: "#dc2626",
			cancelButtonColor: "#16a34a",
		}).then((result) => {
			if(result.isConfirmed) {
				Cookies.remove("token")
				toast.success("berhasil logout", {
					position: "bottom-center",
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				})
				setTimeout(() => {
					navigate('/login')
				}, 2000)
			}
		})
	}
	return (
		<>
			<div className="fixed top-0 left-0 right-0 bg-[#282C33]">
				<div className="px-5 max-w-[1560px] pt-6 flex justify-between my-2">
					<div className="left flex gap-2 items-center font-bold text-white text-2xl">
						TodoList
					</div>
					<div className="hidden md:flex justify-end right">
						<p className='text-[#C778DD] font-medium me-10 cursor-pointer'>
							{user.name} - {user.email}
						</p>
						<span onClick={handleClickLogout} className=' text-[#C778DD] font-bold cursor-pointer'>
							<svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="currentColor" className="bi bi-box-arrow-right inline" viewBox="0 0 16 16" >
								<path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
								<path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
							</svg>
						</span>
					</div>

					<div className="md:hidden right flex items-center relative z-50">
						<Menu>
							<Menu.Button>
								<div className="open block md:hidden w-8">
									<div className="w-full h-[1px] my-2 rounded-r-3xl bg-[#D9D9D9]"></div>
									<div className="w-full h-[1px] my-2 rounded-r-3xl bg-[#D9D9D9]"></div>
									<div className="w-full h-[1px] my-2 rounded-r-3xl bg-[#D9D9D9]"></div>
								</div>
							</Menu.Button>
							<Menu.Items className={'pt-0'}>
								<div className={`menu duration-300 ps-5 pt-14 flex-col md:flex-row flex fixed w-[2/3.5] right-0 top-0 bottom-40 bg-[#282C33] justify-between`}>
									<Menu.Item>
										<p className='text-[#C778DD] font-medium me-10 cursor-pointer'>
											{user.name}
										</p>
									</Menu.Item>
									<Menu.Item>
										<span onClick={handleClickLogout} className=' text-[#C778DD] font-bold cursor-pointer flex justify-center'>
											<svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="currentColor" className="bi bi-box-arrow-right inline" viewBox="0 0 16 16" >
												<path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
												<path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
											</svg>
										</span>
									</Menu.Item>
								</div>
							</Menu.Items>
						</Menu>
					</div>
				</div>
			</div>
		</>
	)
}
