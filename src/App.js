import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navber from "./components/Shared/Navber/Navber";
import NotFound from "./components/Shared/NotFound/NotFound";
import CartItems from "./components/Shop/CartItems/CartItems";
import CheckOut from "./components/Shop/CheckOut/CheckOut";
import ProductDetails from "./components/Shop/ProductDetails/ProductDetails";
import { CartState } from "./context/Context";

function App() {
  const { loading } = CartState();

  axios.defaults.baseURL =
    "https://5m6exoj3o7.execute-api.eu-west-1.amazonaws.com/";
  return (
    <>
      <div className="app">
        <div className={`spinner ${loading ? "active" : ""}`}>
          <div className="swapping-squares-spinner">
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        <BrowserRouter>
          <Navber />
          <Container fluid>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route
                path="/productDetails/:itemId"
                element={<ProductDetails />}
              ></Route>
              <Route path="/cartItems" element={<CartItems />}></Route>
              <Route path="/checkOut" element={<CheckOut />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Container>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
