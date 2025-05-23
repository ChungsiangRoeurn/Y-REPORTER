"use client";

import { socialLinks } from "@/lib/data";
import { navLinks } from "@/lib/navbar";
import { motion } from "framer-motion";
import { ArrowUp, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="mt-24 bg-slate-900 text-neutral-300 border-t border-slate-700 relative">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto px-6 py-12 grid gap-12 sm:grid-cols-2 md:grid-cols-3 text-sm"
            >
                {/* Brand */}
                <div className="flex flex-col items-center sm:items-start gap-4 text-center sm:text-left">
                    <div className="flex items-center gap-3 text-primary">
                        <BookOpen className="w-6 h-6 text-white" />
                        <span className="font-semibold text-lg text-white">YREPORTER</span>
                    </div>
                    <p className="text-neutral-400 max-w-xs text-sm">
                        Your personal library manager. Track, borrow, and report your reading easily.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col items-center sm:items-center gap-4">
                    <h4 className="text-base font-semibold text-white">Let&apos;s see</h4>
                    <div className="flex flex-col gap-2 items-center">
                        {navLinks.map(({ label, href, icon: Icon }) => (
                            <motion.a
                                key={label}
                                href={href}
                                className="text-neutral-400 hover:text-white transition-colors"
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    {label}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Social */}
                <div className="flex flex-col items-center gap-4">
                    <h4 className="text-base font-semibold text-white">Stay Connect</h4>
                    <div className="flex flex-wrap justify-center gap-4">
                        {socialLinks.map(({ href, icon: Icon, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                aria-label={label}
                                className="text-neutral-300 hover:text-white transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                    <p className="text-xs text-neutral-400 text-center">
                        This project is open-source and available on GitHub.
                    </p>
                </div>
            </motion.div>

            {showTop && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ArrowUp className="w-4 h-4" />
                </motion.button>
            )}

            <div className="border-t border-slate-700 text-xs text-neutral-500 py-6 text-center">
                &copy; {new Date().getFullYear()} Library Lister. All rights reserved.
            </div>
        </footer>
    );
}
