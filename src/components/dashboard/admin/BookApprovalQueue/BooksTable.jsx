"use client";

import { useState } from "react";
import { Table, Button, Select, ListBox } from "@heroui/react";
import { FiTrash2, FiUser, FiDollarSign } from "react-icons/fi";
import Image from "next/image";
import { handleDeleteBookByAdmin, updateBookStatusByAdmin } from "@/lib/action/books";

const BooksTable = ({ initialBooks }) => {
  // Safe Array Evaluation to prevent map breakdown runtime crashes
  const books = Array.isArray(initialBooks) ? initialBooks : [];

  // Elegant status color styling aligned with the dashboard accent palette
  const getStatusColorClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80 border border-emerald-200/50";
      case "pending":
        return "bg-amber-50 text-amber-700 hover:bg-amber-100/80 border border-amber-200/50";
      case "rejected":
        return "bg-rose-50 text-rose-700 hover:bg-rose-100/80 border border-rose-200/50";
      case "unpublished":
        return "bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200/50";
      default:
        return "bg-transparent border-slate-200 text-slate-700";
    }
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100/50 overflow-hidden shadow-[0_10px_30px_rgba(124,58,237,0.01)] mt-2">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Manage All Books"
            className="min-w-[900px]"
          >
            {/* --- TABLE HEADERS WITH DEEP INDIGO STYLING --- */}
            <Table.Header className="bg-gradient-to-r from-purple-50/50 to-indigo-50/30 border-b border-purple-100/40">
              <Table.Column isRowHeader className="text-[#0D3B66] font-black tracking-wider text-xs py-4 pl-6">BOOK DETAILS</Table.Column>
              <Table.Column className="text-[#0D3B66] font-black tracking-wider text-xs py-4">AUTHOR / CREATOR</Table.Column>
              <Table.Column className="text-[#0D3B66] font-black tracking-wider text-xs py-4">DELIVERY COST</Table.Column>
              <Table.Column className="text-[#0D3B66] font-black tracking-wider text-xs py-4">CATALOG STATUS</Table.Column>
              <Table.Column className="text-[#0D3B66] font-black tracking-wider text-xs py-4 pr-6 text-center">ACTIONS</Table.Column>
            </Table.Header>

            {/* --- TABLE BODY DATA --- */}
            <Table.Body>
              {books.map((book) => (
                <Table.Row 
                  key={book._id}
                  className="border-b border-purple-50/60 last:border-none hover:bg-purple-50/20 transition-colors duration-200"
                >
                  {/* Column 1: Book Cover and Metadata */}
                  <Table.Cell className="py-4 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-16 relative flex-shrink-0 rounded-lg overflow-hidden shadow-sm bg-purple-50 border border-purple-100/40 flex items-center justify-center">
                        {book.image ? (
                          <Image
                            width={100}
                            height={100}
                            src={book.image}
                            alt={book.title || "Book thumbnail"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-purple-300 text-xs font-bold">N/A</span>
                        )}
                      </div>
                      <div>
                        <p className="font-black text-[#0D3B66] text-sm line-clamp-1 max-w-[280px]" title={book.title}>
                          {book.title || "Untitled Book"}
                        </p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 font-extrabold text-[10px] uppercase tracking-wide border border-purple-100/30">
                          {book.category || "General"}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Column 2: Author Name */}
                  <Table.Cell className="py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-semibold text-sm capitalize">
                      <FiUser className="text-purple-400 flex-shrink-0" size={14} />
                      <span className="line-clamp-1 max-w-[180px]" title={book.author}>
                        {book.author || "Unknown Author"}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Column 3: Pricing Parameters */}
                  <Table.Cell className="py-4">
                    <div className="flex items-center text-slate-800 font-black text-sm">
                      <FiDollarSign className="text-purple-500 mr-0.5" size={14} />
                      <span>{book.deliveryFee ?? "0.00"}</span>
                    </div>
                  </Table.Cell>

                  {/* Column 4: Dropdown Status Configuration */}
                  <Table.Cell className="py-4">
                    <Select
                      className="w-[135px]"
                      defaultValue={book?.status}
                      onSelectionChange={(value) =>
                        updateBookStatusByAdmin(book?._id, value)
                      }
                    >
                      <Select.Trigger 
                        className={`h-8 rounded-full text-[11px] font-black uppercase tracking-wider transition-all shadow-sm ${getStatusColorClass(book?.status)}`}
                      >
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover className="border border-purple-100/80 shadow-xl rounded-xl overflow-hidden backdrop-blur-xl">
                        <ListBox className="p-1 font-bold text-slate-600 text-xs">
                          <ListBox.Item id="approved" textValue="Approved" className="rounded-lg data-[hover=true]:bg-purple-50 data-[hover=true]:text-purple-700 py-2">
                            Approved
                          </ListBox.Item>
                          <ListBox.Item id="pending" textValue="Pending" className="rounded-lg data-[hover=true]:bg-purple-50 data-[hover=true]:text-purple-700 py-2">
                            Pending
                          </ListBox.Item>
                          <ListBox.Item id="rejected" textValue="Rejected" className="rounded-lg data-[hover=true]:bg-purple-50 data-[hover=true]:text-purple-700 py-2">
                            Rejected
                          </ListBox.Item>
                          <ListBox.Item id="unpublished" textValue="Unpublished" className="rounded-lg data-[hover=true]:bg-purple-50 data-[hover=true]:text-purple-700 py-2">
                            Unpublished
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Table.Cell>

                  {/* Column 5: Destructive Actions (Delete Button) */}
                  <Table.Cell className="py-4 pr-6 text-center">
                    <Button
                      onClick={() => handleDeleteBookByAdmin(book?._id)}
                      size="sm"
                      variant="flat"
                      color="danger"
                      className="min-w-8 w-8 h-8 rounded-full p-0 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-100/50 transition-all duration-200 mx-auto shadow-sm"
                    >
                      <FiTrash2 size={13} />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default BooksTable;