import { Link } from "react-router-dom";

const categories = [
  { name: "Mobiles", slug: "mobiles" },
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Home", slug: "home" },
  { name: "Beauty", slug: "beauty" },
  { name: "Appliances", slug: "appliances" }
];

export default function CategoryBar() {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          to={`/category/${cat.slug}`}
          className="category-item"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
