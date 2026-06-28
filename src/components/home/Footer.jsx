// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Input, Button } from "@heroui/react";
// import { FiMail } from "react-icons/fi";
// import {
//   FaXTwitter,
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
// } from "react-icons/fa6";
// import { usePathname } from "next/navigation";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
//   const pathName = usePathname();

//   if (pathName.includes("auth") || pathName.includes("dashboard")) {
//     return null;
//   }
//   // Handle frontend-only newsletter submission
//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault();
//     console.log("Newsletter signup triggered (Frontend only)");
//     // You can add a success toast here later
//   };

//   return (
//     <footer className="bg-[#0A2540] text-slate-300 pt-16 pb-8 border-t border-white/5">
//       <div className="container mx-auto max-w-7xl px-6 md:px-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
//           {/* Column 1 & 2: Brand Info & Newsletter (Takes up more space) */}
//           <div className="lg:col-span-5 space-y-6">
//             <Link href="/" className="inline-block relative w-[160px] h-[40px]">
//               <Image
//                 src="/BookDrop-white.png"
//                 alt="BookDrop Logo"
//                 fill
//                 sizes="160px"
//                 className="object-contain"
//                 priority
//               />
//               <span className="sr-only">BookDrop Home</span>
//             </Link>

//             <p className="text-sm text-slate-400 max-w-md leading-relaxed">
//               Your Local Library, Delivered. We connect avid readers with local
//               libraries and independent book owners for a seamless, doorstep
//               borrowing experience.
//             </p>

//             {/* Frontend-only Newsletter Form */}
//             <form
//               onSubmit={handleNewsletterSubmit}
//               className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md"
//             >
//               <Input
//                 type="email"
//                 placeholder="Enter your email address"
//                 aria-label="Newsletter email input"
//                 startContent={<FiMail className="text-slate-500" />}
//                 classNames={{
//                   base: "w-full sm:w-auto flex-1",
//                   inputWrapper:
//                     "bg-white/5 hover:bg-white/10 focus-within:bg-white/10 border border-white/10 rounded-xl h-12 text-white shadow-none",
//                   input: "text-white placeholder:text-slate-500 text-[14px]",
//                 }}
//                 required
//               />
//               <Button
//                 type="submit"
//                 className="bg-[#F46036] hover:bg-[#D34A26] text-white font-bold h-12 px-6 rounded-xl transition-all shrink-0"
//               >
//                 Subscribe
//               </Button>
//             </form>
//           </div>

//           {/* Column 3: Quick Links */}
//           <div className="lg:col-span-3 lg:col-start-7">
//             <h3 className="text-white font-bold text-lg mb-6 tracking-wide">
//               Quick Links
//             </h3>
//             <ul className="space-y-4 text-sm font-medium">
//               <li>
//                 <Link
//                   href="/about"
//                   className="text-slate-400 hover:text-[#F46036] transition-colors flex items-center gap-2"
//                 >
//                   <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-slate-400 hover:text-[#F46036] transition-colors flex items-center gap-2"
//                 >
//                   <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
//                   Contact Support
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/privacy-policy"
//                   className="text-slate-400 hover:text-[#F46036] transition-colors flex items-center gap-2"
//                 >
//                   <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/terms"
//                   className="text-slate-400 hover:text-[#F46036] transition-colors flex items-center gap-2"
//                 >
//                   <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
//                   Terms of Service
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Column 4: Social Media Icons */}
//           <div className="lg:col-span-3">
//             <h3 className="text-white font-bold text-lg mb-6 tracking-wide">
//               Connect With Us
//             </h3>
//             <p className="text-sm text-slate-400 mb-4">
//               Follow us on social media for the latest updates and book
//               recommendations.
//             </p>
//             <div className="flex gap-3">
//               {/* Official New X (Twitter) Logo */}
//               <a
//                 href="https://x.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="X (Twitter)"
//                 className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F46036] hover:text-white transition-all border border-white/10 group"
//               >
//                 <FaXTwitter
//                   size={16}
//                   className="text-slate-300 group-hover:text-white transition-colors"
//                 />
//               </a>

