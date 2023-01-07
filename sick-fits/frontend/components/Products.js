import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';
import { AllProductsQuery } from '../graphql_operations/AllProductsQuery.graphql';
import { perPage } from '../config';

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(AllProductsQuery, {
    variables: { first: perPage, skip: (page - 1) * perPage },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.name} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
