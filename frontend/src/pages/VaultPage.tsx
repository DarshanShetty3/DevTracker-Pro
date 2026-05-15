import { Upload, FileText, Search, Database } from 'lucide-react';

export default function VaultPage() {
    return (
        <div className="p-8">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">The Vault</h1>
                    <p className="text-sm text-on-surface-variant mt-1">Your personal knowledge base and file storage.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                        <input
                            type="text"
                            placeholder="Search notes & files..."
                            className="pl-9 pr-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-sm focus:outline-none focus:border-primary w-64"
                        />
                    </div>
                    <button className="bg-surface-container-high border border-outline-variant hover:border-outline text-on-surface px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload File
                    </button>
                    <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-container transition-colors">
                        <FileText className="w-4 h-4" />
                        New Note
                    </button>
                </div>
            </header>

            {/* Vault Grid will go here later */}
            <div className="glass-panel rounded-xl p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-outline-variant/50">
                <Database className="w-12 h-12 text-outline mb-4 opacity-50" />
                <h3 className="text-lg font-semibold">Your vault is empty</h3>
                <p className="text-on-surface-variant text-sm mt-2 max-w-md">
                    Create a new markdown note for your code snippets, or upload PDF documentation to keep everything in one place.
                </p>
            </div>
        </div>
    );
}