import { useState, useEffect } from 'react';
import { getCategories } from '../services';
import Link from 'next/link';

const CategoriesWidget = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(result => setCategories(result));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h3 className="text-lg font-semibold border-b pb-4 mb-8">
        Categories
      </h3> 
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.slug}`}>
          <a className="cursor-pointer block mb-3 hover:text-pink-700 pb-3 mb-3 border-b font-medium">
            {category.name}
          </a>
        </Link>
      ))}
    </div>
  )
};

export default CategoriesWidget;