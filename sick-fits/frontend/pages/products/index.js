import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage({ query }) {
  return (
    <div>
      <Pagination page={parseInt(query.page) || 1} />
      <Products />
      <Pagination page={parseInt(query.page) || 1} />
    </div>
  );
}
