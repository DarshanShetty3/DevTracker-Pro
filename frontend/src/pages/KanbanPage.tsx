import { Plus, Search } from 'lucide-react';

export default function KanbanPage() {
    return (
        <div className="p-8">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Project Tracker</h1>
                    <p className="text-sm text-on-surface-variant mt-1">Manage your active sprint and backlogs.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="pl-9 pr-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-sm focus:outline-none focus:border-primary w-64"
                        />
                    </div>
                    <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-container transition-colors">
                        <Plus className="w-4 h-4" />
                        New Task
                    </button>
                </div>
            </header>

            {/* Columns will go here later */}
            <div className="grid grid-cols-3 gap-6 h-[calc(100vh-160px)]">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-on-surface-variant flex items-center justify-between">
                        To Do <span className="bg-surface-container-high px-2 py-0.5 rounded text-xs">0</span>
                    </h3>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-on-surface-variant flex items-center justify-between">
                        In Progress <span className="bg-surface-container-high px-2 py-0.5 rounded text-xs">0</span>
                    </h3>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
                    <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-on-surface-variant flex items-center justify-between">
                        Completed <span className="bg-surface-container-high px-2 py-0.5 rounded text-xs">0</span>
                    </h3>
                </div>
            </div>
        </div>
    );
}