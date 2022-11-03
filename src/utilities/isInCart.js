export const isInCart = (singleProduct, cartItems) => {
  return cartItems.find((item) => item?.id === singleProduct?._id);
};
