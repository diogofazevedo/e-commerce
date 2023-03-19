import React, { useEffect, useState } from "react";
import { Container, Navbar, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import Logo from "../images/logo.png";

function Nav() {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) ?? []
  );

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
    <Navbar sticky="top" className="navbar">
      <Container fluid className="mx-3">
        <Navbar.Brand href="/produtos">
          <img src={Logo} alt="Logo" className="logo" />
        </Navbar.Brand>
        <NavLink href="/carrinho">
          <FontAwesomeIcon icon={faCartShopping} size="lg" />
          <label className="products-number pointer">{products.length}</label>
        </NavLink>
      </Container>
    </Navbar>
  );
}

export default Nav;
