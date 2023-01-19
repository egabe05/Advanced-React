import { useMutation } from '@apollo/client';
import CurrentUserQuery from '../graphql_operations/CurrentUserQuery.graphql';
import EndSessionMutation from '../graphql_operations/EndSessionMutation.graphql';

export default function SignOut() {
  const [endSession] = useMutation(EndSessionMutation, {
    refetchQueries: [{ query: CurrentUserQuery }],
  });

  return (
    <button type="button" onClick={endSession}>
      Sign Out
    </button>
  );
}
