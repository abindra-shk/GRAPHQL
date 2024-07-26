import { useMutation } from '@apollo/client';
import { POST_MESSAGE } from '../graphql/queries';

const usePostMessage = () => {
  const [postMessage] = useMutation(POST_MESSAGE);

  const sendMessage = async (content: string, author: string, room: string) => {
    if (content.trim()) {
      await postMessage({
        variables: {
          content,
          author,
          room,
        },
      });
    }
  };

  return sendMessage;
};

export default usePostMessage;
