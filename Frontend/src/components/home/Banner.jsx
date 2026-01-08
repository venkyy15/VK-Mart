// src/components/home/Banner.jsx

import "./Banner.css";

export default function Banner() {
  return (
    <section className="home-banner-wrapper">
      <div className="home-banner">
        <picture>
          {/* Mobile */}
          <source
            media="(max-width: 768px)"
            srcSet="https://res.cloudinary.com/dzkphyik7/image/upload/v1767349558/Vk-mart_banner_uzt7h5.png"
          />

          {/* Tablet */}
          <source
            media="(max-width: 1024px)"
            srcSet="https://res.cloudinary.com/dzkphyik7/image/upload/v1767349558/Vk-mart_banner_uzt7h5.png"
          />

          {/* Desktop */}
          <img
            src="https://res.cloudinary.com/dzkphyik7/image/upload/v1767349558/Vk-mart_banner_uzt7h5.png"
            alt="VK Mart Big Sale"
            className="home-banner-image"
          />
        </picture>
      </div>
    </section>
  );
}
