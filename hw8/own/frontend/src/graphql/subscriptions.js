import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
subscription MessageReceived(
  $key: String!
  ) {
    MessageReceived(
      key: $key
    ) {
      sender{
        name
      }
      body
    }
  }
`;
