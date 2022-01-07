import React from "react";
import { Row } from "react-bootstrap";
import { CartState } from "../../../context/Context";
import Product from "../Product/Product";
import "./Products.css";

const Products = ({ allProducts }) => {
  const { productLoading } = CartState();
  return (
    <>
      <div className={`products_container ${productLoading ? "active" : ""}`}>
        {productLoading ? (
          <div className="products_spinner">
            <div className="swapping-squares-spinner">
              <div className="square"></div>
              <div className="square"></div>
              <div className="square"></div>
              <div className="square"></div>
            </div>
          </div>
        ) : (
          <Row xs={1} md={2} lg={4} className="g-3 m-5">
            {allProducts.length === 0 ? (
              <h4>Product Not Found</h4>
            ) : (
              allProducts.map((productItem) => {
                return (
                  <Product
                    key={productItem.itemId}
                    data={productItem}
                  ></Product>
                );
              })
            )}
          </Row>
        )}
      </div>
    </>
  );
};

export default Products;
