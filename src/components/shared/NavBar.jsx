"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

import { MdMenu, MdClose } from "react-icons/md";
import { authClient } from "@/lib/auth-client";

import ProfileModal from "./NavProfileModal";

const NavBar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes("auth") || pathname.includes("dashboard")) {
    return null;
  }

  // Navigation Routes
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Books", path: "/browse-books" },
  ];

  if (user?.email) {
    navLinks.push({ name: "Dashboard", path: `/dashboard/${user?.role}` });
  }

  // DYNAMIC CONDITION: Check if the user is strictly on the home page
  const isHomePage = pathname === "/";

  return (
    <>
      {/* Outer fixed container */}
      <header className="w-full fixed top-5 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
        
        {/* --- DYNAMIC INTEL NAV (Adapts to Home Dark vs Other Light Pages) --- */}
        <nav
          className={`max-w-7xl h-[56px] mx-auto rounded-full flex items-center justify-between px-6 transition-all duration-300 pointer-events-auto ${
            isHomePage
              ? "bg-slate-950/40 backdrop-blur-xl border border-[#7C3AED]/30 hover:border-[#7C3AED]/60 shadow-[0_8px_32px_0_rgba(124,58,237,0.1)]"
              : "bg-white/70 backdrop-blur-md border border-[#7C3AED]/20 hover:border-[#7C3AED]/40 shadow-[0_4px_20px_rgba(124,58,237,0.06)]"
          }`}
        >
          
          {/* --- Brand Logo Area --- */}
          <Link
            href="/"
            className="flex items-center gap-2 select-none group"
          >
            <div 
              className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-transform group-hover:scale-105 border ${
                isHomePage 
                  ? "bg-[#7C3AED]/20 text-[#a78bfa] border-[#7C3AED]/30" 
                  : "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20"
              }`}
            >
              <svg 
                className="w-4 h-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <span className={`font-bold text-lg tracking-tight ${isHomePage ? "text-white" : "text-slate-900"}`}>
              Biblio<span className={isHomePage ? "text-[#a78bfa]" : "text-[#7C3AED]"}>Drop</span>
            </span>
          </Link>

          {/* --- Desktop Links Component --- */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-[14px] font-semibold tracking-wide transition-colors duration-200 h-full flex items-center ${
                    isActive 
                      ? (isHomePage ? "text-[#a78bfa]" : "text-[#7C3AED]") 
                      : (isHomePage ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900")
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className={`absolute bottom-0 left-1 right-1 h-[2.5px] rounded-full bg-[#7C3AED] ${
                        isHomePage ? "shadow-[0_0_8px_#7C3AED]" : ""
                      }`}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* --- Desktop Action Controls --- */}
          <div className="hidden md:flex items-center gap-4">
            {/* Notification drop indicator */}
            <button className={`p-2 relative group transition-colors focus:outline-none ${isHomePage ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>
              <span className="absolute top-2 right-2 flex h-1.5 w-1.5">
                {isHomePage && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75"></span>}
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7C3AED]"></span>
              </span>
              <svg className="w-[19px] h-[19px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Pill shaped buttons */}
            <div className="flex items-center gap-1.5">
              {user ? (
                <ProfileModal user={user} />
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className={`font-bold text-[14px] px-4 h-9 flex items-center justify-center transition-colors ${
                      isHomePage ? "text-slate-200 hover:text-white" : "text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className={`font-bold text-[13px] px-5 h-9 rounded-full shadow-sm flex items-center justify-center transition-all transform hover:scale-[1.01] whitespace-nowrap ${
                      isHomePage ? "bg-white text-slate-950 hover:bg-slate-100" : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* --- Mobile View Toggle Trigger --- */}
          <div className="flex md:hidden items-center gap-3">
            {user && <ProfileModal user={user} />}
            <button
              onClick={() => setIsOpen(true)}
              className={`p-1 text-2xl focus:outline-none transition-colors ${isHomePage ? "text-white hover:text-[#a78bfa]" : "text-slate-800 hover:text-[#7C3AED]"}`}
            >
              <MdMenu />
            </button>
          </div>
        </nav>
      </header>

      {/* --- Mobile Drawer (Synced Layout Theme) --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950 z-50 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
              className={`fixed top-4 right-4 bottom-4 w-[270px] border shadow-2xl rounded-3xl z-50 p-6 flex flex-col justify-between md:hidden ${
                isHomePage 
                  ? "bg-slate-950/90 backdrop-blur-xl border-[#7C3AED]/30 text-white" 
                  : "bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900"
              }`}
            >
              <div>
                <div className={`flex items-center justify-between border-b pb-4 mb-6 ${isHomePage ? "border-slate-800" : "border-slate-100"}`}>
                  <div className="flex items-center gap-2 select-none">
                    <div className={`flex items-center justify-center w-7 h-7 rounded-lg ${isHomePage ? "bg-[#7C3AED]/20 text-[#a78bfa]" : "bg-[#7C3AED]/10 text-[#7C3AED]"}`}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </div>
                    <span className="font-bold text-md">
                      Biblio<span className={isHomePage ? "text-[#a78bfa]" : "text-[#7C3AED]"}>Drop</span>
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-1 text-2xl transition-colors ${isHomePage ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    <MdClose />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-[14px] font-bold py-3 px-4 rounded-xl transition-all ${
                          isActive
                            ? (isHomePage ? "bg-[#7C3AED]/20 text-[#a78bfa]" : "bg-[#7C3AED]/10 text-[#7C3AED]")
                            : (isHomePage ? "text-slate-300 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50")
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Actions Drawer Footer */}
              <div className={`w-full border-t pt-4 pb-2 ${isHomePage ? "border-slate-800" : "border-slate-100"}`}>
                <div className="flex flex-col gap-2.5 w-full">
                  {!user && (
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsOpen(false)}
                      className={`font-bold text-[14px] h-10 rounded-full flex items-center justify-center border transition-all ${
                        isHomePage 
                          ? "text-slate-200 border-slate-800 hover:bg-white/5" 
                          : "text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Sign In
                    </Link>
                  )}

                  <Link
                    href="/auth/signup"
                    onClick={() => setIsOpen(false)}
                    className={`font-bold text-[14px] h-10 rounded-full flex items-center justify-center transition-all ${
                      isHomePage ? "bg-white text-slate-950" : "bg-slate-900 text-white"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;