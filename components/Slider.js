"use client";

import { useEffect, useState } from "react";

const images = [
  "https://www.mendoza.edu.ar/wp-content/uploads/2025/06/slide-matematica-monitor.jpg",
  "https://des.mendoza.edu.ar/wp-content/uploads/2024/05/oferta-educativa-2024.jpeg",
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[1600px] mx-auto h-[481px] overflow-hidden rounded-xl shadow-lg">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={src}
            alt={`Slide ${index}`}
            className="w-full h-[481px] object-cover"
            width={1600}
            height={481}
          />
        </div>
      ))}

      {/* Flecha izquierda */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black px-3 py-1 rounded-full shadow z-20"
        aria-label="Anterior"
      >
        &#10094;
      </button>

      {/* Flecha derecha */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black px-3 py-1 rounded-full shadow z-20"
        aria-label="Siguiente"
      >
        &#10095;
      </button>
    </div>
  );
}
