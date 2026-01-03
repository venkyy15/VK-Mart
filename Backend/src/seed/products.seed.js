// src/seed/products.seed.js
// Category-wise PROFESSIONAL seed data
// Compatible with updated Product model

const products = [
  /* =======================
     MOBILES
  ======================= */
  {
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    category: "mobiles",
    brand: "Apple",
    price: 129999,
    stock: 10,
    image:
      "https://res.cloudinary.com/dzkphyik7/image/upload/v1766213735/iphone15pro_vi0q2k.jpg",
    description:
      "Apple iPhone 15 Pro powered by the A17 Pro chip delivers unmatched performance, advanced camera capabilities, and a premium titanium design.",
    highlights: [
      "A17 Pro Chip",
      "48MP Pro Camera System",
      "Titanium Design",
      "All-day Battery Life"
    ],
    specifications: {
      display: "6.1-inch Super Retina XDR",
      processor: "Apple A17 Pro",
      camera: "48MP + 12MP + 12MP",
      battery: "Up to 23 hours video playback",
      charging: "USB-C Fast Charging",
      ram: "8GB",
      storage: "128GB / 256GB / 512GB",
      os: "iOS 17"
    }
  },

  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    category: "mobiles",
    brand: "Samsung",
    price: 119999,
    stock: 15,
    image:
      "https://res.cloudinary.com/dzkphyik7/image/upload/v1766213735/s24ultra_pegriw.jpg",
    description:
      "Samsung Galaxy S24 Ultra with cutting-edge AI features, 200MP camera, and powerful Snapdragon processor.",
    highlights: [
      "200MP Quad Camera",
      "Snapdragon 8 Gen 3",
      "S-Pen Support",
      "5000mAh Battery"
    ],
    specifications: {
      display: "6.8-inch AMOLED 120Hz",
      processor: "Snapdragon 8 Gen 3",
      camera: "200MP + 50MP + 12MP + 10MP",
      battery: "5000mAh",
      charging: "45W Fast Charging",
      ram: "12GB",
      storage: "256GB / 512GB",
      os: "Android 14"
    }
  },

  {
    name: "OnePlus 12",
    slug: "oneplus-12",
    category: "mobiles",
    brand: "OnePlus",
    price: 69999,
    stock: 20,
    image:
      "https://res.cloudinary.com/dzkphyik7/image/upload/v1766213735/oneplus12_za1k6w.jpg",
    description:
      "OnePlus 12 offers flagship performance with a Snapdragon chipset, Hasselblad camera system, and fast charging.",
    highlights: [
      "Hasselblad Camera",
      "Snapdragon 8 Gen 3",
      "120Hz AMOLED Display",
      "100W SuperVOOC Charging"
    ],
    specifications: {
      display: "6.82-inch AMOLED 120Hz",
      processor: "Snapdragon 8 Gen 3",
      camera: "50MP + 48MP + 64MP",
      battery: "5400mAh",
      charging: "100W Fast Charging",
      ram: "12GB",
      storage: "256GB",
      os: "Android 14"
    }
  },

  /* =======================
     ELECTRONICS
  ======================= */
  {
    name: "Sony Bravia 55 Inch 4K TV",
    slug: "sony-bravia-55",
    category: "electronics",
    brand: "Sony",
    price: 79999,
    stock: 5,
    image:
      "https://res.cloudinary.com/dzkphyik7/image/upload/v1766214075/sonybravia55_qbgi1e.jpg",
    description:
      "Sony Bravia 4K Ultra HD Smart LED TV delivers immersive visuals with Dolby Vision and powerful sound.",
    highlights: [
      "4K Ultra HD Display",
      "Dolby Vision & Atmos",
      "Google TV",
      "X1 Processor"
    ],
    specifications: {
      display: "55-inch LED 4K",
      resolution: "3840 x 2160",
      smartTv: "Yes (Google TV)",
      audio: "20W Dolby Audio",
      ports: "HDMI x4, USB x2"
    }
  },

  {
    name: "Apple MacBook Air M2",
    slug: "macbook-air-m2",
    category: "electronics",
    brand: "Apple",
    price: 114999,
    stock: 8,
    image:
      "https://res.cloudinary.com/dzkphyik7/image/upload/v1766214073/macbookairm2_mluvr5.jpg",
    description:
      "MacBook Air M2 delivers blazing-fast performance with a thin, lightweight design and long battery life.",
    highlights: [
      "Apple M2 Chip",
      "Retina Display",
      "All-day Battery",
      "Fanless Design"
    ],
    specifications: {
      display: "13.6-inch Retina",
      processor: "Apple M2",
      ram: "8GB",
      storage: "256GB SSD",
      battery: "Up to 18 hours"
    }
  },

  /* =======================
     FASHION
  ======================= */
  {
    name: "Nike Running Shoes",
    slug: "nike-running-shoes",
    category: "fashion",
    brand: "Nike",
    price: 5999,
    stock: 30,
    image:
      "https://res.cloudinary.com/dzkphyik7/image/upload/v1766214141/nike-shoes_jymyer.jpg",
    description:
      "Nike running shoes designed for comfort, durability, and enhanced performance.",
    highlights: [
      "Breathable Mesh",
      "Lightweight Design",
      "High Grip Sole",
      "Comfort Fit"
    ],
    specifications: {
      material: "Mesh & Rubber",
      fit: "Regular",
      occasion: "Sports / Running",
      sole: "Rubber",
      care: "Wipe with clean cloth"
    }
  },

  {
    name: "Men Casual Shirt",
    slug: "men-casual-shirt",
    category: "fashion",
    brand: "Levis",
    price: 1499,
    stock: 50,
    image:
      "https://res.cloudinary.com/dzkphyik7/image/upload/v1766214140/casual-shirt_svgtes.jpg",
    description:
      "Stylish cotton casual shirt suitable for office and everyday wear.",
    highlights: [
      "100% Cotton Fabric",
      "Slim Fit",
      "Soft & Breathable",
      "Easy Wash"
    ],
    specifications: {
      fabric: "Cotton",
      fit: "Slim Fit",
      sleeve: "Full Sleeve",
      pattern: "Solid",
      washCare: "Machine Wash"
    }
  },

  /* =======================
     HOME
  ======================= */
  {
    name: "Wooden Dining Table",
    slug: "wooden-dining-table",
    category: "home",
    brand: "HomeCraft",
    price: 24999,
    stock: 4,
    image:
      "https://res.cloudinary.com/dzkphyik7/image/upload/v1766214183/dining-table_kcojtc.jpg",
    description:
      "Premium 6-seater wooden dining table crafted for durability and elegance.",
    highlights: [
      "Solid Wood Material",
      "6-Seater Design",
      "Modern Finish",
      "Long-lasting Build"
    ],
    specifications: {
      material: "Solid Wood",
      seating: "6 Seater",
      finish: "Matte",
      shape: "Rectangle"
    }
  },

  /* =======================
     APPLIANCES
  ======================= */
  {
    name: "Philips Mixer Grinder",
    slug: "philips-mixer",
    category: "appliances",
    brand: "Philips",
    price: 3499,
    stock: 25,
    image:
      "https://res.cloudinary.com/dzkphyik7/image/upload/v1766214219/philips-mixer_rdbdjh.webp",
    description:
      "Powerful 750W mixer grinder suitable for everyday kitchen needs.",
    highlights: [
      "750W Powerful Motor",
      "Multiple Jars",
      "Overload Protection",
      "Compact Design"
    ],
    specifications: {
      power: "750W",
      jars: "3 Jars",
      material: "Stainless Steel",
      warranty: "2 Years"
    }
  },

  /* =======================
     BEAUTY
  ======================= */
  {
    name: "Lakme Face Cream",
    slug: "lakme-face-cream",
    category: "beauty",
    brand: "Lakme",
    price: 499,
    stock: 40,
    image:
      "https://res.cloudinary.com/dzkphyik7/image/upload/v1766214273/lakme-cream_dngjcv.jpg",
    description:
      "Lakme moisturizing face cream keeps your skin hydrated and glowing all day.",
    highlights: [
      "Dermatologically Tested",
      "24 Hour Moisture",
      "Non-greasy Formula",
      "Suitable for All Skin Types"
    ],
    specifications: {
      skinType: "All Skin Types",
      quantity: "50g",
      formulation: "Cream",
      usage: "Daily"
    }
  }
];

export default products;
