import { gql } from '@apollo/client';

export const CHAT_QUERY = gql`
  query chatbox($key: String!) {
    chatbox(key: $key) {
      id
      name
      messages{
        id
        sender{
          name
        }
        body
      }
    }
  }
`;
