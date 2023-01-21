import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { RequestResetMutation } from '../graphql_operations/RequestResetMutation.graphql';
import Error from './ErrorMessage';

export default function RequestReset() {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
  });

  const [requestReset, { data, loading, error }] = useMutation(
    RequestResetMutation,
    {
      variables: {
        email: inputs.email,
      },
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await requestReset().catch(console.error);
    clearForm();
  }

  return (
    <Form method="POST" onSubmit={async (e) => handleSubmit(e)}>
      <h2>Request a password reset</h2>
      <Error error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link</p>
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
        <button disabled={loading} type="submit">
          Request Reset
        </button>
      </fieldset>
    </Form>
  );
}
