import "./Banner.css";

export default function Banner() {
  return (
    <div className="home-banner-wrapper">
      <div className="home-banner">
        <picture>
          {/* Mobile */}
          <source
            media="(max-width: 768px)"
            srcSet="https://res.cloudinary.com/dzkphyik7/image/upload/v1767349558/Vk-mart_banner_uzt7h5.png"
          />

          {/* Tablet */}
          <source
            media="(max-width: 1023px)"
            srcSet="https://res.cloudinary.com/dzkphyik7/image/upload/v1767349558/Vk-mart_banner_uzt7h5.png"
          />

          {/* Desktop */}
          <img
            src="https://res.cloudinary.com/dzkphyik7/image/upload/v1767349558/Vk-mart_banner_uzt7h5.png"
            alt="VK Mart Big Sale"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </picture>
      </div>
    </div>
  );
}
