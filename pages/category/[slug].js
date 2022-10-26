import { useRouter } from 'next/router';
import Head from 'next/head';
import { getCategories, getCategoryPosts } from '../../services';
import { PostCard, CategoriesWidget, Loader } from '../../components';

const CategoryPosts = ({ posts, title }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>{`${title} | Hygraph`}</title>
        <meta name="description" content={`Posts from ${title} category`} />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <h1 className="text-white text-2xl mb-8 font-semibold">
            {title}            
          </h1>
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPosts;

export async function getStaticProps({ params }) {
  const posts = await getCategoryPosts(params.slug);
  const categories = await getCategories();
  const title = categories.filter(({ slug }) => slug === params.slug)[0].name;  

  return {
    props: { 
      posts,
      title
    },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}