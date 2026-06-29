"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

  if (pathname.includes("auth")) {
    return null;
  }
  if (pathname.includes("dashboard")) {
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

  return (
    <>
      <nav className="w-full h-[68px] border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl h-full mx-auto px-6 flex items-center justify-between">
          
          {/* --- Brand Custom Logo: Biblio Drop --- */}
          <Link
            href="/"
            className="flex items-center gap-2 select-none group"
          >
            <div className="relative flex items-center justify-center w-9 h-9 bg-[#7C3AED]/10 rounded-xl text-[#7C3AED] transition-transform group-hover:scale-105">
              <svg 
                className="w-5 h-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M14 6c0 1.5 1.5 2.5 1.5 2.5S17 7.5 17 6s-1-2-1.5-2S14 5 14 6z" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-[#111827]">
              Biblio<span className="text-[#7C3AED]">Drop</span>
            </span>
          </Link>

          {/* --- Desktop Central Navigation Menu --- */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-[15px] font-semibold transition-colors duration-200 h-full flex items-center ${
                    isActive
                      ? "text-[#7C3AED]"
                      : "text-[#111827] hover:text-[#7C3AED]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-[-1px] left-0 right-0 h-[3px] rounded-t-full bg-[#7C3AED]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* --- Desktop Utility Controls --- */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-5">
              
              {/* Animated Accent Drop/Notification Icon */}
              <button className="p-2 text-[#111827]/70 hover:text-[#F59E0B] relative group transition-colors focus:outline-none">
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F59E0B]"></span>
                </span>
                <svg 
                  className="w-[22px] h-[22px] transform group-hover:animate-bounce" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* Sign In Link */}
              {user ? (
                <>
                  <ProfileModal user={user} />
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="font-bold text-[15px] text-[#2563EB] hover:text-blue-700 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Get Started Button */}
              <Link
                href="/auth/signup"
                className="bg-[#7C3AED] text-white font-bold text-[15px] px-6 h-10 rounded-md shadow-sm hover:bg-purple-700 flex items-center justify-center transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* --- Small Devices Mobile Menu Trigger --- */}
          <div className="flex md:hidden items-center gap-3">
            {user && <ProfileModal user={user} />}
            <button
              onClick={() => setIsOpen(true)}
              className="text-[#111827] p-1 text-2xl focus:outline-none hover:text-[#7C3AED] transition-colors"
            >
              <MdMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Drawer Overlay Sheet Layout --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-[290px] bg-white shadow-2xl z-50 p-6 flex flex-col justify-between md:hidden transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  {/* Mobile Drawer Logo */}
                  <div className="flex items-center gap-2 select-none">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#7C3AED]/10 rounded-lg text-[#7C3AED]">
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
                    <span className="font-bold text-lg tracking-tight text-[#111827]">
                      Biblio<span className="text-[#7C3AED]">Drop</span>
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#111827] p-1 text-2xl outline-none hover:text-[#7C3AED] transition-colors"
                  >
                    <MdClose />
                  </button>
                </div>

                {/* Mobile Route List Links Component */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-[16px] font-semibold py-3 px-4 rounded-md transition-all ${
                          isActive
                            ? "bg-[#7C3AED]/10 text-[#7C3AED]"
                            : "text-[#111827] hover:bg-gray-50"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Action Dynamic Footer Grid */}
              <div className="w-full border-t border-gray-100 pt-5 pb-2 select-none transition-colors duration-300">
                <div className="flex flex-col gap-3 w-full">
                  {!user && (
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsOpen(false)}
                      className="text-[#2563EB] font-bold text-[16px] h-11 rounded-md border-2 border-[#2563EB] flex items-center justify-center hover:bg-blue-50 transition-all whitespace-nowrap"
                    >
                      Sign In
                    </Link>
                  )}

                  <Link
                    href="/auth/signup"
                    onClick={() => setIsOpen(false)}
                    className="bg-[#7C3AED] text-white font-bold text-[16px] h-11 rounded-md shadow-md hover:bg-purple-700 flex items-center justify-center transition-all whitespace-nowrap"
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