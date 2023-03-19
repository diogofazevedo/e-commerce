import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";

import ProductCard from "../../components/ProductCard";

function Cart() {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) ?? []
  );

  const total = products.reduce((accumulator, object) => {
    return accumulator + object.price.raw * object.quantity;
  }, 0);

  useEffect(() => {
    const handleWindowStorage = () => {
      setProducts(JSON.parse(localStorage.getItem("products")) ?? []);
    };
    window.addEventListener("storage", handleWindowStorage);
    return () => {
      window.removeEventListener("storage", handleWindowStorage);
    };
  }, []);

  return (
    <Container fluid className="p-4">
      <h3>Carrinho de compras</h3>
      <label>{products.length} produtos</label>
      <div className="cart-products">
        {products.map((item) => {
          return <ProductCard key={item.id} item={item} cartMode />;
        })}
      </div>
      {products.length > 0 && (
        <div className="d-flex justify-content-between align-items-center">
          <label className="bold">Total: €{total.toFixed(2)}</label>
          <Button
            variant="dark"
            onClick={() => toast.success("Compra finalizada com sucesso.")}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Cart;
