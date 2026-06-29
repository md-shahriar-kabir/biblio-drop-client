import DeliveryHistoryTable from '@/components/dashboard/User/DeliveryHistoryTable/page';
import { getDeliveryOrder } from '@/lib/api/order';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import { FiClock, FiPackage } from 'react-icons/fi';

const DeliveryHistory = async () => {
  const { user } = await getUserSession();
  
  // Fetch user's orders (Functionality remains 100% same)
  const myOrder = await getDeliveryOrder(user?.id);

  return (
    <div className="space-y-8 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 bg-gradient-to-tr from-purple-50/40 via-transparent to-indigo-50/30 rounded-3xl animate-fadeIn">
      
      {/* 🔮 --- PREMIUM DELIVERY HISTORY HERO BANNER --- */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e1b4b] via-[#2e1065] to-[#120626] p-6 md:p-8 text-white shadow-[0_20px_50px_rgba(124,58,237,0.12)]">
        {/* গ্লোয়িং ব্যাকগ্রাউন্ড ব্যাকড্রপস */}
        <div className="absolute -right-10 -top-20 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            {/* মডার্ন স্ট্যাটাস ব্যাজ */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-purple-300 border border-purple-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" /> 
              Real-time Logistics
            </span>
            
            {/* বোল্ড হেডার */}
            <h1 className="mt-3 text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
              Delivery Shipment Logs
            </h1>
            
            {/* ডেসক্রিপশন */}
            <p className="mt-1.5 text-xs md:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
              Monitor your active textbook shipments, verify fulfillment timelines, and review past transaction dispatches instantly.
            </p>
          </div>
          
          {/* কুইক ট্র্যাক কাউন্টার উইজেট */}
          <div className="flex items-center gap-3.5 bg-white/5 backdrop-blur-xl rounded-2xl p-3.5 border border-white/10 self-start md:self-auto shadow-inner">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 border border-purple-500/30">
              <FiPackage className="animate-bounce [animation-duration:3s]" size={18} />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Total Consignments</p>
              <p className="text-xs font-bold text-purple-300">
                {myOrder?.length || 0} Orders Found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- DATA TABLE SECTION --- */}
      <div className="bg-white rounded-3xl border border-purple-100/60 shadow-[0_15px_40px_rgba(124,58,237,0.03)] p-2 md:p-4 overflow-hidden">
        <DeliveryHistoryTable orders={myOrder} />
      </div>

    </div>
  );
};

export default DeliveryHistory;