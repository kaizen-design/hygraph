import Head from 'next/head';
import { 
  PostDetails, 
  Author,
  Comments,
  CommentForm,
  CategoriesWidget, 
  PostWidget 
} from '../../components';
import { getPost, getPosts } from '../../services';

const SinglePost = ({ post }) => {  
  console.log(post)
  return (
    <div className="container mx-auto px-4 sm:px-10 mb-8">
      <Head>
        <title>{post.title} | Hygraph</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 col-span-1">
          <PostDetails post={post} />
          <Author author={post.author} />
          <CommentForm slug={post.slug} />
          <Comments slug={post.slug} />          
        </div>  
        <div className="lg:col-span-4 col-span-1 mb-8">
          <div className="lg:sticky relative top-8">
            <PostWidget slug={post.slug} categories={post.categories.map(el => el.slug)} />
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

export async function getStaticProps({ params }) {  
  const post = await getPost(params.slug);
  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const posts = (await getPosts()) || [];  
  const paths = posts.map((post) => ({
    params: { slug: post.node.slug }
  }));
  return {
    paths,
    fallback: false
  }
}