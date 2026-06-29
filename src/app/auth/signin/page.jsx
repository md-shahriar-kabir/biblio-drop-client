"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Form,
  Fieldset,
  TextField,
  InputGroup,
  Label,
  FieldError,
  Button,
} from "@heroui/react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiBook } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BsGoogle } from "react-icons/bs";

const SignIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    try {
      const { data, error } = await authClient.signIn.email({
        ...userData,
      });

      if (error) {
        toast.error(error.message || "Invalid credentials. Please try again.");
        return;
      }

      if (data) {
        toast.success("Welcome back! Login successful.");
        router.push(`/dashboard/${data?.user?.role}`);
      }
    } catch (err) {
      toast.error("Authentication failed. Please check your connection.");
    }
  };

  const GoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#F8FAFC] relative text-[#0F172A] select-text overflow-hidden">
      
      {/* BACKGROUND DECORATIVE DOTS PATTERN */}
      <div className="absolute inset-0 bg-[radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-[0.03]" />

      {/* --- LEFT PANEL: THE FLOATING FORM CARD --- */}
      <div className="w-full flex items-center justify-center p-6 sm:p-10 lg:p-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-[440px] bg-white rounded-3xl border border-slate-200/60 shadow-[0_20px_40px_rgba(15,23,42,0.04)] p-8 sm:p-10"
        >
          {/* Top Navbar Matching Logo Component From image_183040.png */}
          <div className="mb-10 select-none">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#F5F3FF] rounded-xl flex items-center justify-center text-[#7C3AED] shadow-sm group-hover:scale-105 transition-transform">
                <FiBook size={20} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black text-[#0F172A] tracking-tight">
                Biblio<span className="text-[#7C3AED]">Drop</span>
              </span>
            </Link>
          </div>

          <Form
            onSubmit={handleSignIn}
            className="w-full space-y-5"
            validationBehavior="native"
          >
            <Fieldset className="w-full space-y-4">
              {/* Header Title Section */}
              <div className="space-y-1.5">
                <Fieldset.Legend className="text-3xl font-black tracking-tight text-[#0F172A]">
                  Welcome Back
                </Fieldset.Legend>
                <span className="text-xs font-semibold text-slate-400 tracking-wide block leading-relaxed">
                  Log in to access your library dashboard, request book deliveries, and manage your shelf.
                </span>
              </div>

              {/* Form Input Layout Fields */}
              <div className="space-y-4 w-full pt-2">
                {/* 1. EMAIL ADDRESS FIELD */}
                <TextField className="w-full" name="email" type="email" isRequired>
                  <Label className="text-[10px] font-black text-[#0F172A] tracking-widest uppercase mb-1.5 block">
                    Email Address
                  </Label>
                  <InputGroup className="border border-slate-200 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/5 rounded-xl overflow-hidden bg-slate-50/50 transition-all">
                    <InputGroup.Input
                      className="bg-transparent h-11 px-4 text-xs font-bold text-slate-700 placeholder:text-slate-300 w-full outline-none"
                      placeholder="name@example.com"
                    />
                  </InputGroup>
                  <FieldError className="text-xs font-semibold text-rose-500 mt-1 pl-1" />
                </TextField>

                {/* 2. PASSWORD FIELD */}
                <TextField className="w-full" name="password" isRequired>
                  <div className="flex items-center justify-between mb-1.5 w-full">
                    <Label className="text-[10px] font-black text-[#0F172A] tracking-widest uppercase block">
                      Password
                    </Label>
                    <Link
                      href="#"
                      className="text-[11px] font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <InputGroup className="border border-slate-200 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/5 rounded-xl overflow-hidden bg-slate-50/50 transition-all">
                    <InputGroup.Input
                      className="bg-transparent h-11 pl-4 pr-1 text-xs font-bold text-slate-700 placeholder:text-slate-300 w-full outline-none"
                      type={isVisible ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <InputGroup.Suffix className="pr-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-slate-400 hover:text-slate-600 rounded-lg min-w-0 p-0 bg-transparent"
                        onPress={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                  <FieldError className="text-xs font-semibold text-rose-500 mt-1 pl-1" />
                </TextField>

                {/* REMEMBER ME CHECKBOX */}
                <div className="flex items-center gap-2.5 pt-1 select-none">
                  <input
                    onChange={() => setRememberMe(!rememberMe)}
                    type="checkbox"
                    id="remember"
                    className="rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED] h-4 w-4 cursor-pointer transition-all"
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs font-bold text-slate-400 cursor-pointer leading-none"
                  >
                    Remember Me
                  </label>
                </div>
              </div>

              {/* ACTION EXECUTION BUTTON */}
              <Button
                type="submit"
                className="w-full h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs rounded-xl shadow-md shadow-[#7C3AED]/10 transition-all duration-200 uppercase tracking-widest"
              >
                Sign In
              </Button>
            </Fieldset>
          </Form>

          {/* OR DIVIDER */}
          <div className="flex items-center my-6 select-none">
            <div className="flex-grow border-t border-slate-100" />
            <span className="px-3 text-[10px] font-black text-slate-300 tracking-widest">
              OR
            </span>
            <div className="flex-grow border-t border-slate-100" />
          </div>

          {/* GOOGLE SIGN-IN BUTTON */}
          <Button
            onClick={GoogleSignIn}
            type="button"
            variant="bordered"
            className="w-full h-11 border-slate-200 text-[#0F172A] hover:border border-4 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2 bg-transparent uppercase tracking-widest"
          >
            <BsGoogle className="text-base shrink-0" />
            <span>Continue with Google</span>
          </Button>

          {/* DYNAMIC PATH SWITCH FOOTER LINK */}
          <div className="pt-6 w-full text-center text-xs font-bold text-slate-400 tracking-wide select-none">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-[#7C3AED] font-black hover:text-[#6D28D9] transition-colors ml-0.5 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>

      {/* --- RIGHT PANEL: COMPACT DUAL TILTED FRONTS --- */}
      <div className="relative hidden lg:flex flex-col w-full h-screen p-12 justify-center items-center bg-[#0F172A]">
        
        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        <div className="w-full max-w-[460px] relative z-10 flex flex-col items-center">
          
          {/* Dual Rectangle Angle Grid Structure */}
          <div className="relative w-full h-[320px] mb-10 flex items-center justify-center">
            
            {/* Rectangle 1: Tilted Left (Classic Aesthetics Library) */}
            <motion.div 
              initial={{ opacity: 0, rotate: -6, x: -20, scale: 0.95 }}
              animate={{ opacity: 0.85, rotate: -8, x: -30, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ rotate: -4, x: -15, opacity: 1, zIndex: 30 }}
              className="absolute w-[240px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#1E293B] shadow-2xl origin-bottom transition-all duration-300 cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop"
                alt="Classical Archival Library"
                fill
                className="object-cover"
                sizes="30vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent" />
            </motion.div>

            {/* Rectangle 2: Tilted Right (Modern Minimalist Books Stack) */}
            <motion.div 
              initial={{ opacity: 0, rotate: 6, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, rotate: 8, x: 30, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              whileHover={{ rotate: 4, x: 15, zIndex: 30 }}
              className="absolute w-[240px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/10 bg-[#1E293B] shadow-[0_25px_50px_rgba(0,0,0,0.4)] origin-bottom transition-all duration-300 cursor-pointer z-20"
            >
              <Image
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"
                alt="Modern Curated Reading Books"
                fill
                className="object-cover"
                sizes="30vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent" />
            </motion.div>

          </div>

          {/* Clean Elegant Text Info */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-black text-white tracking-tight">
              Your Personal Reading Space
            </h2>
            <p className="text-xs font-medium text-slate-400 max-w-xs mx-auto leading-relaxed">
              Discover, request, and manage your curated books with real-time automated delivery tracking workflows.
            </p>
          </div>

        </div>
      </div>

    </main>
  );
};

export default SignIn;