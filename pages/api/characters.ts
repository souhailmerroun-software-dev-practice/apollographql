// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  characters: any
  info: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { page } = req.query;

  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  })

  const { data } = await client.query({
    query: gql`
      query {
        characters(page: ${page}) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            image
          }
        }
      }
    `
  });

  const characters = data.characters.results;
  const info = data.characters.info;

  res.status(200).json({ characters: characters, info: info })
}
