import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query GetMessages($room: String!) {
    messages(room: $room) {
      id
      content
      author
      room
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation PostMessage($content: String!, $author: String!, $room: String!) {
    postMessage(content: $content, author: $author, room: $room) {
      id
      content
      author
      room
    }
  }
`;

export const MESSAGE_POSTED = gql`
  subscription MessagePosted($room: String!) {
    messagePosted(room: $room) {
      id
      content
      author
      room
    }
  }
`;
