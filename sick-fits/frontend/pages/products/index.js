import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage({ query }) {
  const page = parseInt(query.page);

  return (
    <div>
      <Pagination page={parseInt(page) || 1} />
      <Products page={page || 1} />
      <Pagination page={parseInt(page) || 1} />
    </div>
  );
}
