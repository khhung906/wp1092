import { gql } from "@apollo/client";

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox($name1: String!, $name2: String!) {
    createChatBox(name1: $name1, name2: $name2) {
      id
      name
      messages {
        id
        sender {
          id
          name
        }
        body
      }
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($sender: String!, $body: String!, $chatBoxName: String!) {
    createMessage(sender: $sender, body: $body, chatBoxName: $chatBoxName) {
      id
      sender {
        id
        name
      }
      body
    }
  }
`;
