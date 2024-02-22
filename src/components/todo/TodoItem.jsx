import { Link, useNavigate } from "react-router-dom";
import { TodoCardItem } from "../../style/TodoStyle";

/* eslint-disable react/prop-types */
const TodoItem = ({ todo, onDeleteTodoItem, onToggleTodoItem }) => {
  const navigate = useNavigate();
  const { id, title, content, isDone, deadline } = todo;

  const formattedDeadline = new Date(deadline).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const handleDeleteTodoItem = () => {
    onDeleteTodoItem(id);
    navigate("/");
  };

  return (
    <TodoCardItem $isDone={isDone}>
      <article>
        <Link to={`/${id}`}>
          <h3>{title}</h3>
          <p>{content}</p>
          <time>{formattedDeadline}</time>
        </Link>
        <div>
          <button onClick={handleDeleteTodoItem}>삭제</button>
          <button onClick={() => onToggleTodoItem(id)}>
            {isDone ? "취소" : "완료"}
          </button>
        </div>
      </article>
    </TodoCardItem>
  );
};

export default TodoItem;
