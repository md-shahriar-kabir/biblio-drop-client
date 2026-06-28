"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BsTruck } from "react-icons/bs";
import { Button } from "@heroui/react";
import Link from "next/link";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const BookCard = ({ book }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      className="bg-gradient-to-b from-gray-50/50 via-white to-white rounded-2xl border border-gray-100/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-200/50 transition-all duration-300 flex flex-col h-full group"
    >
      {/* Image Section */}
      <div className="relative h-[260px] flex items-center justify-center p-6 bg-gray-50/40 border-b border-gray-100/50 overflow-hidden">
        
        {/* Modern Glassmorphic Delivery Fee Badge */}
        <div className="absolute z-10 flex items-center gap-1.5 top-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-100 px-2.5 py-1.5 rounded-xl text-[12px] font-bold shadow-sm text-[#2563EB]">
          <BsTruck size={14} className="text-[#2563EB]" />
          <span>
            {book.deliveryFee === "0" || book.deliveryFee === 0
              ? "Free"
              : `$${book.deliveryFee}`}
          </span>
        </div>

        {/* Book Cover Image Container with Interactive Depth Shadow */}
        <div className="relative w-36 h-48 shadow-[0_15px_30px_-8px_rgba(17,24,39,0.3)] group-hover:scale-105 group-hover:shadow-[0_20px_45px_-10px_rgba(124,58,237,0.4)] transition-all duration-300">
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-md"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        {/* Category Pill Tag */}
        <p className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-widest bg-[#7C3AED]/5 px-2 py-0.5 rounded-md inline-block w-fit mb-3">
          {book.category}
        </p>

        {/* Title */}
        <h3 className="text-lg font-black text-[#111827] mb-1 line-clamp-1 tracking-tight group-hover:text-[#7C3AED] transition-colors">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm font-medium text-gray-400 mb-6 flex-grow">
          by {book.author}
        </p>

        {/* Dynamic Action Button */}
        <Link href={`/browse-books/${book._id}`} className="w-full">
          <Button className="w-full bg-white hover:bg-[#7C3AED] text-[#111827] hover:text-white font-bold border border-gray-200 hover:border-[#7C3AED] rounded-xl transition-all duration-200 shadow-sm">
            Explore Book
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default BookCard;