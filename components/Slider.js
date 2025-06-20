"use client";

import { useEffect, useState } from "react";

export default function Slider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([
      "https://www.mendoza.edu.ar/wp-content/uploads/sites/3/2023/09/banner1.jpg",
      "https://www.mendoza.edu.ar/wp-content/uploads/sites/3/2023/09/banner2.jpg",
      "https://www.mendoza.edu.ar/wp-content/uploads/sites/3/2023/09/banner3.jpg"
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
