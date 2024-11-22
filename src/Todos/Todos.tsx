import { useEffect, useReducer } from "react";
import getTodos from "./api/getTodos";
import classes from "./Todos.module.scss";

const URL = "https://jsonplaceholder.typicode.com/todos";

const initialState = {
  tasks: [],
  selectedTask: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SELECT_TODO":
      return { ...state, selectedTodo: action.payload };
    case "CLEAR_SELECTION":
      return { ...state, selectedTodo: null };
    default:
      return state;
  }
}

const Todos = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, error, status } = getTodos(URL);

  useEffect(() => {
    if (data) {
      console.log("data", data);
      dispatch({ type: "SET_TODOS", payload: data });
    }
  });

  if ("pending" === status) {
    return <p>Loading tasks</p>;
  }

  if ("error" === status && error) {
    return <p>Error fetching tasks. {error}</p>;
  }

  return (
    <div className="todos">
      <ul>
        {state.tasks?.map((todo) => (
          <li
            className={
              todo.completed ? classes.taskCompleted : classes.taskPending
            }
            key={todo.id}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
