import { getBookById } from "@/lib/api/books";
import Image from "next/image";
import Link from "next/link";
import { BsTruck } from "react-icons/bs";
import { IoMdLogIn } from "react-icons/io";
import { BiBookOpen, BiCalendar } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FiChevronRight, FiBookmark, FiEdit2, FiAlertCircle } from "react-icons/fi";
import { Button } from "@heroui/react";
import { getDeliveryOrder } from "@/lib/api/order";
import { getUserSession } from "@/lib/core/session";
import { EditBookModal } from "@/components/dashboard/librarian/EditBookModal";
import DeleteButton from "./DeleteButton";
import Unpublished from "./Unpublished";
import UserReviewForm from "./UserReviewForm";

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const book = await getBookById(id);

  return {
    title: `${book?.title} || ${book?.author}`,
    description: book?.description,
  };
}

const BookDetailsPage = async ({ params }) => {
  const { id } = await params;
  const book = await getBookById(id);

  const userSession = await getUserSession();
  const user = userSession?.user;
  const orderList = (await getDeliveryOrder(user?.id)) || [];

  const isExistInOrderList = orderList.find((order) => order.productId === book?._id?.toString());

  const isDelivered = isExistInOrderList?.orderStatus === 'delivered';
  const isPending = isExistInOrderList?.orderStatus === 'pending';

  if (!book) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-800 gap-3">
        <FiAlertCircle size={40} className="text-rose-500" />
        <h2 className="font-black text-2xl tracking-tight">Book not found</h2>
        <p className="text-xs text-gray-400 font-medium">The print may have been removed or relocated.</p>
      </div>
    );
  }

  const editButton = (
    <Button
      size="sm"
      variant="bordered"
      className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 font-bold h-10 px-4 rounded-xl flex items-center gap-2 shadow-sm transition-all"
    >
      <FiEdit2 size={13} />
      Edit Details
    </Button>
  );

  const isLibrarianOwner = user?.id && book.userId === user.id;
  let hasAlreadyRequested = false;

  if (user?.id && !isLibrarianOwner) {
    try {
      hasAlreadyRequested = orderList.some(
        (order) => order.productId === book._id.toString(),
      );
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  }

  const isGloballyAvailable = book.status !== "checked_out";
  const canRequest = isGloballyAvailable && !hasAlreadyRequested && !isLibrarianOwner;

  let statusText = "Available";
  let statusColor = "bg-emerald-500 ring-emerald-100";

  if (isLibrarianOwner) {
    statusText = isGloballyAvailable ? "Available" : "Checked Out";
    statusColor = isGloballyAvailable ? "bg-emerald-500 ring-emerald-100" : "bg-slate-400 ring-slate-100";
  } else if (hasAlreadyRequested) {
    statusText = isPending ? "Pending for Delivery" : "Already Requested";
    statusColor = isPending ? "bg-amber-500 ring-amber-100" : "bg-blue-500 ring-blue-100";
  } else if (!isGloballyAvailable) {
    statusText = "Checked Out";
    statusColor = "bg-slate-400 ring-slate-100";
  }

  const descriptionParagraphs = book.description ? book.description.split("\n\n") : [];
  const formattedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown Date";

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400 mb-10 font-bold uppercase tracking-wider">
          <Link href="/browse" className="hover:text-[#7C3AED] transition-colors">
            Browse Books
          </Link>
          <FiChevronRight size={14} className="text-gray-300" />
          <span className="hover:text-slate-700 cursor-pointer transition-colors max-w-[120px] truncate">
            {book.category || "Category"}
          </span>
          <FiChevronRight size={14} className="text-gray-300" />
          <span className="text-slate-800 max-w-[200px] truncate">{book.title}</span>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT PANEL: Sticky Media Element Card */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-8">
            <div className="relative bg-slate-100 border border-slate-200/60 rounded-3xl p-8 flex items-center justify-center min-h-[460px] shadow-sm overflow-hidden group">
              
              {/* Floating Glassmorphic Status Indicator Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-black text-slate-700 shadow-sm border border-slate-100/80 flex items-center gap-2 z-10">
                <span className={`w-2 h-2 rounded-full animate-pulse ring-4 ${statusColor}`}></span>
                {statusText}
              </div>

              {/* Enhanced 3D Book Cover Mesh layout */}
              <div className="relative w-full max-w-[240px] aspect-[2/3] shadow-[0_20px_40px_rgba(15,23,42,0.15)] rounded-xl transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_30px_60px_rgba(15,23,42,0.25)]">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover rounded-xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Premium Stat Blocks Container Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm text-center">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-[#7C3AED] mb-3">
                  <BsTruck size={18} />
                </div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
                  Delivery Fee
                </span>
                <span className="text-xl font-black text-slate-800">
                  {book.deliveryFee === "0" || book.deliveryFee === 0 ? "Free" : `$${book.deliveryFee}`}
                </span>
              </div>
              
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm text-center">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#2563EB] mb-3">
                  <BiBookOpen size={18} />
                </div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
                  Print Edition
                </span>
                <span className="text-xl font-black text-slate-800">
                  Hardcover
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Meta Information & Action Buttons */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
                {book.title}
              </h1>

              {/* Dynamic Subheader Details Metagrid Row */}
              <div className="flex flex-wrap items-center gap-y-3 gap-x-4 text-sm font-semibold">
                <p className="text-gray-500">
                  By <span className="font-extrabold text-[#7C3AED]">{book.author}</span>
                </p>
                <div className="w-1 h-4 bg-slate-200 rounded-full hidden sm:block"></div>
                
                <div className="flex items-center gap-1.5 text-gray-400 font-medium text-xs">
                  <BiCalendar size={15} />
                  <span>Added {formattedDate}</span>
                </div>
                <div className="w-1 h-4 bg-slate-200 rounded-full hidden sm:block"></div>

                {/* Rating Framework Indicators */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(4)].map((_, i) => <FaStar key={i} size={13} />)}
                  <FaStar size={13} className="text-amber-200" />
                  <span className="text-xs text-slate-700 font-bold ml-1.5">(4.8 / 124 Verified Reviews)</span>
                </div>
              </div>
            </div>

            {/* Document Profile Description Panel */}
            <div className="text-slate-600 text-[15px] leading-[1.75] space-y-4 max-w-3xl border-l-2 border-slate-200 pl-4">
              {descriptionParagraphs.length > 0 ? (
                descriptionParagraphs.map((para, idx) => (
                  <p key={idx} className="font-medium">{para}</p>
                ))
              ) : (
                <p className="font-medium">{book.description}</p>
              )}
            </div>

            {/* Grid Specifications Container Metadata block */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-sm">
              <div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">ISBN</p>
                <p className="text-xs font-bold text-slate-800">978-0-12-345678-9</p>
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Publisher</p>
                <p className="text-xs font-bold text-slate-800">LogisPress</p>
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Weight Metrics</p>
                <p className="text-xs font-bold text-slate-800">1.2 lbs / 540g</p>
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Storage Location</p>
                <p className="text-xs font-bold text-slate-800">Zone A, Shelf 4</p>
              </div>
            </div>

            {/* Call to Actions Wrapper Panels */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {canRequest ? (
                user ? (
                  <form action={"/api/payment"} method="POST">
                    <input type="hidden" name="price" value={book.deliveryFee} />
                    <input type="hidden" name="title" value={book.title} />
                    <input type="hidden" name="productId" value={book._id.toString()} />

                    <Button
                      type="submit"
                      size="lg"
                      className="bg-purple-800 hover:bg-purple-600 text-white font-bold px-8 h-12 rounded-xl flex items-center gap-2.5 transition-all shadow-md shadow-orange-500/10"
                    >
                      <BsTruck size={16} />
                      Request Delivery
                    </Button>
                  </form>
                ) : (
                  <Link href={"/auth/signin"}>
                    <Button
                      type="button"
                      size="lg"
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold px-8 h-12 rounded-xl flex items-center gap-2.5 transition-all shadow-md shadow-purple-500/10"
                    >
                      <IoMdLogIn size={16} />
                      Please Login
                    </Button>
                  </Link>
                )
              ) : (
                <Button
                  size="lg"
                  isDisabled
                  className="bg-slate-200 text-slate-400 font-bold px-8 h-12 rounded-xl flex items-center gap-2.5 opacity-80 cursor-not-allowed"
                >
                  <BsTruck size={16} />
                  {isLibrarianOwner
                    ? "Your Book"
                    : hasAlreadyRequested
                      ? isPending ? "Pending for Delivery" : "Already in Reading List"
                      : "Currently Unavailable"}
                </Button>
              )}

              {user && (
                <Button
                  size="lg"
                  variant="bordered"
                  className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-bold px-7 h-12 rounded-xl flex items-center gap-2 shadow-sm transition-all"
                >
                  <FiBookmark size={16} className="text-slate-400" />
                  Save for Later
                </Button>
              )}
            </div>

            {/* PENDING SECTION: Visible context only if order is flagged as pending */}
            {isPending && (
              <div className="pt-2 animate-fadeIn">
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                  <div className="bg-amber-100 text-amber-600 p-2.5 rounded-xl shrink-0">
                    <BsTruck size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-amber-800 mb-0.5">Delivery Status Pending</h3>
                    <p className="text-xs font-semibold text-amber-600/90 leading-relaxed">
                      Your request has been securely logs. Please stand by while independent agents process transit data routines.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* REVIEW SECTION: Conditionally loaded upon successful deliveries */}
            {isDelivered && (
              <div className="border-t border-slate-200/80 pt-8 mt-4">
                <h3 className="text-lg font-black text-slate-900 mb-4 tracking-tight">
                  Leave a Review
                </h3>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <UserReviewForm book={book} user={user}/>
                </div>
              </div>
            )}

            {/* PROVIDER MAINTENANCE UTILITIES: Accessible purely to original librarian profile */}
            {isLibrarianOwner && (
              <div className="border-t border-slate-200/80 pt-6 mt-6">
                <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Provider Administrative Controls
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <EditBookModal book={book} editButton={editButton} />
                  <Unpublished id={book._id.toString()} />
                  <DeleteButton id={book._id.toString()} />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;