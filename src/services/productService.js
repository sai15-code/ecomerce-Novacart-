import { PRODUCTS, CATEGORIES } from '../data/products';

export async function fetchProducts({
  category = 'All',
  inStockOnly = false,
  search = '',
  sort = 'Featured',
  simulateDelay = 0,
  simulateError = false
} = {}) {
  if (simulateDelay > 0) {
    await new Promise(resolve => setTimeout(resolve, simulateDelay));
  }

  if (simulateError) {
    throw new Error('STATUS 503 SERVICE UNAVAILABLE: Catalog Edge synchronization handshake latency');
  }

  let result = [...PRODUCTS];

  // Category filter
  if (category && category !== 'All') {
    result = result.filter(item => 
      item.category.toLowerCase() === category.toLowerCase() ||
      (category === 'Everyday Carry' && item.category === 'Accessories')
    );
  }

  // Stock filter
  if (inStockOnly) {
    result = result.filter(item => item.inStock);
  }

  // Search filter
  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    result = result.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q))
    );
  }

  // Sort
  if (sort === 'Price: Low to High') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'Price: High to Low') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'Customer Rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'Newest') {
    result.sort((a, b) => b.id - a.id);
  }

  return result;
}

export async function fetchProductById(id) {
  const numId = Number(id);
  const found = PRODUCTS.find(p => p.id === numId);
  if (!found) {
    throw new Error(`Product with ID ${id} not found`);
  }
  return found;
}

export function getCategories() {
  return CATEGORIES;
}
