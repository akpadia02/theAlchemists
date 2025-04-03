import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Newspaper } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get current path

    return (
        <nav className="bg-white fixed w-full top-0 z-50 shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Left: Logo + Name */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl"><Newspaper /></span>
                    <span className="text-xl font-semibold">The Alchemists</span>
                </div>

                {/* Center: Navigation */}
                <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
                    {["/"].map((path, index) => (
                        <li key={index}>
                            <button
                                onClick={() => { setIsOpen(false); navigate(path); }}
                                className={`px-3 py-1 rounded-md transition-all ${
                                    location.pathname === path ? "text-blue-500 font-semibold" : "hover:text-blue-500"
                                }`}
                            >
                                {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(true)}>
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed right-0 top-0 h-full w-2/3 bg-white shadow-lg flex flex-col items-start py-10 px-6 gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsOpen(false)}>
                                &times;
                            </button>

                            {["/", "/About-us", "/News", "/Quiz", "/Contact"].map((path, index) => (
                                <Link
                                    key={index}
                                    to={path}
                                    onClick={() => { setIsOpen(false); navigate(path); }}
                                    className={`text-lg transition-all ${
                                        location.pathname === path ? "text-blue-500 font-semibold" : "hover:text-blue-500"
                                    }`}
                                >
                                    {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
                                </Link>
                            ))}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
