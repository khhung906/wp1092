import { gql } from '@apollo/client';

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox(
    $name1: String!
    $name2: String!
  ) {
    createChatBox(name1: $name1, name2: $name2) {
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

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $name: String!
    $sender: String!
    $body: String!
  ) {
    createMessage(
        name: $name
        sender: $sender
        body: $body
      ) {
        name
        sender{
          name
        }
        body
      }
    }
`;
