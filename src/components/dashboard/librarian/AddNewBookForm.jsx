"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  InputGroup,
  Label,
  Button,
  Select,
  ListBox,
} from "@heroui/react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiSend, FiBookOpen, FiDollarSign, FiAlignLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { PostBook } from "@/lib/action/books";

const AddNewBookForm = ({ userId }) => {
  const [fileName, setFileName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { id: "Fiction", label: "Fiction" },
    { id: "Sci-Fi", label: "Sci-Fi" },
    { id: "Fantasy", label: "Fantasy" },
    { id: "Mystery-Thriller", label: "Mystery-Thriller" },
    { id: "Romance", label: "Romance" },
    { id: "Academic", label: "Academic" },
    { id: "History", label: "History" },
    { id: "Biography", label: "Biography" },
    { id: "Self-Help", label: "Self-Help" },
    { id: "Business", label: "Business" },
    { id: "Children", label: "Children" },
    { id: "Poetry", label: "Poetry" },
  ];

  // 1. Image Upload & Validation Logic
  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // File Size Validation: Max 500KB
      const maxSizeInBytes = 500 * 1024; 
      if (file.size > maxSizeInBytes) {
        toast.error("File size is too large! Maximum allowed size is 500KB.");
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
          }
        );

        const imgData = await response.json();

        if (imgData.success) {
          setPhotoURL(imgData.data.display_url);
          toast.success("Cover image uploaded successfully!");
          console.log("imgBB Upload Success:", imgData.data.display_url);
        } else {
          toast.error("Image upload failed. Please try again.");
          setFileName("");
          e.target.value = "";
        }
      } catch (error) {
        console.error("Error uploading image to imgBB:", error);
        toast.error("Something went wrong during image upload.");
        setFileName("");
        e.target.value = "";
      } finally {
        setIsUploading(false);
      }
    }
  };

  // 2. Form Submit Logic
  const handleAddBook = async (e) => {
    e.preventDefault();

    if (isUploading) {
      toast.error("Please wait for the image to finish uploading.");
      return;
    }
    if (!photoURL) {
      toast.error("Please upload a book cover image.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const bookData = Object.fromEntries(formData.entries());

    const finalSubmitData = {
      ...bookData,
      image: photoURL,
      status: "pending",
      userId: userId?.userId || userId, // Prevents destruction if object structure shifts
    };
    
    const res = await PostBook(finalSubmitData);

    if (res?.insertedId) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    
    setIsSubmitting(false);
    toast.success("Book submitted successfully! Waiting for Admin approval.");

    e.target.reset();
    setFileName("");
    setPhotoURL("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Container Card with modern shadow and glass accent */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_25px_60px_rgba(13,59,102,0.06)] p-6 md:p-10 relative overflow-hidden">
        
        {/* Subtle background glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header Title inside Form Container */}
        <div className="mb-8 border-b border-gray-100 pb-5">
          <h2 className="text-2xl font-black text-[#0D3B66] tracking-tight flex items-center gap-2">
            <FiBookOpen className="text-purple-600" size={24} /> Add New Catalog Entry
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Fill in the details below to add a book to the Biblio Drop decentralized library network.
          </p>
        </div>

        <Form
          onSubmit={handleAddBook}
          className="w-full space-y-6"
          validationBehavior="native"
        >
          <Fieldset className="w-full space-y-6 p-0 m-0 border-none">
            
            {/* ROW 1: TITLE & AUTHOR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField className="w-full" isRequired name="title" type="text">
                <Label className="text-[11px] font-extrabold text-[#0D3B66] tracking-wider uppercase mb-2 block">
                  Book Title
                </Label>
                <InputGroup className="border border-gray-200 focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/10 rounded-xl overflow-hidden bg-white transition-all duration-200 shadow-sm">
                  <InputGroup.Input
                    className="bg-transparent px-4 py-3 text-[13px] font-semibold text-slate-800 placeholder:text-slate-400 w-full outline-none"
                    placeholder="e.g., The Midnight Library"
                  />
                </InputGroup>
              </TextField>

              <TextField className="w-full" isRequired name="author" type="text">
                <Label className="text-[11px] font-extrabold text-[#0D3B66] tracking-wider uppercase mb-2 block">
                  Author Name
                </Label>
                <InputGroup className="border border-gray-200 focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/10 rounded-xl overflow-hidden bg-white transition-all duration-200 shadow-sm">
                  <InputGroup.Input
                    className="bg-transparent px-4 py-3 text-[13px] font-semibold text-slate-800 placeholder:text-slate-400 w-full outline-none"
                    placeholder="e.g., Matt Haig"
                  />
                </InputGroup>
              </TextField>
            </div>

            {/* ROW 2: CATEGORY & DELIVERY FEE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full">
                <Select
                  name="category"
                  isRequired
                  placeholder="Choose a category"
                  className="w-full"
                >
                  <Label className="text-[11px] font-extrabold text-[#0D3B66] tracking-wider uppercase mb-2 block">
                    Category
                  </Label>
                  <Select.Trigger className="w-full border border-gray-200 focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/10 rounded-xl bg-white px-4 py-3 h-auto min-h-0 shadow-sm transition-all duration-200">
                    <Select.Value className="text-[13px] font-semibold text-slate-800 placeholder:text-slate-400" />
                    <Select.Indicator className="text-slate-400" />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox items={categoryOptions} className="p-1.5 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                      {(item) => (
                        <ListBox.Item id={item.id} textValue={item.label} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-purple-50 text-slate-700 hover:text-purple-700 cursor-pointer transition-colors">
                          <span className="font-semibold text-[13px]">
                            {item.label}
                          </span>
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      )}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField className="w-full" isRequired name="deliveryFee" type="number">
                <Label className="text-[11px] font-extrabold text-[#0D3B66] tracking-wider uppercase mb-2 block">
                  Delivery Fee (USD)
                </Label>
                <InputGroup className="border border-gray-200 focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/10 rounded-xl overflow-hidden bg-white flex items-center transition-all duration-200 shadow-sm">
                  <span className="pl-4 pr-1 text-[13px] font-bold text-purple-600 flex items-center">
                    <FiDollarSign size={14} />
                  </span>
                  <InputGroup.Input
                    step="0.01"
                    className="bg-transparent pr-4 py-3 text-[13px] font-semibold text-slate-800 placeholder:text-slate-400 w-full outline-none"
                    placeholder="0.00"
                  />
                </InputGroup>
              </TextField>
            </div>

            {/* ROW 3: DESCRIPTION */}
            <div className="w-full">
              <Label className="text-[11px] font-extrabold text-[#0D3B66] tracking-wider uppercase mb-2 block">
                Description
              </Label>
              <div className="border border-gray-200 focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/10 rounded-xl overflow-hidden bg-white transition-all duration-200 shadow-sm flex items-start">
                <span className="pl-4 pt-3.5 text-slate-400">
                  <FiAlignLeft size={16} />
                </span>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Provide a brief summary of the book's content, volume, and physical condition..."
                  className="bg-transparent px-3 py-3 text-[13px] font-semibold text-slate-800 placeholder:text-slate-400 w-full outline-none resize-y block min-h-[100px]"
                />
              </div>
            </div>

            {/* ROW 4: BOOK COVER IMAGE (Modernized Drag & Drop Box) */}
            <div className="w-full">
              <Label className="text-[11px] font-extrabold text-[#0D3B66] tracking-wider uppercase mb-2 block">
                Book Cover Image
              </Label>
              <label className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:border-purple-600 hover:bg-purple-50/20 focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-600/10 transition-all duration-300 cursor-pointer group shadow-inner">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                />
                
                {/* Visual Icon Box */}
                <div
                  className={`w-14 h-14 bg-white text-purple-600 rounded-2xl flex items-center justify-center mb-3 shadow-[0_8px_20px_rgba(124,58,237,0.1)] border border-purple-100 transition-all duration-300 ${!isUploading && "group-hover:scale-110 group-hover:rotate-3"}`}
                >
                  <FiUploadCloud
                    size={24}
                    strokeWidth={2.2}
                    className={isUploading ? "animate-bounce text-purple-500" : ""}
                  />
                </div>
                
                <h4 className="text-[14px] font-bold text-[#0D3B66] mb-1 truncate max-w-[80%] text-center tracking-tight">
                  {isUploading
                    ? "Syncing with ImgBB Server..."
                    : fileName
                      ? fileName
                      : "Drop your cover image here, or browse"}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  PNG, JPG, WEBP (MAX. 500KB)
                </p>
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                isDisabled={isSubmitting || isUploading}
                className="w-full md:w-auto px-10 h-13 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-extrabold text-[13px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(109,40,217,0.25)] hover:shadow-[0_12px_30px_rgba(109,40,217,0.35)] transition-all duration-300 disabled:opacity-50"
              >
                {!isSubmitting && !isUploading && <FiSend size={15} strokeWidth={2.5} />}
                {isSubmitting
                  ? "Publishing entry..."
                  : isUploading
                    ? "Processing Image..."
                    : "Submit for Approval"}
              </Button>
            </div>

          </Fieldset>
        </Form>
      </div>
    </motion.div>
  );
};

export default AddNewBookForm;