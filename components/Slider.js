"use client";

import { useEffect, useState } from "react";

export default function Slider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([
      "https://des.mendoza.edu.ar/wp-content/uploads/2025/03/slide-mes-lectura-2025-escritorio.png",
      "https://www.mendoza.edu.ar/wp-content/uploads/2025/06/slide-matematica-monitor.jpg",
      
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
