import { FormEvent, useState } from 'react';
import { Task } from '../api';

interface Props {
  onAdd: (task: Pick<Task, 'title' | 'isUrgent' | 'isImportant'>) => Promise<boolean>;
}

export default function AddTaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (await onAdd({ title: title.trim(), isUrgent, isImportant })) {
      setTitle('');
      setIsUrgent(false);
      setIsImportant(false);
    }
  };

  return (
    <form className="add-task" onSubmit={submit}>
      <input
        placeholder="New task…"
        value={title}
        onChange={e => setTitle(e.target.value)}
        aria-label="Task title"
      />
      <label className="flag">
        <input type="checkbox" checked={isUrgent} onChange={e => setIsUrgent(e.target.checked)} />
        Urgent
      </label>
      <label className="flag">
        <input type="checkbox" checked={isImportant} onChange={e => setIsImportant(e.target.checked)} />
        Important
      </label>
      <button type="submit" disabled={!title.trim()}>Add</button>
    </form>
  );
}
