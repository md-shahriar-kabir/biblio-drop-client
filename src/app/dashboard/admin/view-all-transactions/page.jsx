import { getOrderedBookForAdmin } from '@/lib/api/books';
import React from 'react';
import { FiDollarSign, FiCalendar, FiUser, FiHash, FiBook, FiActivity, FiArrowUpRight, FiLayers, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const ViewAllTransactions = async () => {
    // Fetching transaction/order data completely directly from API
    const orderedBooks = await getOrderedBookForAdmin() || [];

    // Pure backend analytical data pipeline aggregation logic
    const totalTransactions = orderedBooks.length;
    const totalAmount = orderedBooks.reduce((sum, order) => sum + parseFloat(order.price || 0), 0);

    // Helper function to cleanly format system timestamps
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // System-wide matching premium badge styles mapping
    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200/60 shadow-[0_2px_8px_rgba(16,185,129,0.08)]';
            case 'dispatched':
                return 'bg-blue-50 text-blue-700 border-blue-200/60 shadow-[0_2px_8px_rgba(59,130,246,0.08)]';
            case 'pending':
                return 'bg-amber-50 text-amber-700 border-amber-200/60 shadow-[0_2px_8px_rgba(245,158,11,0.08)]';
            default:
                return 'bg-slate-50 text-slate-600 border-slate-200/60';
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1400px] mx-auto space-y-8">
            
            {/* 🌟 1. PREMIUM HEADER SECTION WITH SUBTEXT */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-sm shrink-0">
                            <FiLayers size={15} />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-[#0D3B66] tracking-tight">
                            Master Transaction Ledger
                        </h1>
                    </div>
                    <p className="text-xs font-semibold text-slate-400 pl-10">
                        Monitor system-wide payment parameters, revenue streams, and automated logistics logs securely.
                    </p>
                </div>
            </div>

            {/* 🔮 2. LUXURY INTERACTIVE METRICS CARD MATRIX CONTAINER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* Total Revenue Box Amount */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] to-[#2e1065] p-6 rounded-2xl border border-purple-950 text-white shadow-[0_15px_30px_rgba(124,58,237,0.1)] group">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
                    <div className="flex justify-between items-start">
                        <div className="space-y-1.5">
                            <p className="text-[10px] font-black tracking-widest uppercase text-purple-300">Total Gross Amount</p>
                            <h3 className="text-3xl font-black tracking-tight">${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                        </div>
                        <div className="w-10 h-10 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-500/30 flex items-center justify-center">
                            <FiDollarSign size={18} strokeWidth={2.5} />
                        </div>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 mt-4">
                        <FiTrendingUp size={12} /> Live synchronized cloud audit funds data
                    </p>
                </div>

                {/* Total Transacted Pipeline Volume */}
                <div className="relative overflow-hidden bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-purple-100/50 shadow-[0_10px_30px_rgba(124,58,237,0.01)] group">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-600/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
                    <div className="flex justify-between items-start">
                        <div className="space-y-1.5">
                            <p className="text-[10px] font-black tracking-widest uppercase text-slate-400">Total Processed Logs</p>
                            <h3 className="text-3xl font-black tracking-tight text-[#0D3B66]">{totalTransactions.toLocaleString()} <span className="text-xs font-bold text-slate-400">Trx</span></h3>
                        </div>
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 flex items-center justify-center">
                            <FiLayers size={18} strokeWidth={2.5} />
                        </div>
                    </div>
                    <p className="text-[10px] font-bold text-purple-500 flex items-center gap-1 mt-4">
                        <FiCheckCircle size={12} /> Total pipeline payload executions completed
                    </p>
                </div>
            </div>

            {/* 🗂️ 3. LUXURY GLASS-MORPHIC DATA GRID TABLE */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-purple-100/50 shadow-[0_20px_50px_rgba(124,58,237,0.02)] overflow-hidden relative">
                
                {/* Horizontal Scrolling Box Container Layer with Styled Scrollbars */}
                <div className="w-full overflow-x-auto pb-1 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-purple-50/20 [&::-webkit-scrollbar-thumb]:bg-purple-200 hover:[&::-webkit-scrollbar-thumb]:bg-purple-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <table className="w-full text-left border-collapse min-w-[1050px]">
                        
                        {/* Interactive Premium Table Header */}
                        <thead>
                            <tr className="bg-purple-50/40 border-b border-purple-100/40 text-purple-900/80 text-[11px] font-black uppercase tracking-widest">
                                <th className="px-6 py-4.5">
                                    <div className="flex items-center gap-2">
                                        <FiHash className="text-purple-400" size={13} strokeWidth={2.5} />
                                        <span>Transaction ID</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4.5">
                                    <div className="flex items-center gap-2">
                                        <FiUser className="text-purple-400" size={13} strokeWidth={2.5} />
                                        <span>User Email</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4.5">
                                    <div className="flex items-center gap-2">
                                        <FiBook className="text-purple-400" size={13} strokeWidth={2.5} />
                                        <span>Librarian Email</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4.5">
                                    <div className="flex items-center gap-2">
                                        <FiDollarSign className="text-purple-400" size={13} strokeWidth={2.5} />
                                        <span>Amount</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4.5">
                                    <div className="flex items-center gap-2">
                                        <FiActivity className="text-purple-400" size={13} strokeWidth={2.5} />
                                        <span>Status</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4.5">
                                    <div className="flex items-center gap-2">
                                        <FiCalendar className="text-purple-400" size={13} strokeWidth={2.5} />
                                        <span>Timestamp</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        {/* Interactive Table Body Context */}
                        <tbody className="divide-y divide-purple-50/40 text-slate-700">
                            {orderedBooks && orderedBooks.length > 0 ? (
                                orderedBooks.map((order) => (
                                    <tr 
                                        key={order._id} 
                                        className="hover:bg-purple-50/20 transition-all duration-150 group"
                                    >
                                        {/* Transaction ID Column */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100/60 px-2.5 py-1 rounded-lg border border-slate-200/40 w-fit group-hover:border-purple-200 group-hover:bg-purple-50/50 transition-all" title={order.sessionId || order._id}>
                                                <span className="font-mono text-slate-500 text-[11px]">#</span>
                                                {order.sessionId ? order.sessionId.replace('cs_test_', '...').slice(-12) : order._id.slice(-8)}
                                            </div>
                                        </td>

                                        {/* User Email (Buyer) Column */}
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-black text-slate-700 tracking-tight">
                                                {order.buyerDetails?.email || order.userEmail || "Unknown"}
                                            </div>
                                        </td>

                                        {/* Librarian Email (Seller) Column */}
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-bold text-purple-600/90 flex items-center gap-1 group-hover:text-purple-700 transition-colors">
                                                <span>{order.librarianDetails?.email || "Unknown"}</span>
                                                <FiArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-purple-400" />
                                            </div>
                                        </td>

                                        {/* Amount Column */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-black text-[#0D3B66]">
                                                ${parseFloat(order.price || 0).toFixed(2)}
                                            </div>
                                        </td>

                                        {/* System Status Dynamic Badge Column */}
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-wider ${getStatusBadge(order.orderStatus)}`}>
                                                {order.orderStatus || "Unknown"}
                                            </span>
                                        </td>

                                        {/* Pure Date/Timestamp Column */}
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-semibold text-slate-400 group-hover:text-slate-500 transition-colors">
                                                {formatDate(order.OrderAt || order.createdAt)}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                /* Verified Dynamic Empty Ledger Matrix State */
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-2">
                                            <div className="w-12 h-12 bg-purple-50 rounded-2xl border border-purple-100 text-purple-500 flex items-center justify-center shadow-inner mb-2">
                                                <FiDollarSign size={22} className="animate-pulse" />
                                            </div>
                                            <h3 className="text-base font-black text-[#0D3B66]">No transactions found</h3>
                                            <p className="text-xs font-medium text-slate-400 leading-relaxed">
                                                There are currently no payload execution logs or active asset purchases recorded inside the master network database.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewAllTransactions;