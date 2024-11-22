import { useReducer } from "react";

import useGetTodos from "./api/useGetTodos";
import TaskItem from "./TaskItem";
import classes from "./Todos.module.scss";

export const URL = "https://jsonplaceholder.typicode.com/todos";

type State = {
  expandedTasks: number[];
  selectedTasks: number[];
};

type Action =
  | { type: "TOGGLE_TASK_DETAILS"; payload: number }
  | { type: "TOGGLE_TASK_SELECTION"; payload: number };

const initialState: State = {
  expandedTasks: [],
  selectedTasks: [],
};

function reducer(state: State, action: Action) {
  let expanded, selected;

  switch (action.type) {
    case "TOGGLE_TASK_DETAILS":
      expanded = state.expandedTasks.find((t) => t === action.payload);
      return {
        ...state,
        expandedTasks: expanded
          ? state.expandedTasks.filter((t) => t !== action.payload)
          : [...state.expandedTasks, action.payload],
      };

    case "TOGGLE_TASK_SELECTION":
      selected = state.selectedTasks.find((t) => t === action.payload);
      return {
        ...state,
        selectedTasks: selected
          ? state.selectedTasks.filter((t) => t !== action.payload)
          : [...state.selectedTasks, action.payload],
      };
  }
}

const Todos = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, error, status } = useGetTodos(URL);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: {
        dataset: { id },
      },
    } = e;
    if (id) {
      dispatch({
        type: "TOGGLE_TASK_SELECTION",
        payload: parseInt(id, 10),
      });
    }
  };

  const handleDetailsToggle: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    const { value } = e.target as HTMLButtonElement;
    if (value) {
      dispatch({
        type: "TOGGLE_TASK_DETAILS",
        payload: parseInt(value, 10),
      });
    }
  };

  return (
    <div className={classes.todos}>
      {"error" !== status && "success" !== status && (
        <p data-testid="message">Loading tasks</p>
      )}
      {"error" === status && error && (
        <p data-testid="message">Error: {error.message}</p>
      )}
      {data && Array.isArray(data) && data.length ? (
        <ul data-testid="todolist">
          {data.map((task) => {
            const expanded = state.expandedTasks.indexOf(task.id) >= 0;
            const selected = state.selectedTasks.indexOf(task.id) >= 0;
            return (
              <TaskItem
                data={task}
                expanded={expanded}
                selected={selected}
                onChange={handleChange}
                onDetailsToggle={handleDetailsToggle}
                key={task.id}
              />
            );
          })}
        </ul>
      ) : (
        <p>No tasks yet</p>
      )}
    </div>
  );
};

export default Todos;
