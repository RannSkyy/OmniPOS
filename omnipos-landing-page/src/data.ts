import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'nike-waffle-debut',
    name: 'Nike Waffle Debut',
    category: 'Shoes',
    stock: 218,
    initialStock: 218,
    price: 80.00,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500&q=80',
    description: 'Retro gets modernized in the Nike Waffle Debut. Remember that smooth nylon and suede trend? It is back, along with the modernized wedge midsole that looks incredibly sleeker.',
    colors: ['Green/Off-White', 'Black/White', 'Pure Crimson'],
    sizeOptions: [39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 'nike-tech',
    name: 'Nike Tech',
    category: 'Clothing',
    stock: 198,
    initialStock: 198,
    price: 130.83,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80',
    description: 'Crafted with stretchy, breathable material, the Nike Tech Woven Jacket is designed to move with you through your day, whether running errands or working from home.',
    colors: ['Stone Gray', 'Obsidian Black', 'Summit White'],
    sizeOptions: [40, 42, 44, 46, 48]
  },
  {
    id: 'nike-v2k-run-new',
    name: 'Nike V2K Run New',
    category: 'Others Product',
    stock: 123,
    initialStock: 123,
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=500&q=80',
    description: 'The Nike Elite Crew Basketball Socks offer a supportive fit and feel thanks to an arch band, while zonal cushioning helps absorb impact as you run the court.',
    colors: ['White/Black', 'Pure Black', 'Vibrant Pink'],
    sizeOptions: [38, 40, 42, 44]
  },
  {
    id: 'nike-p-6000',
    name: 'Nike P-6000',
    category: 'Shoes',
    stock: 121,
    initialStock: 121,
    price: 115.28,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
    description: 'The Nike P-6000 draws on the 2006 Nike Air Pegasus, bringing you a mash-up of Pegasus history that is breathable, comfortable, and reminiscent of early-2000s style.',
    colors: ['Crimson Red', 'Metallic Platinum', 'Laser Blue'],
    sizeOptions: [40, 41, 42, 43, 44, 45]
  },
  {
    id: 'nike-zoom-vomero-roam',
    name: 'Nike Zoom Vomero Roam',
    category: 'Shoes',
    stock: 119,
    initialStock: 119,
    price: 187.43,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80',
    description: 'Designed for city conditions, this winterized version of the Zoom Vomero features durable water repellent treatments, utility traction patterns, and warm liners.',
    colors: ['Forest Green', 'Sail White', 'Matte Black'],
    sizeOptions: [39, 41, 42, 43, 44, 46]
  },
  {
    id: 'mens-fleece-cargo-pants',
    name: "Men's Fleece Cargo Pants",
    category: 'Clothing',
    stock: 192,
    initialStock: 192,
    price: 65.42,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80',
    description: 'Clean meets casual with these brushed fleece cargo pants. Standard fit is relaxed through the seat and thighs with a slight taper toward the ribbed ankles.',
    colors: ['Charcoal Black', 'Heather Gray', 'Olive Drab'],
    sizeOptions: [40, 42, 44, 46, 48]
  },
  {
    id: 'nike-zoom-phantom-flyknit',
    name: 'Nike Zoom Phantom Flyknit',
    category: 'Shoes',
    stock: 154,
    initialStock: 154,
    price: 180.00,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=500&q=80',
    description: 'Phantom meets pure speed. The lightweight Flyknit upper hugs your foot while the React foam underfoot offers an incredibly springy and energized stride.',
    colors: ['Cocoa Brown/Gold', 'Infrared Pink', 'Triple Black'],
    sizeOptions: [40, 41, 42, 43, 44, 45]
  },
  {
    id: 'nike-club-unstructured-cap',
    name: 'Nike Club Unstructured Cap',
    category: 'Others Product',
    stock: 87,
    initialStock: 87,
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13ce3a?auto=format&fit=crop&w=500&q=80',
    description: 'A classic unstructured metal-swoosh cap with lightweight, moisture-wicking technology to keep your head cool and dry through the hot summer days.',
    colors: ['Solid Black', 'Pure White', 'Midnight Navy'],
    sizeOptions: [38, 40, 42]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Jessica Rahardjo',
    role: 'Store Manager, Stride Jakarta',
    comment: 'Alat POS transaksi tercanggih yang pernah kami gunakan. Sangat responsif saat memasukkan item dan kalkulasi diskon otomatisnya memotong waktu antrean kasir hingga 50%.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    name: 'Budi Santoso',
    role: 'Owner, Hoop & Run Apparel',
    comment: 'Tampilan live detail transaksinya sangat akurat dan sinkronisasi stok real-time-nya membantu kami menyeimbangkan stok antar-cabang dengan instan.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 3,
    name: 'David Wijaya',
    role: 'Operations Director, RunNation Indo',
    comment: 'Sangat menyukai desain minimalisnya yang elegan dengan kombinasi warna hitam yang gagah dan aksen neon hijau yang modern. Klien kami selalu terpikat saat melihat kasir bertransaksi.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];
