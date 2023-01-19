import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { AuthenticateUserMutation } from '../graphql_operations/AuthenticateUserMutation.graphql';
import { CurrentUserQuery } from '../graphql_operations/CurrentUserQuery.graphql';
import Error from './ErrorMessage';

export default function SignIn() {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    password: '',
  });

  const [authenticateUser, { data, loading }] = useMutation(
    AuthenticateUserMutation,
    {
      variables: {
        email: inputs.email,
        password: inputs.password,
      },
      refetchQueries: [
        {
          query: CurrentUserQuery,
        },
      ],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await authenticateUser();
    clearForm();
  }

  const error =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={async (e) => handleSubmit(e)}>
      <fieldset>
        <Error error={error} />
        <label htmlFor="email">
          Email
          <input
            disabled={loading}
            required
            type="email"
            id="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            disabled={loading}
            required
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button disabled={loading} type="submit">
          Sign In
        </button>
      </fieldset>
    </Form>
  );
}
