"use client";

import React, { useState } from "react";
import EnquiryModal from "./EnquiryModal";

interface ProductEnquiryProps {
  productName?: string;
  buttonText?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ProductEnquiry({
  productName = "",
  buttonText = "Make Enquiry",
  className = "",
  children,
}: ProductEnquiryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className={className}>
        {children || buttonText}
      </button>
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProduct={productName}
      />
    </>
  );
}
