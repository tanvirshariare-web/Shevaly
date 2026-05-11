const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');

// We use string replacement to inject the new female-focused categories and products.
const femaleHierarchicalCategories = `const hierarchicalCategories = [
  {
    name: 'Women\\'s Clothing',
    subcategories: [
      { name: 'Traditional', items: ['Saree', 'Salwar Kameez', 'Kurti', 'Lehenga'] },
      { name: 'Western', items: ['Dresses', 'Tops', 'Jeans', 'Skirts', 'Jumpsuits'] },
      { name: 'Winterwear', items: ['Sweaters', 'Jackets', 'Cardigans', 'Shawls'] }
    ]
  },
  {
    name: 'Footwear',
    subcategories: [
      { name: 'Flats & Sandals', items: ['Sandals', 'Flip Flops', 'Ballet Flats'] },
      { name: 'Heels', items: ['Stilettos', 'Block Heels', 'Wedges'] },
      { name: 'Shoes', items: ['Sneakers', 'Boots'] }
    ]
  },
  {
    name: 'Beauty & Makeup',
    subcategories: [
      { name: 'Makeup', items: ['Lipstick', 'Foundation', 'Eye Shadow', 'Mascara'] },
      { name: 'Skincare', items: ['Face Wash', 'Moisturizer', 'Serum', 'Sunscreen'] },
      { name: 'Hair Care', items: ['Shampoo', 'Conditioner', 'Hair Oil', 'Styling'] }
    ]
  },
  {
    name: 'Jewelry & Accessories',
    subcategories: [
      { name: 'Jewelry', items: ['Earrings', 'Necklaces', 'Rings', 'Bracelets'] },
      { name: 'Bags', items: ['Handbags', 'Tote Bags', 'Clutches', 'Backpacks'] },
      { name: 'Accessories', items: ['Watches', 'Sunglasses', 'Belts'] }
    ]
  },
  {
    name: 'Lingerie & Sleepwear',
    subcategories: [
      { name: 'Lingerie', items: ['Bras', 'Panties', 'Sets'] },
      { name: 'Sleepwear', items: ['Nightgowns', 'Pajamas', 'Robes'] }
    ]
  }
];`;

const femaleCategories = `const categories = [
  { name: 'Traditional Wear', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
  { name: 'Western Wear', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80' },
  { name: 'Footwear', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bf85033c5a?w=400&q=80' },
  { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80' },
  { name: 'Bags', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80' },
];`;

const femaleProducts = `const products = [
  { 
    name: 'Elegant Silk Saree', category: 'Traditional Wear', price: 4500, oldPrice: 5999, discount: 25, 
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80', 
      'https://images.unsplash.com/photo-1583391733958-66e215ab7ba3?w=500&q=80'
    ], 
    sizes: ['Free Size'], colors: ['Maroon', 'Gold'], stock: 10, rating: 4.8, reviews: 156,
    tags: ['Best Seller', 'Trending']
  },
  { 
    name: 'Floral Chiffon Dress', category: 'Western Wear', price: 1899, oldPrice: 2499, discount: 24, 
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=500&q=80',
      'https://images.unsplash.com/photo-1515347619145-ea48cc0b6cc8?w=500&q=80'
    ], 
    sizes: ['S', 'M', 'L'], colors: ['Pink', 'White'], stock: 25, rating: 4.9, reviews: 204,
    tags: ['Trending']
  },
  { 
    name: 'Rose Gold Plated Necklace', category: 'Jewelry', price: 999, oldPrice: 1499, discount: 33, 
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80'
    ], 
    sizes: ['Standard'], colors: ['Rose Gold'], stock: 45, rating: 4.7, reviews: 89,
    tags: ['Gift Idea']
  },
  { 
    name: 'Matte Liquid Lipstick', category: 'Beauty', price: 650, oldPrice: 850, discount: 23, 
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80'
    ], 
    sizes: ['5ml'], colors: ['Ruby Red', 'Nude Blush', 'Deep Berry'], stock: 100, rating: 4.6, reviews: 420,
    tags: ['Best Seller']
  },
  { 
    name: 'Designer Leather Handbag', category: 'Bags', price: 3200, oldPrice: 4500, discount: 28, 
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80'
    ], 
    sizes: ['Medium'], colors: ['Maroon', 'Black'], stock: 12, rating: 4.9, reviews: 67,
    tags: ['Premium']
  },
  { 
    name: 'Stiletto Party Heels', category: 'Footwear', price: 2100, oldPrice: 2999, discount: 30, 
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80'
    ], 
    sizes: ['36', '37', '38', '39', '40'], colors: ['Silver', 'Black'], stock: 18, rating: 4.5, reviews: 112,
    tags: ['Party Wear']
  },
  { 
    name: 'Cotton Printed Kurti', category: 'Traditional Wear', price: 1299, oldPrice: 1899, discount: 31, 
    image: 'https://images.unsplash.com/photo-1583391733958-66e215ab7ba3?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1583391733958-66e215ab7ba3?w=500&q=80'
    ], 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Blue', 'Yellow'], stock: 35, rating: 4.6, reviews: 245,
    tags: ['Casual']
  },
  { 
    name: 'Hydrating Face Serum', category: 'Beauty', price: 1100, oldPrice: 1500, discount: 26, 
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80'
    ], 
    sizes: ['30ml'], colors: ['Clear'], stock: 50, rating: 4.8, reviews: 315,
    tags: ['Must Have']
  }
];`;

const startHierarchical = code.indexOf('const hierarchicalCategories = [');
const endHierarchical = code.indexOf('];', startHierarchical) + 2;

code = code.substring(0, startHierarchical) + femaleHierarchicalCategories + code.substring(endHierarchical);


const startCategories = code.indexOf('const categories = [');
const endCategories = code.indexOf('];', startCategories) + 2;

code = code.substring(0, startCategories) + femaleCategories + code.substring(endCategories);


const startProducts = code.indexOf('const products = [');
let endProducts = code.indexOf('];', startProducts) + 2;
// Check if the match actually caught the block end, might be tricky if there's nested arrays.
// Because "products" array wraps objects, '];' at the root indentation is correct. We can just use the provided block.
code = code.substring(0, startProducts) + femaleProducts + code.substring(endProducts);

fs.writeFileSync('app/page.tsx', code);
console.log('Categories and Products replaced.');
