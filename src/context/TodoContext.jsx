import { createContext, useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/todo-api";

export const TODOS_COLLECTION = "todos";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const onSubmitTodo = async (nextTodo) => {
    await createTodo(nextTodo);

    setTodos((prevTodos) => [...prevTodos, nextTodo]);
  };

  const onDeleteTodoItem = async (id) => {
    await deleteTodo(id);

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const onToggleTodoItem = async (id) => {
    await updateTodo(id, {
      isDone: !todos.find((todoItem) => todoItem.id === id).isDone,
    });

    setTodos((prevTodos) =>
      prevTodos.map((todoItem) => {
        if (todoItem.id === id) {
          return {
            ...todoItem,
            isDone: !todoItem.isDone,
          };
        }

        return todoItem;
      })
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        onSubmitTodo,
        onDeleteTodoItem,
        onToggleTodoItem,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
