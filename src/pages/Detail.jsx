import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TodoItem from "../components/todo/TodoItem";
import { getSingleTodo } from "../api/todo-api";
import { useDispatch } from "react-redux";
import {
	deleteTodoThunk,
	getTodosThunk,
	toggleTodoThunk,
} from "../features/todo/todoSlice";

const Detail = () => {
	const dispatch = useDispatch();

	const { todoId } = useParams();
	const [todo, setTodo] = useState(null);

	// TODO: 서버로부터 특정 todo를 가져와 상태에 저장합니다.
	// NOTE - 힌트:
	// - todoId를 사용해 특정 todo를 가져오는 함수를 작성합니다.
	// - 가져온 todo를 상태에 저장합니다.
	// - useEffect 훅을 사용해 todoId가 변경될 때마다 todo를 가져옵니다.
	useEffect(() => {
		const fetchSingleTodo = async () => {
			const data = await getSingleTodo(todoId);
			setTodo(data);
		};

		fetchSingleTodo();
	}, [todoId]);

	const handleDeleteTodoItem = async (id) => {
		// TODO: Redux Toolkit Thunk 함수를 사용하여 서버로부터 특정 todo를 삭제합니다.
		// NOTE - 힌트:
		// - id를 사용해 특정 todo를 삭제하는 Thunk를 dispatch합니다.
		dispatch(deleteTodoThunk(id));
		setTodo(null);
		// FIX Detail페이지에서 삭제 시 홈화면에서 다른 항목도 사라지는 문제 (새로고침하면 다시 맞게 뜸)
		// dispatch(getTodosThunk());
	};

	const handleToggleTodoItem = async (id) => {
		// TODO: Redux Toolkit Thunk 함수를 사용하여 서버로부터 특정 todo의 isDone 상태를 변경합니다.
		// NOTE - 힌트:
		// - id를 사용해 특정 todo의 isDone 상태를 변경하는 Thunk를 dispatch합니다.
		dispatch(toggleTodoThunk(id));
		setTodo((prevTodo) => ({
			...prevTodo,
			isDone: !prevTodo.isDone,
		}));
	};

	// TODO: todo가 없을 경우 로딩 중을 표시합니다.
	// NOTE - 힌트:
	// - todo가 없을 경우 로딩 중을 표시하는 JSX를 반환합니다.
	if (!todo) {
		return <p>로딩 중</p>;
	}

	return (
		<section>
			<Link to="/">Home</Link>
			<TodoItem
				todo={todo}
				onDeleteTodoItem={handleDeleteTodoItem}
				onToggleTodoItem={handleToggleTodoItem}
			/>
		</section>
	);
};

export default Detail;
