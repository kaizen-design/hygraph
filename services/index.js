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