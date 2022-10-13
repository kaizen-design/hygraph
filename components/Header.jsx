import { useState, useEffect } from 'react';
import { getCategories } from '../services';
import Link from "next/link";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(result => setCategories(result));
  }, []);
  
  return (
    <div className="container mx-auto px-4 sm:px-10 mb-8">
      <div className="border-b w-full flex justify-between items-center border-blue-300 py-8">
        <Link href="/">
          <a className="cursor-pointer text-4xl text-white font-bold hover:text-blue-100 transition">
            Hygraph
          </a>
        </Link>
        <ul className="hidden md:flex">
          {categories.map((category) => (
            <li key={category.name} className="ml-6">
              <Link href={`/category/${category.slug}`}>
                <a className="text-white cursor-pointer font-semibold hover:text-blue-100 transition">
                  {category.name}
                </a> 
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;