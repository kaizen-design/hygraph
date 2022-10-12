import { useContext } from "react";
import Link from "next/link";

const categories = [
  {
    name: 'Web Development',
    slug: 'web-development'
  },
  {
    name: 'React',
    slug: 'react'
  }
];

const Header = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full flex justify-between items-center border-blue-400 py-8">
        <Link href="/">
          <span className="cursor-pointer text-4xl text-white font-bold">
            Hygraph
          </span>
        </Link>
        <ul className="hidden md:flex">
          {categories.map((category) => (
            <li key={category.name} className="ml-4">
              <Link href={`/category/${category.slug}`}>
                <span className="text-white cursor-pointer font-semibold">
                  {category.name}
                </span> 
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;