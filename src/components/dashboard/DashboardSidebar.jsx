"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Button } from "@heroui/react";

import {
  FiBookOpen,
  FiCheckSquare,
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiPackage,
  FiPlusCircle,
  FiTruck,
  FiUser,
  FiUsers,
  FiX,
  FiBook,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";
import SidebarSkeleton from "../Loading/SidebarSkeleton";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const userNavItems = [
    {
      name: "Overview",
      href: "/dashboard/user",
      icon: FiGrid,
    },
    {
      name: "Delivery History",
      href: "/dashboard/user/delivery-history",
      icon: FiTruck,
    },
    {
      name: "My Reading List",
      href: "/dashboard/user/reading-list",
      icon: FiBookOpen,
    },
    {
      name: "My Reviews",
      href: "/dashboard/user/my-reviews",
      icon: FiMessageSquare,
    },
  ];
  const librarianNavItems = [
    {
      name: "Overview",
      href: "/dashboard/librarian",
      icon: FiGrid,
    },
    {
      name: "Add Book",
      href: "/dashboard/librarian/add-book",
      icon: FiPlusCircle,
    },
    {
      name: "Manage Inventory",
      href: "/dashboard/librarian/inventory",
      icon: FiPackage,
    },
    {
      name: "Manage Deliveries",
      href: "/dashboard/librarian/manage-deliveries",
      icon: FiTruck,
    },
  ];
  const adminNavItems = [
    {
      name: "Overview",
      href: "/dashboard/admin",
      icon: FiGrid,
    },
    {
      name: "Book Approval Queue",
      href: "/dashboard/admin/book-approval-queue",
      icon: FiCheckSquare,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/users",
      icon: FiUsers,
    },
    {
      name: "View All Transactions",
      href: "/dashboard/admin/view-all-transactions",
      icon: FiCreditCard,
    },
  ];

  const navLinksMap = {
    user: userNavItems,
    librarian: librarianNavItems,
    admin: adminNavItems,
  };
  const navItems = navLinksMap[user?.role || "user"] || [];

  if (isPending) {
    return <SidebarSkeleton />;
  }

  return (
    <>
      {/* --- MOBILE TOP BAR NAVIGATION --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0F172A] flex items-center justify-between px-6 z-50 border-b border-slate-800/60 shadow-lg">
        <Link href="/dashboard" className="inline-flex items-center gap-2 select-none">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-[#7C3AED]">
            <FiBook size={16} strokeWidth={2} />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Biblio<span className="text-[#7C3AED]">Drop</span>
          </span>
        </Link>
        <Button
          isIconOnly
          variant="light"
          className="text-white bg-slate-800/40 hover:bg-slate-800/80 rounded-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </Button>
      </div>

      {/* --- BACKDROP FOR MOBILE --- */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- CORE SIDEBAR NAVIGATION CONTAINER --- */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-[260px] bg-[#0F172A] border-r border-slate-800/60 text-white flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 pt-24" : "-translate-x-full lg:pt-6"
        }`}
      >
        {/* UPPER PORTION */}
        <div className="space-y-6">
          {/* 1. BRAND LOGO SECTION */}
          <div className="relative z-10 w-full hidden lg:block select-none mb-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center text-[#7C3AED] shadow-sm group-hover:scale-105 transition-transform">
                <FiBook size={18} strokeWidth={2} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Biblio<span className="text-[#7C3AED]">Drop</span>
              </span>
            </Link>
          </div>

          {/* 2. USER PROFILE CARD CONTAINER */}
          <div className="flex items-center gap-3 bg-slate-800/20 border border-slate-800/40 rounded-2xl p-3.5 select-none w-full shadow-sm">
            <Avatar
              size="md"
              className={`w-12 h-12 ring-[2px] bg-slate-900 shrink-0 transition-all duration-300 ${
                user?.role === "admin"
                  ? "ring-rose-500/40"
                  : user?.role === "librarian"
                    ? "ring-sky-500/40"
                    : "ring-[#7C3AED]/40"
              }`}
            >
              <Avatar.Image
                alt={user?.name || "User Profile"}
                src={user?.image}
              />
              <Avatar.Fallback className="bg-slate-800 text-slate-200 font-semibold text-sm uppercase">
                {user?.name ? user?.name[0] : "U"}
              </Avatar.Fallback>
            </Avatar>

            <div className="flex flex-col text-left min-w-0 leading-normal">
              <span className="text-[15px] font-bold text-white tracking-wide truncate">
                {user?.name}
              </span>
              <span
                className={`text-[10px] font-bold tracking-widest uppercase truncate mt-1 px-2 py-0.5 rounded-md w-fit bg-slate-900/60 transition-colors duration-300 ${
                  user?.role === "admin"
                    ? "text-purple-400 border border-white"
                    : user?.role === "librarian"
                      ? "text-sky-400 border border-white"
                      : "text-emerald-400 border border-white"
                }`}
              >
                {user?.role}
              </span>
            </div>
          </div>

          {/* 3. DYNAMIC MENU NAVIGATION LINKS */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full h-12 px-4 rounded-xl flex items-center gap-3 text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 ${
                    isActive
                      ? "bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/15 border border-[#8B5CF6]/20"
                      : "text-slate-400 hover:bg-slate-800/30 hover:text-white"
                  }`}
                >
                  <Icon
                    size={17}
                    className={isActive ? "text-white" : "text-slate-400 group-hover:text-white"}
                  />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* 4. VIEW PROFILE ACTION BUTTON */}
          <div className="pt-2">
            <Link href={`/dashboard/profile`} onClick={() => setIsOpen(false)}>
              <Button
                className="w-full h-12 bg-purple-900 hover:bg-purple-500 text-white font-bold text-[13px] uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 border border-blue-400/20"
              >
                <FiUser size={16} strokeWidth={2} />
                <span>View Profile</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* LOWER PORTION: UTILITY SYSTEM LINKS */}
        <div className="space-y-1.5 border-t border-slate-800/50 pt-4">

          <button
            type="button"
            onClick={async () => await authClient.signOut(router.push("/auth/signin")) }
            className="w-full h-11 px-4 rounded-xl flex items-center gap-3 text-[13px] font-semibold tracking-wide uppercase text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all text-left bg-transparent border-none cursor-pointer"
          >
            <FiLogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;