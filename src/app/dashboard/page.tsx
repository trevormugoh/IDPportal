"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    ExternalLink,
    Settings,
    LogOut,
    LayoutDashboard,
    Server,
    Globe,
    CheckCircle2,
    Clock
} from "lucide-react";

const PROJECTS = {
    production: [
        { id: 1, name: "Digikua Admin", domain: "dk.app.somoafrica.org/login", status: "active" },
        { id: 2, name: "Digikua Business", domain: "business.app.somoafrica.org/login", status: "active" },
        { id: 3, name: "Weekly Tracker", domain: "weeklyactualssomo.vercel.app/", status: "active" },
        { id: 6, name: "Loans", domain: "loans.somoafrica.org/#/home", status: "active" },
    ],
    staging: [
        { id: 4, name: "Digikua Admin", domain: "staging.app.somoafrica.org/login", status: "active" },
        { id: 5, name: "Digikua Business", domain: "business-staging.app.somoafrica.org/login", status: "active" },
    ]
};

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<"production" | "staging">("production");
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        router.push("/login");
    };

    const filteredProjects = PROJECTS[activeTab].filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.domain.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-somo-gray font-inter">
            {/* Sidebar / Header */}
            <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white px-8 shadow-sm">
                <div className="flex items-center gap-4">
                    <Image
                        src="/images/auth/auth-logo.png"
                        alt="Somo Logo"
                        width={48}
                        height={48}
                    />
                    <h1 className="font-quicksand text-2xl font-bold text-somo-blue">IDP Portal</h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 w-64 rounded-xl border border-gray-100 bg-gray-50 pl-10 pr-4 text-sm focus:border-somo-orange focus:bg-white focus:outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl p-8">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="font-quicksand text-3xl font-bold text-somo-blue">Deployment Overview</h2>
                        <p className="mt-1 text-[13px] text-gray-500">View project deployments across environments on the development platform</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8 flex gap-2 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab("production")}
                        className={`relative px-6 py-3 text-sm font-bold transition-colors ${activeTab === "production" ? "text-somo-orange" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Server className="h-4 w-4" />
                            Production
                        </div>
                        {activeTab === "production" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 h-0.5 w-full bg-somo-orange"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("staging")}
                        className={`relative px-6 py-3 text-sm font-bold transition-colors ${activeTab === "staging" ? "text-somo-orange" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Staging
                        </div>
                        {activeTab === "staging" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 h-0.5 w-full bg-somo-orange"
                            />
                        )}
                    </button>
                </div>

                {/* Projects Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group relative flex flex-col rounded-2xl bg-white p-4 border border-gray-100 shadow-sm transition-all hover:shadow-md sm:p-5"
                            >
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="rounded-xl bg-somo-gray p-2 text-somo-blue transition-colors group-hover:bg-somo-orange/10 group-hover:text-somo-orange">
                                        <Globe className="h-5 w-5" />
                                    </div>
                                    <div className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${project.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                        <CheckCircle2 className="h-2.5 w-2.5" />
                                        {project.status}
                                    </div>
                                </div>

                                <h3 className="font-quicksand text-base font-bold text-somo-blue">{project.name}</h3>
                                <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-400">
                                    <span>{project.domain}</span>
                                    <a href={`https://${project.domain}`} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-3 w-3 transition-colors hover:text-somo-orange" />
                                    </a>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
                                    <div className="text-[10px] text-gray-400">
                                        Environment: <span className="font-bold text-gray-600 capitalize">{activeTab}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProjects.length === 0 && (
                    <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
                        <LayoutDashboard className="mb-2 h-10 w-10 opacity-20" />
                        <p>No projects found matching your search</p>
                    </div>
                )}
            </main>
        </div>
    );
}
