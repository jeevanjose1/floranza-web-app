"use client";
import React, { useState, useRef, useMemo, useCallback } from "react";
import Image from "next/image";

type Props = {
  images_data?: string[];
  productName?: string;
  enableZoom?: boolean;
  zoomLevel?: number;
};

export default function ImageSection({
  images_data = [],
  productName = "Product Name",
  enableZoom = true,
  zoomLevel = 2.5,
}: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Memoize values that don't change frequently
  const hasMultipleImages = useMemo(() => images_data.length > 1, [images_data.length]);
  const currentImage = useMemo(() => images_data[selectedImage], [images_data, selectedImage]);

  // Convert handlers to useCallback to prevent unnecessary re-renders
  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableZoom || !imageContainerRef.current) return;

      const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));

      setZoomPosition({ x, y });
    },
    [enableZoom]
  );

  const handleMouseEnter = useCallback(() => {
    if (enableZoom) {
      setIsHovering(true);
    }
  }, [enableZoom]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const nextImage = useCallback(() => {
    setSelectedImage((prev) => (prev + 1) % images_data.length);
  }, [images_data.length]);

  const prevImage = useCallback(() => {
    setSelectedImage((prev) => (prev - 1 + images_data.length) % images_data.length);
  }, [images_data.length]);


  const NavigationButton = ({ direction }: { direction: 'prev' | 'next' }) => {
    if (!hasMultipleImages) return null;
    
    const isLeft = direction === 'prev';
    
    return (
      <button
        onClick={isLeft ? prevImage : nextImage}
        className={`absolute ${isLeft ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 transition-all duration-200 hover:scale-110`}
        aria-label={`${isLeft ? 'Previous' : 'Next'} image`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
          />
        </svg>
      </button>
    );
  };

  return (
    <div className="w-full tablet-lg:max-w-xl mx-auto">
      <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden aspect-14/20 ">
        <div
          ref={imageContainerRef}
          className={`w-full h-full relative ${enableZoom ? 'cursor-crosshair' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative w-full h-full">
          { currentImage&& <Image
              src={currentImage}
              alt={`${productName} - Image ${selectedImage + 1}`}
              // fill
              width={1000}
              height={1000}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={selectedImage === 0}
              className="object-cover transition-opacity duration-200"
            />}
          </div>

          {enableZoom && (
            <div
              className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="absolute w-full h-full transition-transform duration-75 ease-out"
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: `${zoomLevel * 100}%`,
                  backgroundRepeat: "no-repeat",
                  transform: `scale(${isHovering ? 1 : 0.95})`,
                }}
              />
            </div>
          )}

        </div>

        <NavigationButton direction="prev" />
        <NavigationButton direction="next" />

        {hasMultipleImages && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs z-10">
            {selectedImage + 1} / {images_data.length}
          </div>
        )}
      </div>

      {hasMultipleImages && (
        <div className="flex items-center gap-3 ">
          {images_data.map((img, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`aspect-2/2 w-20 h-20 rounded border overflow-hidden transition-all duration-200 relative ${
                selectedImage === index
                  ? "border-main ring ring-main"
                  : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`View product image ${index + 1}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}