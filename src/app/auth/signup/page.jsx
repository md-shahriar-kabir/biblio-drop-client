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
import { useRouter } from "next/navigation";
import Image from "next/image";

// Icons
import { FiEye, FiEyeOff, FiUploadCloud, FiBook } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const [role, setRole] = useState("user");
  const [fileName, setFileName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    // Basic confirm password check before sending request
    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match password!");
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        ...userData,
        image: photoURL,
      });
      console.log(data, error);
      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      }
      if (data) {
        toast.success("Account created successfully! Welcome aboard.");
        router.push("/");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please check your connection.");
    }
  };

  const GoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  // Handle image upload tracking
  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const maxSizeInBytes = 500 * 1024; // 512,000 Bytes
      if (file.size > maxSizeInBytes) {
        alert("File size is too large! Maximum allowed size is 500KB.");
        e.target.value = "";
        setFileName("");
        return;
      }

      setFileName(file.name);

      try {
        setIsUploading(true);

        const imgFormData = new FormData();
        imgFormData.append("image", file);

        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: imgFormData,
          },
        );

        const imgData = await response.json();

        if (imgData.success) {
          setPhotoURL(imgData.data.display_url);
          console.log("imgBB Upload Success:", imgData.data.display_url);
        } else {
          alert("Image upload failed. Please try again.");
          setFileName("");
        }
      } catch (error) {
        console.error("Error uploading image to imgBB:", error);
        alert("Something went wrong during image upload.");
        setFileName("");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative text-[#0F172A] select-text overflow-x-hidden">
      
      {/* --- BACKGROUND IMMERSIVE BLURRED LIBRARY IMAGE --- */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop"
          alt="Library Background Blur"
          fill
          sizes="100vw"
          className="object-cover object-center scale-105 blur-[6px] select-none"
          priority
        />
        {/* Dark Slate overlay to match theme colors and increase form contrast */}
        <div className="absolute inset-0 bg-[#0F172A]/85 backdrop-blur-[2px] z-[1]" />
      </div>

      {/* --- CENTER FLOATING SIGN-UP CARD --- */}
      <div className="w-full flex items-center justify-center relative z-10 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-[620px] bg-white rounded-3xl border border-slate-200/50 shadow-[0_25px_60px_rgba(0,0,0,0.3)] p-6 sm:p-10 transition-all duration-300"
        >
          {/* Brand Logo Header (Matching Sign-In Styling) */}
          <div className="mb-8 flex justify-center select-none">
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
              <div className="space-y-1.5 text-center sm:text-left">
                <Fieldset.Legend className="text-3xl font-black tracking-tight text-[#0F172A] w-full">
                  Create Your Account
                </Fieldset.Legend>
                <span className="text-xs font-semibold text-slate-400 tracking-wide block leading-relaxed">
                  Join BiblioDrop to manage your library dashboard, requests, and automated book delivery metrics.
                </span>
              </div>

              {/* Form Input Layout Fields */}
              <div className="space-y-4 w-full pt-1">
                {/* 1 & 2: FULL NAME & EMAIL ADDRESS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField className="w-full" isRequired name="name" type="text">
                    <Label className="text-[10px] font-black text-[#0F172A] tracking-widest uppercase mb-1.5 block">
                      Full Name
                    </Label>
                    <InputGroup className="border border-slate-200 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/5 rounded-xl overflow-hidden bg-slate-50/50 transition-all">
                      <InputGroup.Input
                        className="bg-transparent h-11 px-4 text-xs font-bold text-slate-700 placeholder:text-slate-300 w-full outline-none"
                        placeholder="John Doe"
                      />
                    </InputGroup>
                    <FieldError className="text-xs font-semibold text-rose-500 mt-1 pl-1" />
                  </TextField>

                  <TextField className="w-full" name="email" type="email" isRequired>
                    <Label className="text-[10px] font-black text-[#0F172A] tracking-widest uppercase mb-1.5 block">
                      Email Address
                    </Label>
                    <InputGroup className="border border-slate-200 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/5 rounded-xl overflow-hidden bg-slate-50/50 transition-all">
                      <InputGroup.Input
                        className="bg-transparent h-11 px-4 text-xs font-bold text-slate-700 placeholder:text-slate-300 w-full outline-none"
                        placeholder="john@example.com"
                      />
                    </InputGroup>
                    <FieldError className="text-xs font-semibold text-rose-500 mt-1 pl-1" />
                  </TextField>
                </div>

                {/* 3 & 4: IMAGE UPLOAD & ROLE SELECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full">
                    <Label className="text-[10px] font-black text-[#0F172A] tracking-widest uppercase mb-1.5 block">
                      Avatar Image Upload
                    </Label>
                    <label className="h-11 border border-slate-200 hover:border-[#7C3AED] focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/5 rounded-xl overflow-hidden bg-slate-50/50 flex items-center px-4 justify-between cursor-pointer transition-all group">
                      <span className={`text-xs font-bold truncate max-w-[80%] ${fileName ? "text-slate-700" : "text-slate-300"}`}>
                        {fileName || "Choose profile file..."}
                      </span>
                      <FiUploadCloud className="text-slate-400 group-hover:text-[#7C3AED] size-4 transition-colors shrink-0" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  <div className="w-full">
                    <Label className="text-[10px] font-black text-[#0F172A] tracking-widest uppercase mb-1.5 block">
                      I am a...
                    </Label>
                    <div className="relative group">
                      <select
                        name="role"
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="w-full h-11 border border-slate-200 rounded-xl bg-slate-50/50 px-4 text-xs font-bold text-slate-700 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/5 appearance-none cursor-pointer transition-all"
                        defaultValue="user"
                      >
                        <option value="user" className="font-bold text-slate-700">
                          Reader
                        </option>
                        <option value="librarian" className="font-bold text-slate-700">
                          Librarian
                        </option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-slate-400 group-focus-within:border-t-[#7C3AED] transition-colors w-0 h-0" />
                    </div>
                  </div>
                </div>

                {/* 5 & 6: PASSWORD & CONFIRM PASSWORD */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    className="w-full"
                    name="password"
                    isRequired
                    validate={(value) => {
                      if (!value) return "Password is required";
                      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-.])[A-Z0-9a-z@$!%*?&#_\-.]{8,}$/;
                      if (!passwordRegex.test(value)) {
                        return "Must contain 1 uppercase, 1 lowercase, 1 number, 1 special char (min 8).";
                      }
                      return null;
                    }}
                  >
                    <Label className="text-[10px] font-black text-[#0F172A] tracking-widest uppercase mb-1.5 block">
                      Password
                    </Label>
                    <InputGroup className="border border-slate-200 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/5 rounded-xl overflow-hidden bg-slate-50/50 transition-all">
                      <InputGroup.Input
                        className="bg-transparent h-11 pl-4 pr-1 text-xs font-bold text-slate-700 placeholder:text-slate-300 w-full outline-none"
                        type={isVisible ? "text" : "password"}
                        placeholder="••••••••"
                      />
                      <InputGroup.Suffix className="pr-1.5">
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
                    <FieldError className="text-[11px] font-semibold text-rose-500 mt-1 pl-1 max-w-[280px] sm:max-w-none block leading-tight" />
                  </TextField>

                  <TextField className="w-full" name="confirmPassword" isRequired>
                    <Label className="text-[10px] font-black text-[#0F172A] tracking-widest uppercase mb-1.5 block">
                      Confirm Password
                    </Label>
                    <InputGroup className="border border-slate-200 focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/5 rounded-xl overflow-hidden bg-slate-50/50 transition-all">
                      <InputGroup.Input
                        className="bg-transparent h-11 pl-4 pr-1 text-xs font-bold text-slate-700 placeholder:text-slate-300 w-full outline-none"
                        type={isConfirmVisible ? "text" : "password"}
                        placeholder="••••••••"
                      />
                      <InputGroup.Suffix className="pr-1.5">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-slate-400 hover:text-slate-600 rounded-lg min-w-0 p-0 bg-transparent"
                          onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                        >
                          {isConfirmVisible ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                        </Button>
                      </InputGroup.Suffix>
                    </InputGroup>
                    <FieldError className="text-xs font-semibold text-rose-500 mt-1 pl-1 block" />
                  </TextField>
                </div>

                {/* 7. PRIVACY POLICY CHECKBOX */}
                <div className="flex items-start gap-2.5 pt-1 select-none">
                  <input
                    onChange={() => setAgree(!agree)}
                    type="checkbox"
                    id="terms"
                    className="mt-0.5 rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED] h-4 w-4 cursor-pointer transition-all"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs font-bold text-slate-400 cursor-pointer leading-normal"
                  >
                    I agree to the{" "}
                    <Link href="#" className="text-[#7C3AED] font-black hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-[#7C3AED] font-black hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
              </div>

              {/* ACTION EXECUTION BUTTON */}
              <Button
                isDisabled={!agree}
                type="submit"
                className="w-full h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs rounded-xl shadow-md shadow-[#7C3AED]/10 transition-all duration-200 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account
              </Button>
            </Fieldset>
          </Form>

          {/* OR DIVIDER */}
          <div className="flex items-center my-5 select-none">
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
            className="w-full h-11 border-slate-200 text-[#0F172A] hover:bg-slate-50 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2 bg-transparent uppercase tracking-widest"
          >
            <FcGoogle className="text-base shrink-0" />
            <span>Continue with Google</span>
          </Button>

          {/* DYNAMIC PATH SWITCH FOOTER LINK */}
          <div className="pt-5 w-full text-center text-xs font-bold text-slate-400 tracking-wide select-none">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-[#7C3AED] font-black hover:text-[#6D28D9] transition-colors ml-0.5 hover:underline"
            >
              Log in
            </Link>
          </div>
        </motion.div>
      </div>

    </main>
  );
};

export default SignUp;