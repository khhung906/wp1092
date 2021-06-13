import { gql } from '@apollo/client';

export const SEND_MESSAGE_MUTATION = gql`
mutation sendMessage(
    $name1: String!
    $name2: String!
    $message: String!
    ) {
      sendMessage(
        name1: $name1
        name2: $name2
        message: $message
      ) {
        id
          name
        messages{
          id
          body
          sender{
            name
          }
        }
      }
    }
`; 