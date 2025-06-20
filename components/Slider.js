"use client";
import { useEffect, useState } from "react";
import { fetchSliderPosts } from "@/lib/wordpress";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/components/slider.css";

export default function HomeSlider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    async function loadSliderPosts() {
      try {
        const data = await fetchSliderPosts();
        setSlides(data);
      } catch (error) {
        console.error("Error cargando el slider:", error);
      }
    }
    loadSliderPosts();
  }, []);

  if (!slides.length) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="slider-container mx-auto max-w-[1600px] h-[481px] overflow-hidden rounded-xl shadow">
      <Slider {...settings}>
        {slides.map((post) => (
          <div key={post.id} className="relative w-full h-[481px]">
            <a href={`/post/${post.id}`}>
              <img
                src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                alt={post.title.rendered}
                className="w-full h-full object-cover"
                width={1600}
                height={481}
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}
