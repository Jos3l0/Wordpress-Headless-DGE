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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((post) => (
          <div key={post.id} className="slide">
            <a href={`/post/${post.id}`}>
              <img
                src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                alt={post.title.rendered}
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}

