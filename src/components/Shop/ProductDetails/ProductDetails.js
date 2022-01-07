import { useEffect, useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { CartState } from "../../../context/Context";
import "./ProductDetails.css";

const Product = () => {
  const { dispatch, state } = CartState();
  const { itemId } = useParams();
  const [productDetails, setproductDetails] = useState({});
  const [availableActive, setAvailableActive] = useState("");
  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
    if (itemId) {
      setLoadData(false);
      fetch(
        "https://5m6exoj3o7.execute-api.eu-west-1.amazonaws.com/prod/items?fbclid=IwAR28tiBfhJtUGlHQjrH7J-tNuOPY9jMSp9ApWCiL_5jGTrqC0TZ_Y3C_9vs"
      )
        .then((res) => res.json())
        .then((data) => {
          const details = data.find((item) => item.itemId == itemId);
          setproductDetails({
            ...details,
            images: [
              details.picture,
              details.picture,
              details.picture,
              details.picture,
            ],
          });

          const availableSize = details.availableSizes;

          const activeSizeArr = ["m", "s", "l", "xs", "xl", "xxl"];
          let availableSizeChr = "";
          let i = 0;

          const selectActive = (chr) => {
            for (let i = 0; i < availableSize.length; i++) {
              if (availableSize[i].toLowerCase() === chr) {
                availableSizeChr = availableSize[i];
              }
            }

            if (availableSizeChr.length === 0) {
              i = i + 1;
              selectActive(activeSizeArr[i]);
              return;
            }
          };

          selectActive(activeSizeArr[i]);
          setAvailableActive(availableSizeChr);
          setLoadData(true);
        });
    }
  }, [itemId]);

  const handleAvailableSize = (val) => {
    setAvailableActive(val);
  };
  return (
    <>
      <Row>
        <Col xs={12} md={8}>
          <Row className="other-device g-4 mt-3 ms-4 me-4">
            {productDetails?.images?.map((img) => (
              <Col lg={6} className="">
                <img className="item-image img-fluid" src={img} alt="" />
              </Col>
            ))}
          </Row>
          <Carousel className="mobile-device">
            {productDetails?.images?.map((img) => (
              <Carousel.Item>
                <img className="d-block w-100" src={img} alt="First slide" />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col xs={12} md={4}>
          <div className="mt-5">
            <h2 className="product-name">
              {productDetails?.displayName?.toUpperCase()}
            </h2>
            <h4 className="hoddies">
              SHOP / {productDetails?.categoryId?.toUpperCase()}
            </h4>
            <p className="orginal-price">€{productDetails?.originalPrice}</p>
            <p className="current-price">
              <span className="save">Save 29%</span> €
              {productDetails?.currentPrice}
            </p>

            <h5 className="fw-bold">Select Size</h5>
            <div className="product-size mt-3">
              {productDetails?.availableSizes?.map((item) => {
                return (
                  <button
                    onClick={() => {
                      handleAvailableSize(item);
                    }}
                    className={`btn-size ${
                      item.toLowerCase() === availableActive.toLowerCase()
                        ? "active"
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                if (loadData) {
                  if (
                    !state.cart.find(
                      (item) =>
                        item.id === productDetails.itemId &&
                        item.size === availableActive
                    )
                  ) {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: {
                        id: productDetails.itemId,
                        size: availableActive,
                      },
                    });
                  } else {
                    toast.error("This item allready added!");
                  }
                }
              }}
              className="addtoBag mt-3"
            >
              Add to Bag
            </button>
            <br />
            <button className="favourite mt-3">Favourite</button>
            <h5 className="fw-bold mt-5">Description</h5>
            <p className="description">{productDetails?.description}</p>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Product;
