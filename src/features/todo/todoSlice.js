import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	createTodo,
	deleteTodo,
	getTodos,
	updateTodo,
} from "../../api/todo-api";

export const getTodosThunk = createAsyncThunk(
	// 해설강의에서 배운대로 추가도 해봤습니다 !
	"todo/getTodos",
	async (payload, thunkAPI) => {
		try {
			const todos = await getTodos();
			return todos;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
export const createTodoThunk = createAsyncThunk("todo/createTodo", createTodo);
// 	async (newTodo, thunkAPI) => {
// 		try {
// 			await createTodo(newTodo);
// 			// const todos = await getTodos();
// 			// return todos;
// 		} catch (err) {
// 			return thunkAPI.rejectWithValue(err);
// 		}
// 	}
// );
export const deleteTodoThunk = createAsyncThunk(
	"todo/deleteTodo",
	async (id, thunkAPI) => {
		try {
			await deleteTodo(id);
			// const todos = await getTodos();
			// return todos;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);
export const toggleTodoThunk = createAsyncThunk(
	"todo/updateTodo",
	async (id, { getState }) => {
		const state = getState();
		const { todos } = state.todo;

		await updateTodo(id, {
			isDone: !todos.find((todoItem) => todoItem.id === id).isDone,
		});
		return id;
	}
);

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
		todos: [],
		isLoading: true,
		isError: false,
		error: null,
	},
	reducers: {
		sortTodos: (state, action) => {
			const sortOrder = action.payload;
			if (sortOrder === "asc") {
				state.todos = state.todos.sort(
					(a, b) => new Date(a.deadline) - new Date(b.deadline)
				);
				return;
			}
			state.todos = state.todos.sort(
				(a, b) => new Date(b.deadline) - new Date(a.deadline)
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getTodosThunk.fulfilled, (state, action) => {
			state.todos = action.payload;
			state.isLoading = false;
			state.isError = false;
			state.error = null;
		});

		builder.addCase(getTodosThunk.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.error = action.payload;
		});

		builder.addCase(getTodosThunk.pending, (state, action) => {
			state.isLoading = true;
		});

		builder.addCase(createTodoThunk.fulfilled, (state, action) => {
			state.todos.push(action.payload);
			state.isLoading = false;
			state.isError = false;
			state.error = null;
		});

		builder.addCase(createTodoThunk.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.error = action.payload;
		});

		builder.addCase(createTodoThunk.pending, (state, action) => {
			state.isLoading = true;
		});

		builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
			const targetIndex = state.todos.findIndex(
				(todo) => todo.id === action.payload
			);

			state.todos.splice(targetIndex, 1);
			state.isLoading = false;
			state.isError = false;
			state.error = null;
		});

		builder.addCase(deleteTodoThunk.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.error = action.payload;
		});

		builder.addCase(deleteTodoThunk.pending, (state, action) => {
			state.isLoading = true;
		});

		builder.addCase(toggleTodoThunk.fulfilled, (state, action) => {
			const targetItem = state.todos.find((todo) => todo.id === action.payload);
			targetItem.isDone = !targetItem.isDone;
			state.isLoading = false;
			state.isError = false;
			state.error = null;
		});

		builder.addCase(toggleTodoThunk.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.error = action.payload;
		});

		builder.addCase(toggleTodoThunk.pending, (state, action) => {
			state.isLoading = true;
		});
	},
});

export const { sortTodos } = todoSlice.actions;
export default todoSlice.reducer;
