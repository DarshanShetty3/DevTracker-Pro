import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Activity,
    Terminal,
    ShieldCheck,
    CheckCircle2,
    Database,
    Zap,
    ChevronRight,
    GitBranch,
    Kanban,
    BookOpen,
    Code2,
    Braces
} from "lucide-react";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen selection:bg-primary/30 selection:text-primary-container">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                            <Activity className="w-5 h-5 text-on-primary" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-on-surface">DevTracker Pro</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Features</a>
                        <a href="#tech" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Tech Stack</a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5">
                            <GitBranch className="w-4 h-4" />
                            GitHub
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5"
                        >
                            Log In
                        </button>
                        <button 
                            onClick={() => navigate('/login')}
                            className="bg-primary text-on-primary text-sm font-semibold px-5 py-2 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95"
                        >
                            Start Tracking
                        </button>
                    </div>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 overflow-hidden">
                    <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
                        <motion.div
                            {...fadeIn}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant mb-8"
                        >
                            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold">v1.0.0 Local Build</span>
                        </motion.div>

                        <motion.h1
                            {...fadeIn}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl mb-6 leading-[1.1]"
                        >
                            Master Your Project's <span className="text-primary italic">Flow State</span>
                        </motion.h1>

                        <motion.p
                            {...fadeIn}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10"
                        >
                            The ultimate personal workspace for solo engineers. Track tasks, store code snippets, and manage your builds without enterprise bloat.
                        </motion.p>

                        <motion.div
                            {...fadeIn}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="w-full max-w-5xl glass-panel p-2 rounded-2xl relative group"
                        >
                            <div className="absolute inset-0 bg-primary/10 blur-3xl -z-10 group-hover:bg-primary/20 transition-all duration-700" />
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtnOAjysPgUyVX77Knz0UHP64DZarPtIitvtivewVp0ng6DCZsVN8ztWMwpZDlrsyNInTEJK-Xs2gq-URYdSURss1R9ON-Ud-jcsbVEJRE0kTF3RHG-uPYcGXnJNt3GTYWV5Olda6CObZ_FbBXOkTxxtkKXTrTghLnOSp2e7rOQ-kG9iGZZe9dyKWMpHZGmGKU-rlgT9VIe9MM3cwo5eAaVD4IOlX_2qVEpbCMlHdD-6h5PMPUICKQ3p6KpDMI6UbBUQuHKbR1nJs"
                                alt="DevTracker Dashboard"
                                className="w-full h-auto rounded-xl shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Capabilities Section */}
                <section id="features" className="py-24 px-6 bg-surface-container-low/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">System Capabilities</h2>
                                <p className="text-on-surface-variant max-w-xl">
                                    Everything you need to maintain momentum. Nothing you don't.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Feature 1: Project Tracking (Large) */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="md:col-span-2 lg:col-span-2 glass-panel p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                    <Kanban className="w-64 h-64" />
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Kanban className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Frictionless Kanban</h3>
                                    <p className="text-on-surface-variant leading-relaxed">
                                        Visual task management built for developers. Move features from 'To-Do' to 'Deployed' at the speed of thought.
                                    </p>
                                    <ul className="space-y-3 pt-4">
                                        <li className="flex items-center gap-3 text-sm text-primary">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Drag-and-Drop Workflow
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-primary">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Priority & Estimation Tagging
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex-1 w-full space-y-3">
                                    <div className="code-block h-full flex flex-col">
                                        <div className="flex gap-1.5 mb-4">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-secondary font-mono"><span className="text-tertiary">const</span> task = <span className="text-primary italic">await</span> db.task.create({'{'}</p>
                                            <p className="text-on-surface-variant font-mono pl-4">data: {'{'}</p>
                                            <p className="text-on-surface-variant font-mono pl-8">title: <span className="text-tertiary">"Implement Auth"</span>,</p>
                                            <p className="text-on-surface-variant font-mono pl-8">status: <span className="text-tertiary">"IN_PROGRESS"</span>,</p>
                                            <p className="text-on-surface-variant font-mono pl-8">priority: <span className="text-tertiary">"HIGH"</span></p>
                                            <p className="text-on-surface-variant font-mono pl-4">{'}'}</p>
                                            <p className="text-on-surface-variant font-mono text-secondary">{'}'});</p>
                                        </div>
                                        <div className="mt-auto pt-6 border-t border-outline-variant/30 flex items-center justify-between">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Database Sync</span>
                                            <span className="text-[10px] font-mono text-emerald-400">SUCCESS</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Feature 2: The Vault */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="glass-panel p-8 rounded-2xl space-y-4 border-l-4 border-l-primary"
                            >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">The Knowledge Vault</h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed">
                                    Your second brain. Store code snippets, daily logs, architecture notes, and critical files all in one searchable database.
                                </p>
                            </motion.div>

                            {/* Feature 3: Analytics */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="glass-panel p-8 rounded-2xl space-y-4 border-l-4 border-l-secondary"
                            >
                                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-secondary" />
                                </div>
                                <h3 className="text-xl font-bold">Focus Analytics</h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed">
                                    Track your daily coding hours, active blockers, and habit streaks directly from your main dashboard overview.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Fun Stats Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-12 rounded-3xl bg-surface-container-low border border-outline-variant text-center">
                        <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">0</div>
                            <div className="text-[10px] uppercase font-mono font-bold text-on-surface-variant tracking-[0.2em]">Enterprise Bloat</div>
                        </motion.div>
                        <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
                            <div className="text-[10px] uppercase font-mono font-bold text-on-surface-variant tracking-[0.2em]">Customizable</div>
                        </motion.div>
                        <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">Fast</div>
                            <div className="text-[10px] uppercase font-mono font-bold text-on-surface-variant tracking-[0.2em]">React + Vite</div>
                        </motion.div>
                        <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: 0.3 }}>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">Safe</div>
                            <div className="text-[10px] uppercase font-mono font-bold text-on-surface-variant tracking-[0.2em]">JWT Secured</div>
                        </motion.div>
                    </div>
                </section>

                {/* Ecosystem Section (Updated Tech Stack) */}
                <section id="tech" className="py-24 px-6 text-center">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Built with the Best</h2>
                        <p className="text-on-surface-variant mb-12">Powered by a modern, high-performance web stack.</p>

                        <motion.div
                            variants={stagger}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            className="flex flex-wrap justify-center gap-4 opacity-70 group"
                        >
                            {[
                                { name: "React", icon: <Code2 className="w-4 h-4" /> },
                                { name: "Node.js", icon: <Terminal className="w-4 h-4" /> },
                                { name: "Express", icon: <Zap className="w-4 h-4" /> },
                                { name: "Prisma ORM", icon: <Database className="w-4 h-4" /> },
                                { name: "MySQL", icon: <Database className="w-4 h-4" /> },
                                { name: "Tailwind CSS", icon: <Braces className="w-4 h-4" /> }
                            ].map((item) => (
                                <motion.div
                                    key={item.name}
                                    variants={fadeIn}
                                    whileHover={{ scale: 1.05, opacity: 1 }}
                                    className="px-6 py-3 rounded-lg flex items-center gap-2.5 bg-surface-container-high border border-outline-variant hover:border-primary/40 transition-colors"
                                >
                                    <span className="text-primary">{item.icon}</span>
                                    <span className="font-mono text-sm uppercase tracking-wider font-semibold">{item.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="px-6 pb-24">
                    <div className="max-w-7xl mx-auto glass-panel p-12 md:p-20 rounded-3xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[100px] -z-10" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 blur-[100px] -z-10" />

                        <div className="max-w-3xl">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to regain <span className="text-primary italic">Control?</span></h2>
                            <p className="text-lg text-on-surface-variant mb-10">
                                Stop fighting with Jira. Start building with DevTracker Pro.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button 
                                    onClick={() => navigate('/login')}
                                    className="px-8 py-4 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-2"
                                >
                                    Go to Workspace
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-outline-variant bg-surface-container-low/50 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2 font-bold text-lg mb-1">
                            <Activity className="w-5 h-5 text-primary" />
                            DevTracker Pro
                        </div>
                        <p className="text-xs text-on-surface-variant">© 2026 DevTracker Pro. Built by Darshan.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}