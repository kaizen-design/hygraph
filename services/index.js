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
              bio
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
        where: {slug_not: "$slug", AND: {categories_some: {slug_in: "$categories"}}}
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