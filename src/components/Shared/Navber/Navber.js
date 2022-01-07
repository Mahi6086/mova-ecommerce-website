import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { CartState } from "../../../context/Context";
import "./Navber.css";

const Navber = () => {
  const {
    state: { cart },
  } = CartState();

  return (
    <>
      <Navbar bg="whate" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            {" "}
            <NavLink to="/home">
              <img
                className="nova"
                style={{ width: "80%" }}
                src={logo}
                alt=""
              />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link className="text-black" to="/cartItems">
                <div className="cart-icon">
                  <i className="fas fa-shopping-cart"></i>
                  {cart.length}
                </div>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="horizental-line"></div>
    </>
  );
};

export default Navber;
