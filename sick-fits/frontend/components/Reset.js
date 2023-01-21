import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { ResetMutation } from '../graphql_operations/ResetMutation.graphql';
import Error from './ErrorMessage';

export default function Reset({ token }) {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    password: '',
  });

  const [reset, { data, loading }] = useMutation(ResetMutation, {
    variables: {
      email: inputs.email,
      password: inputs.password,
      token: ';;;',
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await reset().catch(console.error);
    clearForm();
  }

  const error = data?.redeemUserPasswordResetToken
    ? data.redeemUserPasswordResetToken
    : undefined;

  console.log(error);

  return (
    <Form method="POST" onSubmit={async (e) => handleSubmit(e)}>
      <h2>Reset your password</h2>
      <Error error={error} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in</p>
        )}
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
        <label htmlFor="email">
          New Password
          <input
            disabled={loading}
            required
            type="password"
            id="password"
            name="password"
            placeholder="Your New Password"
            value={inputs.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button disabled={loading} type="submit">
          Reset
        </button>
      </fieldset>
    </Form>
  );
}
