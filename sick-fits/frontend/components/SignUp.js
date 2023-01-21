import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CreateUserMutation } from '../graphql_operations/CreateUserMutation.graphql';
import Error from './ErrorMessage';

export default function SignUp() {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [createUser, { data, loading, error }] = useMutation(
    CreateUserMutation,
    {
      variables: {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      },
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await createUser().catch(console.error);
    clearForm();
  }

  return (
    <Form method="POST" onSubmit={async (e) => handleSubmit(e)}>
      <h2>Sign up for an account</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and sign in
          </p>
        )}
        <label htmlFor="email">
          Your Name
          <input
            disabled={loading}
            required
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={(e) => handleChange(e)}
          />
        </label>
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
          Sign Up
        </button>
      </fieldset>
    </Form>
  );
}
