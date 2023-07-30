import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../config/api'

export const getAllTodos = createAsyncThunk('todos/getAll', async () => {
	const res = await axios.get(api.todo)
	return res.data.data
})
export const findOneTodo = createAsyncThunk('todos/findOne', async (id) => {
	const res = await axios.get(`${api.todo}/${id}`)
	return res.data.data
})

const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		isLoading: false,
		isOpenModalEdit: false,
		errors: [],
		todos: [],
		todo: {},
	},
	reducers: {
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		},
		setIsOpenModalEdit: (state, action) => {
			state.isOpenModalEdit = action.payload
		},
		setErrors: (state, action) => {
			state.errors = action.payload
		},
		setTodos: (state, action) => {
			state.todos = action.payload
		},
		setTodo: (state, action) => {
			state.todo = action.payload
		},

	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllTodos.fulfilled, (state, action) => {
				state.todos = action.payload
			})
		builder
			.addCase(findOneTodo.fulfilled, (state, action) => {
				state.todo = action.payload
			})
	}
})
export const {
	setIsLoading,
	setIsOpenModalEdit,
	setErrors,
	setTodos,
	setTodo
} = todoSlice.actions
export default todoSlice.reducer