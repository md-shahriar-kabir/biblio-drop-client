"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiBookOpen, FiLayers } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HeroSlider.css"; 

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop",
    title: "Your Local Library, Delivered",
    subtitle: "Welcome to Biblio Drop. Experience the joy of reading without leaving your home. We bring the best local collections straight to your doorstep.",
    libName: "Central Hub Library",
    libCount: "12,450+ Books Available"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000&auto=format&fit=crop",
    title: "Explore Our Book Network",
    subtitle: "Browse an extensive collection of books from trusted libraries, publishers, and distribution partners—all in one place.",
    libName: "Metropolitan Archives",
    libCount: "8,920+ Books Available"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop",
    title: "Your Gateway to Knowledge",
    subtitle: "Discover books from leading libraries and publishing partners with a seamless and efficient delivery experience.",
    libName: "Community Express Deck",
    libCount: "5,300+ Books Available"
  }
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-[70vh] min-h-[560px] max-h-[850px] bg-[#111827] group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative mt-6 w-full h-full overflow-hidden">
            
            {/* Image Layer */}
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-[6000ms] ease-linear ${
                activeIndex === index ? "scale-110" : "scale-100"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/95 via-[#111827]/80 to-[#111827]/40" />
            <div className="absolute inset-0 bg-black/20" />

            {/* Grid Content Container */}
            <div className="relative z-10 w-full h-full container mx-auto max-w-7xl 2xl:max-w-[1400px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
              
              {/* Left Side Content Column (Lucrative Premium Box) */}
              <div className="lg:col-span-7 flex flex-col justify-center items-start text-left h-full py-6">
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative w-full p-6 md:p-8 md:pr-12 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden"
                  >
                    <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="absolute left-0 top-0 w-[4px] bg-gradient-to-b from-[#7C3AED] to-purple-500 rounded-r-md"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#a78bfa] uppercase"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
                      Premium Book Drop Network
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                      className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.15] tracking-tight mb-5"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                      className="text-sm md:text-base text-gray-300/90 mb-6 font-medium leading-relaxed max-w-xl"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    >
                      <Link href={'/browse-books'}>
                        <Button
                          size="lg"
                          className="bg-[#7C3AED] hover:bg-purple-700 text-white font-bold px-7 h-12 text-sm rounded-xl shadow-[0_8px_20px_rgba(124,58,237,0.3)] transition-all flex items-center gap-2 group"
                        >
                          Browse Books
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </div>

              {/* Right Side Content Column */}
              <div className="hidden lg:flex lg:col-span-5 justify-end items-center h-full py-6">
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="w-full max-w-[380px] p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col justify-between h-[340px] relative overflow-hidden group/card"
                  >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#7C3AED]/20 rounded-full blur-2xl group-hover/card:bg-[#7C3AED]/40 transition-colors duration-500" />
                    
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-[#ffffff] text-xs font-bold uppercase tracking-wider mb-6">
                        <FiBookOpen size={12} /> Connected Library
                      </div>

                      <h3 className="text-white font-black text-2xl mb-2 tracking-tight">
                        {slide.libName}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Explore integrated inventory systems with swift regional catalog handoffs.
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-4 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#2563EB]/20 text-[#2563EB] flex items-center justify-center">
                          <FiLayers size={16} />
                        </div>
                        <span className="text-white text-sm font-semibold tracking-wide">
                          {slide.libCount}
                        </span>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" title="Active Delivery Network" />
                    </div>
                  </motion.div>
                )}
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute top-1/2 left-4 md:left-8 2xl:left-12 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#7C3AED] text-white backdrop-blur-md transition-all border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 invisible group-hover:visible">
        <FiChevronLeft size={24} />
      </div>
      
      <div className="swiper-button-next-custom absolute top-1/2 right-4 md:right-8 2xl:right-12 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#7C3AED] text-white backdrop-blur-md transition-all border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 invisible group-hover:visible">
        <FiChevronRight size={24} />
      </div>
    </section>
  );
};

export default HeroSlider;