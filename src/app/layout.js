import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/home/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Biblio Drop | Explore Your Online Library",
  description: "A modern platform to discover great books, read authors' works, and share your genuine reviews with the community.",
  keywords: ["books", "library", "book reviews", "reading", "bibliodrop"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar />
        <main>
          {children}
          <Footer/>
        </main>
          <Toaster />
      </body>
    </html>
  );
}
