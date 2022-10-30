import { useMutation } from '@apollo/client';
import { DeleteProductMutation } from '../graphql_operations/DeleteProductMutation.graphql';

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { data, loading }] = useMutation(
    DeleteProductMutation,
    {
      variables: { id },
      update,
    }
  );

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
