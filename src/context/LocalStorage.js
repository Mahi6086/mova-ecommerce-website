const cartName = "cartProduct";

const setCart = (carts) => {
  if (carts) {
    const stringData = JSON.stringify(carts);
    localStorage.setItem(cartName, stringData);
  }
};

const getCart = () => {
  const getData = localStorage.getItem(cartName);
  return JSON.parse(getData);
};

export { setCart, getCart };
