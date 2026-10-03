import { Task } from '../api';

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onDelete }: { task: Task; onDelete: (id: string) => void }) {
  return (
    <li className="task">
      <span className="title">{task.title}</span>
      {task.isUrgent && <span className="badge urgent" title="Urgent">Urgent</span>}
      {task.isImportant && <span className="badge important" title="Important">Important</span>}
      <button className="delete" onClick={() => onDelete(task._id)} aria-label={`Delete ${task.title}`}>×</button>
    </li>
  );
}

export default function TaskList({ tasks, onDelete }: Props) {
  if (tasks.length === 0) return <p className="empty">No tasks yet.</p>;
  return (
    <ul className="task-list">
      {tasks.map(task => <TaskItem key={task._id} task={task} onDelete={onDelete} />)}
    </ul>
  );
}
