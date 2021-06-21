import { gql } from "@apollo/client";

export const CHATBOX_QUERY = gql`
  query chatBoxQuery(
    $name: String
  ) {
    chatBoxQuery(name: $name) {
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
