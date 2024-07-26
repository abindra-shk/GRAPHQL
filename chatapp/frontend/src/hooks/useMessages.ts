import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';

const useMessages = (room: string) => {
  const { loading, error, data, refetch } = useQuery(GET_MESSAGES, {
    variables: { room },
  });

  return {
    loading,
    error,
    messages: data ? data.messages : [],
    refetch,
  };
};

export default useMessages;
