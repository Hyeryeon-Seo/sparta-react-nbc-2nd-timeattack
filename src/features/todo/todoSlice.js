import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../api/todo-api";

export const getTodosThunk = createAsyncThunk("todo/getTodos", getTodos);
export const createTodoThunk = createAsyncThunk("todo/createTodo", createTodo);
export const deleteTodoThunk = createAsyncThunk("todo/deleteTodo", deleteTodo);
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
    });

    builder.addCase(createTodoThunk.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });

    builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
      const targetIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );

      state.todos.splice(targetIndex, 1);
    });

    builder.addCase(toggleTodoThunk.fulfilled, (state, action) => {
      const targetItem = state.todos.find((todo) => todo.id === action.payload);
      targetItem.isDone = !targetItem.isDone;
    });
  },
});

export const { sortTodos } = todoSlice.actions;
export default todoSlice.reducer;
