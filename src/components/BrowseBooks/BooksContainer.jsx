"use client";

import React from "react";
import { motion } from "framer-motion";
import BookCard from "./BookCard";
import { FiBook } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const BooksContainer = ({ books }) => {
  const approvedBooks = books.filter((book) => book.status === "approved");

  if (approvedBooks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[45vh] px-4 text-center relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
      >
        {/* Deep glowing background accent ring behind the icon */}
        <div className="w-24 h-24 bg-[#7C3AED]/10 rounded-full flex items-center justify-center mb-6 relative group">
          <div className="absolute inset-0 rounded-full bg-[#7C3AED]/20 animate-ping opacity-20" />
          <FiBook size={38} className="text-[#7C3AED]" strokeWidth={2} />
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-[#111827] mb-3 tracking-tight">
          No Books Available
        </h2>

        <p className="text-gray-400 text-[15px] max-w-sm leading-relaxed font-medium">
          There are currently no approved books to display. Please check back
          later as our Biblio Drop library is always growing.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full py-4 px-2">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {approvedBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </motion.div>
    </div>
  );
};

export default BooksContainer;