"use client";

import { useEffect, useState } from "react";

export default function Slider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([
      "https://www.mendoza.edu.ar/wp-content/uploads/2025/06/slide-matematica-monitor.jpg",
      "https://des.mendoza.edu.ar/wp-content/uploads/2024/05/oferta-educativa-2024.jpeg",
      
    ]);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="w-full overflow-hidden">
      <div className="flex transition-transform duration-500 animate-slide">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Slide ${i}`} className="w-full h-auto object-cover" />
        ))}
      </div>
    </div>
  );
}
