import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      postsConnection {
        edges {
          node {
            author {
              name
              photo {
                url
              }
              id
            }
            categories {
              name
              slug
              id
            }
            createdAt
            excerpt
            featuredImage {
              url
            }
            featuredPost
            id
            slug
            title
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts {
      posts(orderBy: createdAt_DESC, last: 3) {
        id
        title
        slug
        createdAt
        featuredImage {
          url
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getRelatedPosts = async (categories, slug) => {
  const query = gql`
    query GetRelatedPosts($slug: String!, $categories: [String!]) {
      posts(
        last: 3
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
      ) {
          id
          title
          slug
          createdAt
          featuredImage {
            url
          }        
        }
    }
  `;
  const result = await request(graphqlAPI, query, { categories, slug });
  return result.posts;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPosts {
      posts(where: { featuredPost: true }) {
        id
        title
        slug
        createdAt
        featuredImage {
          url
        }
        author {
          name
          photo {
            url
          }         
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        slug
        name
        id
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories;
};

export const getPost = async (slug) => {
  const query = gql`
    query GetPost($slug: String!) {
      post(where: {slug: $slug}) {
        author {
          name
          photo {
            url
          }
          bio
          id
        }
        categories {          
          slug          
        }
        createdAt
        excerpt
        featuredImage {
          url
        }
        featuredPost
        id
        slug
        title
        content {
          raw
        }
      }      
    }    
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
        comment
        id
        name
        createdAt
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
}