// src/components/home/CategoryBar.jsx

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const categories = [
  { name: "Mobiles", slug: "mobiles" },
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Home", slug: "home" },
  { name: "Beauty", slug: "beauty" },
  { name: "Appliances", slug: "appliances" }
];

export default function CategoryBar() {
  // ✅ get user from redux (CORRECT)
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  // If user not logged in, don't render bar
  if (!userId) return null;

  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          to={`/${userId}/category/${cat.slug}`} // 🔥 FIXED ROUTE
          className="category-item"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
