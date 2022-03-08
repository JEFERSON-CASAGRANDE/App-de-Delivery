import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';
import { fetchCustomerProducts, fetchOrders } from '../utils/axios';
import { saveLocalStorage } from '../utils/localStorage';

const MyProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState('');

  const getProducts = async () => {
    const { data } = await fetchCustomerProducts();
    setProducts(data.map((prod) => ({ ...prod, quantity: 0 })));
  };

  const getTotalPrice = () => setTotalPrice(cartItems.reduce((totalPriceProduct,
    { price, quantity }) => totalPriceProduct + price * quantity, 0));

  const saveCartToLocalStorage = useCallback(
    () => saveLocalStorage('cart', cartItems),
    [cartItems],
  );

  // get orders from database
  const getOrders = async () => {
    const { data } = await fetchOrders();
    setOrders(data);
  };

  useEffect(() => {
    getProducts();
    getOrders();
  }, []);

  useEffect(() => {
    setCartItems(products);
  }, [products]);

  useEffect(() => {
    saveCartToLocalStorage();
  }, [saveCartToLocalStorage]);

  const value = {
    products,
    user,
    setUser,
    cartItems,
    setCartItems,
    totalPrice,
    getTotalPrice,
    orders,
    role,
    setRole,
  };

  return (
    <MyContext.Provider value={ value }>
      { children }
    </MyContext.Provider>
  );
};

MyProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default MyProvider;