//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//                 className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F46036] hover:text-white transition-all border border-white/10 group"
//               >
//                 <FaFacebookF
//                   size={16}
//                   className="text-slate-300 group-hover:text-white transition-colors"
//                 />
//               </a>

//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//                 className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F46036] hover:text-white transition-all border border-white/10 group"
//               >
//                 <FaInstagram
//                   size={18}
//                   className="text-slate-300 group-hover:text-white transition-colors"
//                 />
//               </a>

//               <a
//                 href="https://linkedin.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F46036] hover:text-white transition-all border border-white/10 group"
//               >
//                 <FaLinkedinIn
//                   size={16}
//                   className="text-slate-300 group-hover:text-white transition-colors"
//                 />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Copyright & Legal Bar */}
//         <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
//           <p>&copy; {currentYear} BookDrop. All rights reserved.</p>
//           <div className="flex items-center gap-4">
//             <span className="hidden md:inline-block">
//               Designed for avid readers everywhere.
//             </span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";

import React from "react";
import Link from "next/link";
import { Input, Button } from "@heroui/react";
import { FiMail } from "react-icons/fi";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathName = usePathname();

  if (pathName.includes("auth") || pathName.includes("dashboard")) {
    return null;
  }
  
  // Handle frontend-only newsletter submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup triggered (Frontend only)");
    // You can add a success toast here later
  };

  return (
    <footer className="bg-[#111827] text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Column 1 & 2: Brand Info & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 select-none group">
              <div className="relative flex items-center justify-center w-8 h-8 bg-[#7C3AED]/10 rounded-lg text-[#7C3AED]">
                <svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  <path d="M14 6c0 1.5 1.5 2.5 1.5 2.5S17 7.5 17 6s-1-2-1.5-2S14 5 14 6z" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Biblio<span className="text-[#7C3AED]">Drop</span>
              </span>
              <span className="sr-only">Biblio Drop Home</span>
            </Link>

            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Your Local Library, Delivered. We connect avid readers with local
              libraries and independent book owners for a seamless, doorstep
              borrowing experience.
            </p>

            {/* Frontend-only Newsletter Form */}
            <form
              onSubmit={handleNewsletterSubmit}
              className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                aria-label="Newsletter email input"
                startContent={<FiMail className="text-gray-500" />}
                classNames={{
                  base: "w-full sm:w-auto flex-1",
                  inputWrapper:
                    "bg-white/5 hover:bg-white/10 focus-within:bg-white/10 border border-gray-800 rounded-xl h-12 text-white shadow-none",
                  input: "text-white placeholder:text-gray-500 text-[14px]",
                }}
                required
              />
              <Button
                type="submit"
                className="bg-[#7C3AED] hover:bg-purple-700 text-white font-bold h-12 px-6 rounded-xl transition-all shrink-0"
              >
                Subscribe
              </Button>
            </form>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#7C3AED] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#7C3AED] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-[#7C3AED] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-[#7C3AED] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media Icons */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">
              Connect With Us
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Follow us on social media for the latest updates and book
              recommendations.
            </p>
            <div className="flex gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#2563EB] hover:text-white transition-all border border-gray-800 group"
              >
                <FaXTwitter
                  size={16}
                  className="text-gray-400 group-hover:text-white transition-colors"
                />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#2563EB] hover:text-white transition-all border border-gray-800 group"
              >
                <FaFacebookF
                  size={16}
                  className="text-gray-400 group-hover:text-white transition-colors"
                />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#2563EB] hover:text-white transition-all border border-gray-800 group"
              >
                <FaInstagram
                  size={18}
                  className="text-gray-400 group-hover:text-white transition-colors"
                />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#2563EB] hover:text-white transition-all border border-gray-800 group"
              >
                <FaLinkedinIn
                  size={16}
                  className="text-gray-400 group-hover:text-white transition-colors"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Legal Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-center gap-4 text-xs font-medium text-gray-500">
          <p>&copy; {currentYear} Biblio Drop. All rights reserved.</p>
          <div className="flex items-center gap-4">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
