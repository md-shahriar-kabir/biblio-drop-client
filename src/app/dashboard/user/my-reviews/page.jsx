import React from 'react';
import Image from 'next/image';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiMessageSquare, FiBook, FiCalendar, FiLayers } from 'react-icons/fi';
import { getUserReviews } from '@/lib/api/reviews';
import DeleteReview from './DeleteReview';
import UpdateReviewModal from './UpdateReviewModal';
import { getUserSession } from '@/lib/core/session';

const MyReviews = async () => {
    // ডাটাবেস থেকে সব রিভিউ এবং ইউজারের সেশন কল করা হচ্ছে (Functionality remains 100% untouched)
    const allReviews = await getUserReviews() || [];
    const session = await getUserSession();
    
    // সেশন অবজেক্টের স্ট্রাকচার অনুযায়ী ইউজারের আইডি বের করা
    const currentUser = session?.user;
    const currentUserId = currentUser?.id || currentUser?._id; 

    // 🚀 মূল কাজ: শুধুমাত্র বর্তমান ইউজারের রিভিউগুলো ফিল্টার করা
    const reviews = allReviews.filter((item) => {
        return item?.userInfo?.id === currentUserId;
    });

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                    index < (rating || 0) ? (
                        <FaStar key={index} className="text-[#FBBF24] size-3.5" /> 
                    ) : (
                        <FaRegStar key={index} className="text-purple-200 size-3.5" />
                    )
                ))}
            </div>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown date";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-8 w-full max-w-[1400px] mx-auto p-4 md:p-6 bg-gradient-to-tr from-purple-50/40 via-transparent to-indigo-50/30 rounded-3xl animate-fadeIn mt-4">
            
            {/* 🔮 --- PREMIUM HERO BANNER --- */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e1b4b] via-[#2e1065] to-[#120626] p-6 md:p-8 text-white shadow-[0_20px_50px_rgba(124,58,237,0.12)]">
                {/* গ্লোয়িং ব্যাকগ্রাউন্ড ব্যাকড্রপস */}
                <div className="absolute -right-10 -top-20 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
                <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        {/* মডার্ন স্ট্যাটাস ব্যাজ */}
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-purple-300 border border-purple-500/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" /> 
                            Reader Opinions
                        </span>
                        
                        {/* বোল্ড হেডার */}
                        <h1 className="mt-3 text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
                            My Literary Reviews
                        </h1>
                        
                        {/* ডেসক্রিপশন */}
                        <p className="mt-1.5 text-xs md:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
                            Manage, edit, and keep track of all the footprints and critiques you have shared across your reading journey.
                        </p>
                    </div>
                    
                    {/* টোটাল রিভিউ কাউন্টার উইজেট */}
                    <div className="flex items-center gap-3.5 bg-white/5 backdrop-blur-xl rounded-2xl p-3.5 border border-white/10 self-start md:self-auto shadow-inner">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 border border-purple-500/30">
                            <FiMessageSquare className="animate-pulse" size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Total Feedbacks</p>
                            <p className="text-xs font-bold text-purple-300">
                                {reviews.length} Reviews Written
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- REVIEWS GRID SECTION --- */}
            {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((item) => {
                        // Crash Protection (আপনার অরিজিনাল লজিক)
                        const reviewText = typeof item.review === 'object' 
                            ? item.review?.review 
                            : item.review;

                        return (
                            <div 
                                key={item._id} 
                                className="bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100/50 shadow-[0_10px_30px_rgba(124,58,237,0.01)] hover:shadow-[0_20px_40px_rgba(124,58,237,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group"
                            >
                                {/* Main Content Area */}
                                <div className="p-5 md:p-6 flex-grow flex flex-col">
                                    
                                    {/* Top: Book Info & Actions */}
                                    <div className="flex justify-between items-start mb-4 gap-4">
                                        <div className="flex gap-4 items-center w-full">
                                            {/* Book Image */}
                                            <div className="w-16 h-24 relative flex-shrink-0 bg-purple-50 rounded-xl overflow-hidden shadow-sm border border-purple-100/40 flex items-center justify-center">
                                                {item.bookInfo?.image ? (
                                                    <Image 
                                                        src={item.bookInfo.image} 
                                                        alt={item.bookInfo?.title || "Book cover"}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                ) : (
                                                    <FiBook className="text-purple-300 size-6" />
                                                )}
                                            </div>
                                            
                                            {/* Book Details */}
                                            <div className="flex-grow">
                                                <h3 className="font-black text-[#0D3B66] text-base leading-tight mb-1 line-clamp-1" title={item.bookInfo?.title}>
                                                    {item.bookInfo?.title || "Unknown Book"}
                                                </h3>
                                                <p className="text-xs font-bold text-slate-400 mb-2 line-clamp-1" title={item.bookInfo?.author}>
                                                    By {item.bookInfo?.author || "Unknown Author"}
                                                </p>
                                                {renderStars(item.rating)}
                                            </div>
                                        </div>

                                        {/* Action Buttons (Edit & Delete) grouped in a sleek modern pill */}
                                        <div className="flex items-center gap-1 bg-purple-50/50 p-1 rounded-full border border-purple-100/50 opacity-90 group-hover:opacity-100 transition-opacity flex-shrink-0 shadow-sm">
                                            <UpdateReviewModal item={item}/> 
                                            <div className="w-[1px] h-4 bg-purple-200/60"></div>
                                            <DeleteReview id={item?._id}/>
                                        </div>
                                    </div>

                                    {/* Review Text Block */}
                                    <div className="relative bg-gradient-to-br from-purple-50/50 to-indigo-50/30 rounded-xl p-4 flex-grow border border-purple-100/30">
                                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-medium italic">
                                            "{reviewText || "No review text provided."}"
                                        </p>
                                    </div>
                                </div>

                                {/* Footer: Date Panel */}
                                <div className="bg-purple-50/20 px-6 py-3 border-t border-purple-50 flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                                        <FiCalendar size={13} className="mb-0.5 text-purple-400" />
                                        <span>{formatDate(item.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Empty State (Styled elegantly with Purple Accent) */
                <div className="w-full bg-white rounded-3xl border-2 border-purple-100 border-dashed p-16 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-purple-50 text-purple-300 rounded-2xl flex items-center justify-center mb-5 border border-purple-100 shadow-inner animate-pulse">
                        <FiMessageSquare size={26} />
                    </div>
                    <h3 className="text-lg font-black text-slate-700 mb-1.5">No reviews posted yet</h3>
                    <p className="text-xs font-semibold text-slate-400 max-w-sm leading-relaxed">
                        You haven't shared your thoughts on any books yet. Once you pen down a review, it will beautifully map into this terminal.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyReviews;