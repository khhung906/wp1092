import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription message(
    $chatbox_name : String!
  ){
    message (
      chatbox_name: $chatbox_name
    ){
      mutation
      data {
        name
        sender{
          name
        }
        body
      }
    }
  }
`;
