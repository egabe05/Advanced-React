import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';

const singleProductQuery = gql`
  query Product($where: ProductWhereUniqueInput!) {
    Product(where: $where) {
      id
      name
      description
      photo {
        id
        image {
          publicUrl
        }
        altText
      }
      status
      price
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(singleProductQuery, {
    variables: { where: { id } },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <DisplayError error={error} />;

  return (
    <div>
      <h2>{data.Product.name}</h2>
    </div>
  );
}
