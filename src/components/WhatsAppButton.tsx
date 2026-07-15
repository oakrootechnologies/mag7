"use client";

import React from "react";

export default function WhatsAppButton() {
  const phoneNumber = "917987384443";
  const message = encodeURIComponent("Hello, I would like to know more about your agricultural exports.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-none shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Chat on WhatsApp"
    >
      <svg
        className="w-7 h-7 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.623-1.023-5.086-2.885-6.948C16.273 2.016 13.8 1.014 11.19 1.011c-5.434 0-9.858 4.37-9.863 9.8a9.71 9.71 0 0 0 1.492 5.147l-.98 3.578 3.682-.958zm12.015-5.464c-.303-.15-.1.794-.575-.985-.06-.1-.137-.15-.201-.24-.099-.124-.492-.303-1.08-.598-.582-.295-.88-.44-.984-.459-.104-.017-.202-.03-.298.116-.298.45-.69 1.045-.845 1.23-.154.18-.314.19-.613.04-.298-.15-1.26-.464-2.4-1.48-.887-.79-1.486-1.77-1.66-2.07-.174-.3-.018-.46.13-.61.135-.133.303-.35.454-.524.15-.175.2-.299.302-.499.1-.2.05-.375-.025-.525-.075-.15-.69-1.656-.945-2.27-.248-.599-.5-.518-.69-.527l-.588-.009c-.201 0-.53.075-.807.375-.277.3-1.06 1.025-1.06 2.5 0 1.475 1.077 2.9 1.226 3.1.15.2 2.115 3.228 5.126 4.526 2.6 1.125 3.127.9 4.226.8.1.1 1.465-.6 1.677-1.25.213-.65.213-1.2.15-1.3-.06-.1-.23-.15-.533-.3z" />
      </svg>
    </a>
  );
}
