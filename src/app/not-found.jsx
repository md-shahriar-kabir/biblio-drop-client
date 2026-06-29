"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  return (
    <main className="min-h-screen w-full bg-[#FAF9F6] bg-[radial-gradient(#e2e0d9_1px,transparent_1px)] [background-size:24px_24px] flex items-center justify-center p-4 sm:p-6 select-text relative overflow-hidden">
      
      {/* 🔮 Premium Ambient Glowing Backdrop Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-tr from-purple-600/10 to-indigo-600/5 rounded-full blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-10 -right-10 w-48 h-48 bg-fuchsia-500/5 rounded-full blur-[60px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[550px] text-center space-y-8 sm:space-y-10">
        
        {/* 🎭 Animated 404 Visual Canvas */}
        <div className="relative select-none flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[110px] sm:text-[160px] font-black tracking-tighter bg-gradient-to-b from-[#0D3B66] to-[#1e1b4b] bg-clip-text text-transparent leading-none drop-shadow-sm select-none"
          >
            404
          </motion.h1>
          
          {/* Luxury Purple Rotating Rotated Badge */}
          <motion.div 
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "backOut" }}
            className="absolute bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] sm:text-[11px] font-black tracking-widest uppercase px-4 py-1 rounded-full shadow-[0_4px_15px_rgba(124,58,237,0.3)] top-[65%] rotate-[-4deg] border border-purple-400/20 flex items-center gap-1.5"
          >
            <FiAlertTriangle size={11} className="animate-pulse" />
            <span>Route Unresolved</span>
          </motion.div>
        </div>

        {/* ✉️ Glass-morphic Messaging Component Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100/60 shadow-[0_20px_50px_rgba(124,58,237,0.03)] p-6 sm:p-8 space-y-3.5 relative overflow-hidden"
        >
          {/* Visual inner border glow */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-200/50 to-transparent" />
          
          <h2 className="text-xl sm:text-2xl font-black text-[#0D3B66] tracking-tight">
            Looks like you're lost!
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-400 max-w-sm mx-auto leading-relaxed">
            The target data payload or dashboard context you are looking for doesn't exist, or has been relocated within our library cluster network.
          </p>
        </motion.div>

        {/* 🔘 Premium Operational Micro-Interaction Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto"
        >
          {/* History Router Back Button */}
          <Button
            onClick={() => window.history.back()}
            variant="bordered"
            className="w-full sm:w-auto h-11 px-6 border-purple-100 bg-white/60 backdrop-blur-sm text-purple-700 hover:bg-purple-50 hover:border-purple-200 font-black text-[11px] rounded-full transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"
          >
            <FiArrowLeft size={13} strokeWidth={3} />
            <span>Go Back</span>
          </Button>

          {/* Root Directory Redirect Link Button */}
          <Link
            href="/"
            className="w-full sm:w-auto h-11 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-[11px] rounded-full shadow-[0_4px_15px_rgba(124,58,237,0.2)] transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-widest border border-purple-500/20"
          >
            <FiHome size={13} strokeWidth={3} />
            <span>Return Home</span>
          </Link>
        </motion.div>

      </div>
    </main>
  );
};

export default NotFound;