/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { createTodoThunk } from "../../features/todo/todoSlice";

// uncontrolled component
const TodoForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const deadline = e.target.deadline.value;

    if (!title || !content) {
      return;
    }

    const nextTodo = {
      id: crypto.randomUUID(),
      title,
      content,
      deadline,
      isDone: false,
    };

    dispatch(createTodoThunk(nextTodo));

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="제목" name="title" />
      <input type="text" placeholder="내용" name="content" />
      <input type="date" name="deadline" />
      <button type="submit">제출</button>
    </form>
  );
};

export default TodoForm;
