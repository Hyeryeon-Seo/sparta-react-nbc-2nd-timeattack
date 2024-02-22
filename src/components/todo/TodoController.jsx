import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sortTodos } from "../../features/todo/todoSlice";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoController = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const dispatch = useDispatch();
  // TODO: Redux Toolkit의 전역 상태에서 todos 상태를 가져옵니다.
  // NOTE - 힌트:
  // - useSelector 훅을 사용해 todoSlice에서 정의한 todos를 가져옵니다.

  const onChangeSortOrder = (e) => {
    const nextSortOrder = e.target.value;

    // NOTE: select UI 변경
    setSortOrder(nextSortOrder);
  };

  useEffect(() => {
    // TODO: Redux Toolkit Thunk 함수를 사용하여 서버로부터 todos를 가져와 전역 상태에 저장합니다.
    // NOTE - 힌트:
    // - 모든 todos를 가져오는 Thunk를 dispatch합니다.
  }, []);

  useEffect(() => {
    if (sortOrder === "asc") {
      // NOTE: 투두 리스트 오름차순 정렬
      dispatch(sortTodos("asc"));
      return;
    }

    // NOTE: 투두 리스트 내림차순 정렬
    dispatch(sortTodos("desc"));
  }, [sortOrder, dispatch]);

  // useMemo
  const workingTodos = todos.filter((todo) => !todo.isDone);
  const doneTodos = todos.filter((todo) => todo.isDone);

  return (
    <main>
      <TodoForm />
      <div>
        <select onChange={onChangeSortOrder} value={sortOrder}>
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
      </div>
      <TodoList headTitle="Working!" todos={workingTodos} />
      <TodoList headTitle="Done!" todos={doneTodos} />
    </main>
  );
};

export default TodoController;
