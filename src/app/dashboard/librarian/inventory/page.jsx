import BooksTable from "@/components/dashboard/librarian/BooksTable";
import { getCurrentLibrarianBook } from "@/lib/api/books";
import { getUserSession } from "@/lib/core/session";
import { FiBox, FiLayers, FiAlertCircle } from "react-icons/fi";

import React from "react";

const inventoryPage = async () => {
  const user = await getUserSession();
  const userId = user?.user?.id;
  const books = await getCurrentLibrarianBook(userId) || [];

  // Logic for counting statuses if needed later, right now focusing on total items
  const totalBooks = books.length;

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 animate-fadeIn">
      
      {/* --- PREMIUM HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0D3B66] tracking-tight flex items-center gap-2.5">
            <FiBox className="text-purple-600" size={28} /> Central Inventory
          </h1>
          <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
            Manage, audit, and track your active book listings inside the provider network.
          </p>
        </div>
        
        {/* Quick Badge Counter */}
        <div className="self-start md:self-auto bg-purple-50 border border-purple-100 text-purple-700 font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
          Live Sync Active
        </div>
      </div>

      {/* --- STATS OVERVIEW CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Card 1: Total Books */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_15px_40px_rgba(13,59,102,0.03)] flex items-center justify-between relative overflow-hidden group">
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-purple-600/5 rounded-full blur-2xl group-hover:bg-purple-600/10 transition-colors" />
          <div className="space-y-1">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Total Inventory Items</p>
            <h3 className="text-3xl font-black text-[#0D3B66]">{totalBooks}</h3>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center border border-purple-100 shadow-sm">
            <FiLayers size={20} strokeWidth={2.2} />
          </div>
        </div>

        {/* Card 2: Placeholder for Active Stock (Can be dynamic based on your requirement) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_15px_40px_rgba(13,59,102,0.03)] flex items-center justify-between relative overflow-hidden group">
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl group-hover:bg-emerald-600/10 transition-colors" />
          <div className="space-y-1">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Available For Rent</p>
            <h3 className="text-3xl font-black text-slate-800">
              {books.filter(b => b.status !== "pending").length}
            </h3>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Card 3: Pending Approvals */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_15px_40px_rgba(13,59,102,0.03)] flex items-center justify-between relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-amber-600/5 rounded-full blur-2xl group-hover:bg-amber-600/10 transition-colors" />
          <div className="space-y-1">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Awaiting Verification</p>
            <h3 className="text-3xl font-black text-slate-800">
              {books.filter(b => b.status === "pending").length}
            </h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100 shadow-sm">
            <FiAlertCircle size={20} strokeWidth={2.2} />
          </div>
        </div>

      </div>

      {/* --- DATA TABLE CONTAINER --- */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(13,59,102,0.04)] overflow-hidden p-2 md:p-4">
        <BooksTable books={books} />
      </div>

    </div>
  );
};

export default inventoryPage;