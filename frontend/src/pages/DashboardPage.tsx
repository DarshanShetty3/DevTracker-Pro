import { useMemo } from 'react';
import {
  AlarmClock,
  Bug,
  CalendarClock,
  CheckCircle2,
  Clock3,
  GitCommitHorizontal,
  ListTodo,
  LogOut,
  Target,
  Timer,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type TaskItem = {
  id: number;
  title: string;
  project: string;
  priority: 'Low' | 'Medium' | 'High';
  estimateMins: number;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
};

type DeadlineItem = {
  id: number;
  title: string;
  dueAt: string;
  project: string;
};

type BugItem = {
  id: number;
  title: string;
  severity: 'P1' | 'P2' | 'P3';
  blockedBy?: string;
};

type CommitItem = {
  id: number;
  message: string;
  repo: string;
  branch: string;
  at: string;
};

type HabitItem = {
  id: number;
  name: string;
  currentStreak: number;
  target: string;
  doneToday: boolean;
};

const todayTasks: TaskItem[] = [
  { id: 1, title: 'Build dashboard route integration', project: 'DevTracker Pro', priority: 'High', estimateMins: 90, status: 'IN_PROGRESS' },
  { id: 2, title: 'Create task status pill component', project: 'DevTracker Pro', priority: 'Medium', estimateMins: 40, status: 'TODO' },
  { id: 3, title: 'Hook worklog summary to API', project: 'DevTracker Pro', priority: 'High', estimateMins: 60, status: 'TODO' },
  { id: 4, title: 'Refine auth error states', project: 'DevTracker Pro', priority: 'Low', estimateMins: 30, status: 'DONE' },
];

const deadlines: DeadlineItem[] = [
  { id: 1, title: 'Dashboard v1 polishing', project: 'DevTracker Pro', dueAt: 'Today, 7:00 PM' },
  { id: 2, title: 'Task CRUD API wiring', project: 'DevTracker Pro', dueAt: 'Tomorrow, 12:00 PM' },
  { id: 3, title: 'Weekly personal sprint review', project: 'Personal Ops', dueAt: 'Fri, 6:00 PM' },
];

const bugBlockers: BugItem[] = [
  { id: 1, title: 'Task list not persisted on refresh', severity: 'P1', blockedBy: 'Missing backend task endpoints' },
  { id: 2, title: 'Phone-based login validation edge case', severity: 'P2' },
  { id: 3, title: 'Inconsistent spacing in auth card mobile view', severity: 'P3' },
];

const commits: CommitItem[] = [
  { id: 1, message: 'feat: add dashboard page shell and route', repo: 'DevTracker-Pro', branch: 'main', at: '30m ago' },
  { id: 2, message: 'fix: improve auth payload validation', repo: 'DevTracker-Pro', branch: 'main', at: '2h ago' },
  { id: 3, message: 'chore: update backend prisma packages', repo: 'DevTracker-Pro', branch: 'main', at: '4h ago' },
];

const habits: HabitItem[] = [
  { id: 1, name: 'Deep work block', currentStreak: 6, target: '2h/day', doneToday: true },
  { id: 2, name: 'Daily code review', currentStreak: 4, target: '15 mins/day', doneToday: true },
  { id: 3, name: 'End-of-day planning', currentStreak: 5, target: '10 mins/day', doneToday: false },
];

const statusColor: Record<TaskItem['status'], string> = {
  TODO: 'bg-slate-100 text-slate-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  REVIEW: 'bg-amber-100 text-amber-700',
  DONE: 'bg-emerald-100 text-emerald-700',
};

const priorityColor: Record<TaskItem['priority'], string> = {
  Low: 'text-slate-500',
  Medium: 'text-amber-600',
  High: 'text-rose-600',
};

function MetricCard({
  title,
  value,
  subtext,
  icon,
}: {
  title: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="text-slate-500">{icon}</div>
      </div>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{subtext}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalTrackedHours = useMemo(
    () => (4.5 + 2.0 + 1.5).toFixed(1),
    []
  );
  const completedTasks = todayTasks.filter((task) => task.status === 'DONE').length;
  const pendingTasks = todayTasks.length - completedTasks;
  const blockersCount = bugBlockers.filter((item) => item.severity === 'P1' || item.severity === 'P2').length;
  const habitCompletion = Math.round((habits.filter((habit) => habit.doneToday).length / habits.length) * 100);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500">DevTracker Pro Dashboard</p>
              <h1 className="text-2xl font-bold text-slate-900">
                {user?.name ? `${user.name}'s Daily Focus` : 'Daily Focus'}
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Tasks Pending Today"
            value={`${pendingTasks}`}
            subtext={`${completedTasks} completed from ${todayTasks.length}`}
            icon={<ListTodo className="h-4 w-4" />}
          />
          <MetricCard
            title="Time Tracked Today"
            value={`${totalTrackedHours}h`}
            subtext="Target 8h focused work"
            icon={<Timer className="h-4 w-4" />}
          />
          <MetricCard
            title="Active Blockers"
            value={`${blockersCount}`}
            subtext="P1 and P2 issues"
            icon={<Bug className="h-4 w-4" />}
          />
          <MetricCard
            title="Habits Completed"
            value={`${habitCompletion}%`}
            subtext="Daily consistency score"
            icon={<Target className="h-4 w-4" />}
          />
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-slate-600" />
              <h2 className="text-sm font-semibold text-slate-800">Today's Tasks</h2>
            </div>
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div key={task.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-slate-900">{task.title}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[task.status]}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                    <p>Project: {task.project}</p>
                    <p className={priorityColor[task.priority]}>Priority: {task.priority}</p>
                    <p>Estimate: {task.estimateMins} mins</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-slate-600" />
              <h2 className="text-sm font-semibold text-slate-800">Upcoming Deadlines</h2>
            </div>
            <div className="space-y-3">
              {deadlines.map((deadline) => (
                <div key={deadline.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <p className="font-medium text-slate-900">{deadline.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{deadline.project}</p>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-rose-600">
                    <AlarmClock className="h-3.5 w-3.5" />
                    {deadline.dueAt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Bug className="h-4 w-4 text-slate-600" />
              <h2 className="text-sm font-semibold text-slate-800">Bugs & Blockers</h2>
            </div>
            <div className="space-y-3">
              {bugBlockers.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">{item.severity}</span>
                  </div>
                  {item.blockedBy ? (
                    <p className="mt-2 text-xs text-slate-500">Blocked by: {item.blockedBy}</p>
                  ) : (
                    <p className="mt-2 text-xs text-emerald-600">No active dependency blocker</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <GitCommitHorizontal className="h-4 w-4 text-slate-600" />
              <h2 className="text-sm font-semibold text-slate-800">Recent Commit Activity</h2>
            </div>
            <div className="space-y-3">
              {commits.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <p className="font-medium text-slate-900">{item.message}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.repo} • {item.branch}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500">
                    <Clock3 className="h-3.5 w-3.5" />
                    {item.at}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-slate-600" />
              <h2 className="text-sm font-semibold text-slate-800">Goals & Habits</h2>
            </div>
            <div className="space-y-3">
              {habits.map((habit) => (
                <div key={habit.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900">{habit.name}</p>
                    <span className={`text-xs font-semibold ${habit.doneToday ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {habit.doneToday ? 'Done' : 'Pending'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Target: {habit.target}</p>
                  <p className="mt-1 text-xs text-blue-600">Current streak: {habit.currentStreak} days</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
