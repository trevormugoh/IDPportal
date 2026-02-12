"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Mock authentication
        setTimeout(() => {
            if (email === "admin@somoafrica.org" && password === "Abc123***") {
                localStorage.setItem("isLoggedIn", "true");
                router.push("/dashboard");
            } else {
                setError("Invalid email or password. Please try again.");
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-somo-gray px-4 font-inter">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl"
            >
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="mb-6"
                    >
                        <Image
                            src="/images/auth/auth-logo.png"
                            alt="Somo Logo"
                            width={120}
                            height={120}
                            className="object-contain"
                        />
                    </motion.div>
                    <h2 className="text-center font-quicksand text-3xl font-bold text-somo-blue">
                        IDP Portal Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Enter your credentials to access the development platform
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 leading-5 placeholder-gray-400 focus:border-somo-orange focus:bg-white focus:outline-none focus:ring-1 focus:ring-somo-orange transition-all"
                                placeholder="admin@somoafrica.org"
                            />
                        </div>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 leading-5 placeholder-gray-400 focus:border-somo-orange focus:bg-white focus:outline-none focus:ring-1 focus:ring-somo-orange transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600"
                        >
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative flex w-full justify-center rounded-xl bg-somo-orange py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-[#B34E00] focus:outline-none focus:ring-2 focus:ring-somo-orange focus:ring-offset-2 disabled:opacity-70"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            "Sign in"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Somo Africa. All rights reserved.
                </div>
            </motion.div>
        </div>
    );
}
