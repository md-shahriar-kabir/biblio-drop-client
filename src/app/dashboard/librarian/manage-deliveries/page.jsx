import DeliveryTable from '@/components/dashboard/librarian/DeliveryTable';
import { getCurrentLibrarianOrderedBook } from '@/lib/api/books';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import { FiTruck, FiPackage, FiCheckCircle, FiClock } from 'react-icons/fi';

const ManageDeliveries = async () => {
  const userData = await getUserSession();
  const user = userData?.user;

  // Fetching the aggregated data from your Express backend (100% Identical Functionality)
  const orderedBook = await getCurrentLibrarianOrderedBook(user?.id) || [];
  console.log(orderedBook);

  // Quick Dynamic Analytics based on your data structure
  const totalOrders = orderedBook.length;
  const pendingDeliveries = orderedBook.filter(
    (order) => order.orderStatus?.toLowerCase() === "pending" || order.orderStatus?.toLowerCase() === "dispatched"
  ).length;
  const completedDeliveries = orderedBook.filter(
    (order) => order.orderStatus?.toLowerCase() === "delivered"
  ).length;

  return (
    <div className="space-y-8 w-full max-w-[1400px] mx-auto p-4 md:p-6 bg-gradient-to-tr from-purple-50/30 via-transparent to-indigo-50/20 rounded-3xl animate-fadeIn">
      
      {/* --- PREMIUM HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-100/50 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0D3B66] tracking-tight flex items-center gap-2.5">
            <FiTruck className="text-purple-600" size={28} /> Logistics & Deliveries
          </h1>
          <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
            Track, monitor, and instantly update dispatch status for decentralized book requests.
          </p>
        </div>
        
        {/* Dynamic Status Pill */}
        <div className="self-start md:self-auto bg-purple-50 border border-purple-100/60 text-purple-700 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
          Fulfillment Hub Active
        </div>
      </div>

      {/* --- QUICK METRICS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Card 1: Total Orders */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-purple-100/60 shadow-[0_10px_30px_rgba(124,58,237,0.02)] flex items-center gap-4 relative overflow-hidden group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl border border-blue-100/50 shadow-sm">
            <FiPackage strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Total Consignments</p>
            <h3 className="text-2xl font-black text-[#0D3B66] mt-0.5">{totalOrders}</h3>
          </div>
        </div>

        {/* Card 2: Active / Pipeline Shipments */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-purple-100/60 shadow-[0_10px_30px_rgba(124,58,237,0.02)] flex items-center gap-4 relative overflow-hidden group">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl border border-amber-100/50 shadow-sm">
            <FiClock strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">In Transit / Pending</p>
            <h3 className="text-2xl font-black text-[#0D3B66] mt-0.5">{pendingDeliveries}</h3>
          </div>
          {pendingDeliveries > 0 && (
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping absolute top-4 right-4" />
          )}
        </div>

        {/* Card 3: Handed Over / Delivered */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-purple-100/60 shadow-[0_10px_30px_rgba(124,58,237,0.02)] flex items-center gap-4 relative overflow-hidden group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl border border-emerald-100/50 shadow-sm">
            <FiCheckCircle strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Successfully Delivered</p>
            <h3 className="text-2xl font-black text-[#0D3B66] mt-0.5">{completedDeliveries}</h3>
          </div>
        </div>
      </div>

      {/* --- MAIN DELIVERY DATA CONTAINER --- */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-purple-100/40 shadow-[0_20px_50px_rgba(13,59,102,0.03)] overflow-hidden p-2 md:p-4">
        {/* Passing the identical data properties to the Client Component */}
        <DeliveryTable orders={orderedBook} />
      </div>

    </div>
  );
};

export default ManageDeliveries;