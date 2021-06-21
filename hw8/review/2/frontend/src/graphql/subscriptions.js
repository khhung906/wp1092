import { gql } from "@apollo/client";

export const MESSAGES_SUBSCRIPTION = gql`
  subscription addMessages($name: String!) {
    addMessages(name: $name) {
      mutation
      data {
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
