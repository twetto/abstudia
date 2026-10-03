import { Task } from '../api';
import { TaskItem } from './TaskList';

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
}

const QUADRANTS = [
  { key: 'do', label: 'Do', hint: 'Urgent & important', urgent: true, important: true },
  { key: 'plan', label: 'Plan', hint: 'Important, not urgent', urgent: false, important: true },
  { key: 'delegate', label: 'Delegate', hint: 'Urgent, not important', urgent: true, important: false },
  { key: 'drop', label: 'Drop', hint: 'Neither', urgent: false, important: false },
];

export default function Matrix({ tasks, onDelete }: Props) {
  return (
    <div className="matrix">
      {QUADRANTS.map(q => {
        const items = tasks.filter(t => t.isUrgent === q.urgent && t.isImportant === q.important);
        return (
          <section key={q.key} className={`quadrant ${q.key}`}>
            <h2>{q.label} <small>{q.hint}</small></h2>
            <ul className="task-list">
              {items.map(task => <TaskItem key={task._id} task={task} onDelete={onDelete} />)}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
