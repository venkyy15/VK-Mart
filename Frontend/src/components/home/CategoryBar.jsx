// src/components/home/CategoryBar.jsx

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const categories = [
  { name: "Mobiles", slug: "mobiles" },
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Home", slug: "home" },
  { name: "Beauty", slug: "beauty" },
  { name: "Appliances", slug: "appliances" },
];

export default function CategoryBar() {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!userId) return null;

  /* ===============================
     STYLES
  ================================ */
  const barStyle = {
    width: "100%",
    background: "linear-gradient(180deg, #f6fffb, #ecfff6)",
    borderBottom: "1px solid #d9f5e8",
  };

  const trackStyle = {
    display: "flex",
    gap: "12px",
    padding: "14px 12px",
    overflowX: isMobile ? "auto" : "visible",
    justifyContent: isMobile ? "flex-start" : "center",
    flexWrap: isMobile ? "nowrap" : "wrap",
    scrollbarWidth: "none",
  };

  const pillStyle = {
    flexShrink: 0,
    padding: "9px 18px",
    borderRadius: "999px",
    background: "#ffffff",
    color: "#0f3d2e",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    border: "1px solid #cfeee0",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "all 0.25s ease",
  };

  return (
    <nav aria-label="Categories" style={barStyle}>
      <div style={trackStyle}>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/${userId}/category/${cat.slug}`}
            style={pillStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0f3d2e";
              e.currentTarget.style.color = "#f5c26b";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 14px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color = "#0f3d2e";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 10px rgba(0,0,0,0.05)";
            }}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
