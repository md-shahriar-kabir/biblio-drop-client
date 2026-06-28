// import { getAllBooks } from "@/lib/api/books";
import React from "react";
import BooksContainer from "../BrowseBooks/BooksContainer";
import { getAllBooks } from "@/lib/api/books";
import { FiGrid } from "react-icons/fi";

const FeaturedBooks = async () => {
  const data = await getAllBooks();
  
  const allBooks = Array.isArray(data) ? data : (data?.books || []);
  const books = allBooks.filter((book) => book.status === "approved").slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Glow Decorative Pattern */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Animated/Glowing Mini Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <FiGrid className="animate-pulse" /> Curated Catalog
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-[#111827] mb-4 tracking-tight leading-none">
            Featured <span className="text-[#7C3AED]">Books</span>
          </h2>

          {/* Underline design featuring your Primary brand accent color */}
          <div className="w-20 h-1 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] mx-auto rounded-full mb-6"></div>

          <p className="text-gray-500 max-w-3xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            Your neighborhood’s finest collections, all in one place. Browse exceptional titles vetted by fellow book lovers and find your next unforgettable journey without leaving the couch.
          </p>
        </div>

        {/* Books Grid Container with light wrapper elevation layout */}
        <div className="mx-auto p-2 bg-gray-50/50 rounded-3xl border border-gray-100/80 shadow-inner">
          <BooksContainer books={books} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;