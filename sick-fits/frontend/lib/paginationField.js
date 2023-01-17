import { PaginatedProductsQuery } from '../graphql_operations/PaginatedProductsQuery.graphql';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      const data = cache.readQuery({ query: PaginatedProductsQuery });
      const productsCount = data?._allProductsMeta?.count;
      const currentPage = skip / first + 1;
      const totalPages = Math.ceil(productsCount / first);

      // Check cache for existing products
      const products = existing.slice(skip, skip + first).filter((x) => x);

      // When on last page and products exist, use cache
      if (
        products.length &&
        products.length !== first &&
        currentPage === totalPages
      ) {
        return products;
      }

      // When we do not have all the products for the page, use network
      if (products.length !== first) {
        return false;
      }

      // When cache contains products already, use cache
      if (products.length === first) {
        return products;
      }

      // Fallback
      return false;
    },
    merge(existing = [], incoming, { args }) {
      const { skip } = args;

      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; i += 1) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
