import { useDispatch } from "react-redux";
import {
  deleteTodoThunk,
  toggleTodoThunk,
} from "../../features/todo/todoSlice";
import TodoItem from "./TodoItem";

/* eslint-disable react/prop-types */
const TodoList = ({ headTitle, todos }) => {
  const dispatch = useDispatch();

  return (
    <section>
      <h2>{headTitle}</h2>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDeleteTodoItem={(id) => dispatch(deleteTodoThunk(id))}
            onToggleTodoItem={(id) => {
              dispatch(toggleTodoThunk(id));
            }}
          />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
