import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import commerce from "../../lib/commerce";

import ProductCard from "../../components/ProductCard";

function Products() {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    setLoading(true);
    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Container fluid className="p-4">
      <h3>Produtos</h3>
      <div className="products-container">
        {isLoading ? (
          <div className="spinner-container">
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <>
            {products.map((item) => {
              return <ProductCard key={item.id} item={item} />;
            })}
          </>
        )}
      </div>
    </Container>
  );
}

export default Products;
