import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faCartPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ item, cartMode }) => {
  const [quantity, setQuantity] = useState(item.quantity ?? 1);

  useEffect(() => {
    if (cartMode) {
      changeQuantity();
    }
  }, [quantity]);

  function changeQuantity() {
    let products = JSON.parse(localStorage.getItem("products"));
    if (!products) return;

    const productIndex = products.findIndex((x) => x.id === item.id);
    if (productIndex !== -1) {
      products[productIndex].quantity = quantity;
    }

    saveProducts(products);
  }

  function addProduct() {
    let products = JSON.parse(localStorage.getItem("products"));
    if (!products) {
      products = [];
    }

    const productIndex = products.findIndex((x) => x.id === item.id);
    if (productIndex !== -1) {
      products[productIndex].quantity += quantity;
    } else {
      products.push({
        id: item.id,
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: quantity,
      });
    }

    saveProducts(products);
    toast.success("Produto adicionado com sucesso.");
  }

  function removeProduct() {
    let products = JSON.parse(localStorage.getItem("products"));
    if (!products) return;

    const productsTemp = products.filter((x) => x.id !== item.id);

    saveProducts(productsTemp);
    toast.success("Produto removido com sucesso.");
  }

  function saveProducts(productsTemp) {
    localStorage.setItem("products", JSON.stringify(productsTemp));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <Card className="card-content">
      <img src={item.image?.url} className="product-image" />
      <div className="product-info">
        <label className="bold ellipsis">{item.name}</label>
        <div className="d-flex justify-content-between align-items-end">
          <div>
            <label className="bold price">
              {item.price?.formatted_with_symbol}
            </label>
            <div>
              <FontAwesomeIcon
                icon={faMinusCircle}
                size="lg"
                className="pointer"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              />
              <label className="quantity-item bold">{quantity}</label>
              <FontAwesomeIcon
                icon={faPlusCircle}
                size="lg"
                className="pointer"
                onClick={() => setQuantity(quantity + 1)}
              />
            </div>
          </div>
          <FontAwesomeIcon
            icon={cartMode ? faTrash : faCartPlus}
            size="lg"
            className="pointer"
            onClick={() => (cartMode ? removeProduct() : addProduct())}
          />
        </div>
        {cartMode && (
          <label className="bold price">
            Subtotal: €{(item.price.raw * quantity).toFixed(2)}
          </label>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
