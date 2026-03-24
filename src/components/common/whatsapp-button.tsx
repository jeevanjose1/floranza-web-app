"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function WhatsAppButton() {
  const [isMobile, setIsMobile] = useState(false);
  const phoneNumber = "919539006690";
  const message = `Hi ! \nI'm interested in your products.`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  const whatsappBaseUrl = isMobile
    ? "https://api.whatsapp.com/send"
    : `https://wa.me/${phoneNumber}`;

  const whatsappUrl = isMobile
    ? `${whatsappBaseUrl}?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    : `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-10 right-10 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-lg shadow-[#25d366]/40 transition-transform duration-200 hover:scale-110 hover:shadow-xl hover:shadow-[#25d366]/60 md:bottom-10 max-md:bottom-[60px] max-md:right-4 max-md:h-[40px] max-md:w-[40px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="h-[30px] w-[30px] max-md:h-[22px] max-md:w-[22px]"
        fill="white"
      >
        <path d="M4.868 43.303l2.694-9.835a18.919 18.919 0 01-2.531-9.489C5.034 13.514 13.548 5 24.014 5a18.919 18.919 0 0118.974 18.979c-.003 10.464-8.521 18.977-18.974 18.977a18.95 18.95 0 01-9.058-2.302l-10.088 2.649zm10.437-6.023l.574.341a15.724 15.724 0 008.12 2.251c8.695 0 15.774-7.073 15.778-15.771A15.742 15.742 0 0024.014 8.199c-8.699 0-15.774 7.073-15.778 15.769a15.73 15.73 0 002.439 8.385l.38.604-1.609 5.875 5.859-1.552zM34.49 28.37c-.116-.192-.424-.308-.887-.539-1.847-.923-3.013-1.538-3.479-1.77-.366-.18-.711-.136-.958.192-.371.491-1.059 1.37-1.308 1.655-.248.285-.497.319-.864.128-.462-.231-1.948-.718-3.712-2.294-1.372-1.226-2.299-2.74-2.569-3.203-.27-.463-.028-.713.202-.944.207-.207.462-.54.693-.809.232-.27.308-.463.462-.77.155-.308.078-.578-.038-.809-.116-.231-1.044-2.523-1.43-3.449-.385-.926-.77-.77-1.044-.77h-.887c-.308 0-.809.116-1.233.578-.424.463-1.622 1.584-1.622 3.872s1.661 4.488 1.892 4.797c.231.308 3.264 4.979 7.906 6.988 1.105.478 1.967.763 2.638.977 1.109.354 2.119.304 2.915.184.889-.133 2.738-1.12 3.124-2.2.386-1.082.386-2.01.27-2.202z" />
      </svg>
    </Link>
  );
}
