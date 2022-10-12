import Head from 'next/head';
import { PostCard, CategoriesWidget, PostWidget } from '../components';

const posts = [
  { 
    title: 'React Testing', 
    excerpt: 'Donec nec magna luctus mauris semper ornare eget ac felis. Nam tempor eu augue quis consectetur. Praesent sem nulla, lacinia tempus elit ut.' 
  },
  { 
    title: 'React With Tailwind', 
    excerpt: 'Donec nec magna luctus mauris semper ornare eget ac felis.' 
  }
];

export default function Home() {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Hygraph CMS Blog App</title>        
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => <PostCard key={index} post={post} /> )}
        </div>  
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  );
};
