import { useCallback, useEffect, useState } from 'react';
import { api, Task, UnauthorizedError, User } from './api';
import Login from './components/Login';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import Matrix from './components/Matrix';

type Tab = 'list' | 'matrix';

export default function App() {
  // undefined = still checking the session, null = logged out
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tab, setTab] = useState<Tab>('list');
  const [error, setError] = useState('');

  // Any 401 drops back to the login screen; other errors show a banner.
  const handleError = useCallback((err: unknown) => {
    if (err instanceof UnauthorizedError) setUser(null);
    else setError(err instanceof Error ? err.message : String(err));
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      setTasks(await api.getTasks());
      setError('');
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

  useEffect(() => {
    api.me().then(setUser).catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (user) loadTasks();
  }, [user, loadTasks]);

  const addTask = async (task: Pick<Task, 'title' | 'isUrgent' | 'isImportant'>) => {
    try {
      const saved = await api.createTask(task);
      setTasks(prev => [...prev, saved]);
      return true;
    } catch (err) {
      handleError(err);
      return false;
    }
  };

  const deleteTask = async (id: string) => {
    const prev = tasks;
    setTasks(tasks.filter(t => t._id !== id));
    try {
      await api.deleteTask(id);
    } catch (err) {
      setTasks(prev);
      handleError(err);
    }
  };

  const logout = async () => {
    await api.logout().catch(() => {});
    setTasks([]);
    setUser(null);
  };

  if (user === undefined) return null;
  if (user === null) return <Login onLoggedIn={setUser} />;

  return (
    <div className="app">
      <header className="topbar">
        <h1>abstudia</h1>
        <nav className="tabs" role="tablist">
          <button role="tab" aria-selected={tab === 'list'} onClick={() => setTab('list')}>Tasks</button>
          <button role="tab" aria-selected={tab === 'matrix'} onClick={() => setTab('matrix')}>Matrix</button>
        </nav>
        <span className="spacer" />
        <button className="link" onClick={logout} title={`Logged in as ${user.username}`}>Log out</button>
      </header>

      {error && (
        <div className="error" role="alert">
          {error} <button className="link" onClick={() => setError('')}>Dismiss</button>
        </div>
      )}

      <AddTaskForm onAdd={addTask} />

      {tab === 'list'
        ? <TaskList tasks={tasks} onDelete={deleteTask} />
        : <Matrix tasks={tasks} onDelete={deleteTask} />}
    </div>
  );
}
