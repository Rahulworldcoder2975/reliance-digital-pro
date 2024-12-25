export const GET_PRODUCT_BY_CATEGORY = (category, Page) =>
  `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10 &page=${Page}&filter={"subCategory":"${category}"}`;
