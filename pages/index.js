import Head from 'next/head';
import { PostCard, CategoriesWidget, PostWidget } from '../components';
import { getPosts } from '../services';
import { FeaturedPosts } from '../sections';

export default function Home({ posts }) {  
  return (
    <div className="container mx-auto px-4 sm:px-10 mb-8">
      <Head>
        <title>Hygraph</title>
        <meta name="description" content="Modern Blog App with React, GraphQL, NextJS, Tailwind CSS" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => <PostCard key={post.node.id} post={post.node} /> )}
        </div>  
        <div className="lg:col-span-4 col-span-1 mb-8">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: {
      posts
    }
  }
}