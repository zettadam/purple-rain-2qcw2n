import classes from "./TaskItem.module.scss";

import type { Task } from "./types";

export default function TaskItem({
  data,
  expanded,
  onChange,
  onDetailsToggle,
  selected,
}: {
  data: Task;
  expanded: boolean;
  onChange: React.ChangeEventHandler;
  onDetailsToggle: React.MouseEventHandler;
  selected: boolean;
}) {
  return (
    <li data-testid="taskitem">
      <label className={data.completed ? classes.completed : classes.pending}>
        <input
          data-id={data.id}
          type="checkbox"
          checked={selected}
          onChange={onChange}
        />
        {data.title}
      </label>
      <button
        type="button"
        onClick={onDetailsToggle}
        aria-label="Toggle"
        value={data.id}
      >
        {expanded ? "less" : "more"}
      </button>
      {expanded && (
        <div className={classes.details}>
          Details:
          <p data-testid={`task-details--id-${data.id}`}>Task ID: {data.id}</p>
          <p data-testid={`task-details--user-id-${data.userId}-${data.id}`}>
            User ID: {data.userId}
          </p>
        </div>
      )}
    </li>
  );
}
