import { useSubscription } from '@apollo/client';
import { MESSAGE_POSTED } from '../graphql/queries';

const useMessageSubscription = (room: string, onNewMessage: () => void) => {
  useSubscription(MESSAGE_POSTED, {
    variables: { room },
    onSubscriptionData: () => {
      onNewMessage();
    },
  });
};

export default useMessageSubscription;
