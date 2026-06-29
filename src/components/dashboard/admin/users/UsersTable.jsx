"use client";

import { Table, Select, ListBox, Avatar } from "@heroui/react";
import { FiTrash2, FiMail } from "react-icons/fi";
import { handleDeleteUser, handleUpdateUserRole } from "@/lib/action/users";

const UsersTable = ({ users }) => {
  // Safe evaluation to ensure map doesn't crash if users prop is undefined
  const userRecords = Array.isArray(users) ? users : [];

  // Refined dynamic styling for different user access roles
  const getRoleBadgeClass = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-indigo-50 text-indigo-700 border border-indigo-200/50 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm";
      case "librarian":
        return "bg-amber-50 text-amber-700 border border-amber-200/50 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm";
      default:
        return "bg-purple-50 text-purple-700 border border-purple-100/50 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Member Since N/A";
    const date = new Date(dateString);
    return `Member since ${date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}`;
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100/50 overflow-hidden shadow-[0_10px_30px_rgba(124,58,237,0.01)] mt-2">
      <Table className="w-full">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="BiblioDrop Registered Users"
            className="min-w-[850px]"
          >
            {/* --- TABLE HEADER DESIGN --- */}
            <Table.Header className="bg-gradient-to-r from-purple-50/50 to-indigo-50/30 border-b border-purple-100/40">
              <Table.Column
                isRowHeader
                className="text-[#0D3B66] font-black tracking-wider text-xs py-4 pl-6"
              >
                ACCOUNT HOLDER
              </Table.Column>
              <Table.Column className="text-[#0D3B66] font-black tracking-wider text-xs py-4">
                EMAIL COMMUNICATION
              </Table.Column>
              <Table.Column className="text-[#0D3B66] font-black tracking-wider text-xs py-4">
                ACCESS PRIVILEGE
              </Table.Column>
              <Table.Column className="text-[#0D3B66] font-black tracking-wider text-xs py-4 pr-6 text-right">
                MANAGEMENT ACTIONS
              </Table.Column>
            </Table.Header>

            {/* --- TABLE BODY ROWS --- */}
            <Table.Body>
              {userRecords.map((user) => {
                const userId = user?._id;

                return (
                  <Table.Row
                    key={userId}
                    className="border-b border-purple-50/60 last:border-none hover:bg-purple-50/20 transition-colors duration-200"
                  >
                    {/* User profile avatar and full name details */}
                    <Table.Cell className="py-4 pl-6">
                      <div className="flex items-center gap-3.5">
                        <Avatar
                          className="w-10 h-10 font-black bg-gradient-to-br from-purple-100 to-indigo-100 text-[#0D3B66] border border-purple-200/40 shrink-0 shadow-sm"
                          alt={user?.name}
                        >
                          <Avatar.Image src={user?.image} alt={user?.name} />
                          <Avatar.Fallback className="bg-transparent text-[#0D3B66] font-black text-sm uppercase">
                            {user?.name ? user?.name[0].toUpperCase() : "U"}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-black text-[#0D3B66] tracking-tight">
                            {user?.name || "Anonymous Platform User"}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 mt-0.5">
                            {formatDate(user?.createdAt?.$date || user?.createdAt)}
                          </span>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Verified Email communication box */}
                    <Table.Cell className="py-4 text-sm font-semibold text-slate-600">
                      <div className="flex items-center gap-2">
                        <FiMail className="text-purple-400 shrink-0" size={13} />
                        <span>{user?.email}</span>
                      </div>
                    </Table.Cell>

                    {/* Configured Authorization Role Badge */}
                    <Table.Cell className="py-4">
                      <span className={getRoleBadgeClass(user?.role)}>
                        {user?.role || "user"}
                      </span>
                    </Table.Cell>

                    {/* Operational system actions: Update Role / Erase Account */}
                    <Table.Cell className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-3.5">
                        <Select
                          className="w-[135px]"
                          defaultValue={user?.role}
                          onSelectionChange={(value) =>
                            handleUpdateUserRole(userId, value)
                          }
                        >
                          <Select.Trigger className="bg-purple-50/60 hover:bg-purple-100/80 border border-purple-100/50 rounded-full h-8 text-[11px] font-black px-3.5 text-purple-700 tracking-wide transition-all shadow-sm">
                            <Select.Value />
                            <Select.Indicator className="text-purple-500 ml-1.5" />
                          </Select.Trigger>
                          <Select.Popover className="border border-purple-100/80 shadow-xl rounded-xl overflow-hidden backdrop-blur-xl bg-white mt-1">
                            <ListBox className="p-1 font-bold text-slate-600 text-xs">
                              <ListBox.Item
                                id="user"
                                textValue="Reader"
                                className="rounded-lg data-[hover=true]:bg-purple-50 data-[hover=true]:text-purple-700 py-2 cursor-pointer"
                              >
                                Reader
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item
                                id="librarian"
                                textValue="Librarian"
                                className="rounded-lg data-[hover=true]:bg-purple-50 data-[hover=true]:text-purple-700 py-2 cursor-pointer"
                              >
                                Librarian
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item
                                id="admin"
                                textValue="Admin"
                                className="rounded-lg data-[hover=true]:bg-purple-50 data-[hover=true]:text-purple-700 py-2 cursor-pointer"
                              >
                                Admin
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>

                        {/* Safe Click Handler Protected Destructive Delete Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteUser(userId);
                          }}
                          className="text-rose-600 bg-rose-50 border border-rose-100/50 hover:bg-rose-600 hover:text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 shadow-sm flex-shrink-0"
                          title="Permanently Delete User"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default UsersTable;