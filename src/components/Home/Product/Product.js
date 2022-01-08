import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ data }) => {
  const { itemId, displayName, categoryId, picture, currentPrice } = data;

  return (
    <>
      <Col>
        <div className="product-item">
          <Card className="product-card">
            <div className="card-hover">
              <Link
                className="catagories-btn card-hover-btn"
                to={`/productDetails/${itemId}`}
              >
                Order Now{" "}
              </Link>
            </div>
            <figure>
              <Card.Img className="image" variant="top" src={picture} />
            </figure>
            <Card.Body>
              <p className="categoryId">{categoryId.toUpperCase()}</p>
              <Card.Title className="displayName">
                {displayName.toUpperCase()}
              </Card.Title>
              <Card.Text className="currentPrice fw-bold">
                € {currentPrice}
              </Card.Text>
              <p className="product-color">3 color</p>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </>
  );
};

export default Product;
