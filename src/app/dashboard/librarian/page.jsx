import {
  getCurrentLibrarianBook,
  getCurrentLibrarianOrderedBook,
} from "@/lib/api/books";
import { getUserSession } from "@/lib/core/session";
import React from "react";
import LibrarianOverview from "./LibrarianOverview";

const DashboardLibrarian = async () => {
  const userData = await getUserSession();
  const user = userData?.user;

  const [books, orderedBook] = await Promise.all([
    getCurrentLibrarianBook(user?.id),
    getCurrentLibrarianOrderedBook(user?.id),
  ]);

  return (
    <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">

      <LibrarianOverview books={books || []} orders={orderedBook || []} />
    </div>
  );
};

export default DashboardLibrarian;
