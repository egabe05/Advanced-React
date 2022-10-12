import { useQuery, useMutation } from '@apollo/client';
import Router from 'next/router';
import { SingleProductQuery } from '../graphql_operations/SingleProductQuery.graphql';
import { UpdateProductMutation } from '../graphql_operations/UpdateProduct.graphql';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function UpdateProduct({ id }) {
  const { data, loading, error } = useQuery(SingleProductQuery, {
    variables: { where: { id } },
  });

  const [
    updateProduct,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UpdateProductMutation);

  const { inputs, handleChange, clearForm } = useForm(data?.Product);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs.price);
        await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
