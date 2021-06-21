import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
  query chatbox(
   $name: String!
  ){
    chatbox(
        name: $name
    ){
      name
      messages{
        name
        sender{
          name
        }
        body
      }
    
    }
  }
`;
