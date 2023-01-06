import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import PaginatedProductsQuery from '../graphql_operations/PaginatedProductsQuery.graphql';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(PaginatedProductsQuery);

  if (loading) return null;

  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const totalPages = Math.ceil(count / perPage);
  console.log(page === 1);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {totalPages}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Previous</a>
      </Link>
      <p>
        Page {page} of {totalPages}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= totalPages}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}
