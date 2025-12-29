export default function PrimeCard() {
  return (
    <div
      style={{
        width: "100%",
        padding: "4px 16px",
        backgroundColor: "#f4fff9",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",        // 🔥 Flipkart-style width
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <img
          src="https://res.cloudinary.com/dzkphyik7/image/upload/v1766996927/VK-prime_qlkiqh.png"
          alt="Vk Prime"
          style={{
            width: "100%",
            height: "320px",        // 🔥 DESKTOP HEIGHT CONTROL
            objectFit: "cover",     // 🔥 Amazon / Flipkart trick
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
