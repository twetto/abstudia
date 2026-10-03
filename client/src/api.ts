export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  isUrgent: boolean;
  isImportant: boolean;
}

export interface User {
  id: string;
  username: string;
}

export class UnauthorizedError extends Error {}

// Same-origin requests: the browser attaches the session cookie automatically.
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (res.status === 401) throw new UnauthorizedError();
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message ?? `Request failed (${res.status})`);
  return body as T;
}

export const api = {
  me: () => request<User>('/auth/me'),
  login: (username: string, password: string) =>
    request<{ message: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  logout: () => request<{ message: string }>('/auth/logout'),
  getTasks: () => request<Task[]>('/tasks'),
  createTask: (task: Pick<Task, 'title' | 'isUrgent' | 'isImportant'>) =>
    request<Task>('/tasks', { method: 'POST', body: JSON.stringify(task) }),
  deleteTask: (id: string) => request<{ message: string }>(`/tasks/${id}`, { method: 'DELETE' }),
};
