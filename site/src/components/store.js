/** @jsx jsx */
import { jsx } from 'theme-ui';
import { CartProvider } from 'use-shopping-cart';
import { loadStripe } from '@stripe/stripe-js';
import Cart from './cart';
import Products from './products';

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const Store = () => {
  return (
    <CartProvider stripe={stripePromise} currency="USD">
      <Cart />
      <Products />
    </CartProvider>
  );
};

export default Store;
