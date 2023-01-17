import { useQuery } from '@apollo/client';
import { CurrentUserQuery } from '../graphql_operations/CurrentUserQuery.graphql';

export function useUser() {
  const { data } = useQuery(CurrentUserQuery);
  return data?.authenticatedItem;
}
