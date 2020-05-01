/** @jsx jsx **/
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

const Cart = () => {
  const {
    cartDetails,
    cartCount,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/.netlify/functions/create-session', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartDetails),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(error));

    redirectToCheckout({ sessionId: response.sessionId });
  };

  return (
    <Fragment>
      {/* <pre>{JSON.stringify({ cartDetails }, null, 2)}</pre> */}
      <details>
        <summary>Cart Details ({cartCount} products)</summary>

        <ul>
          {Object.values(cartDetails).map((product) => (
            <li key={product.sku}>
              {product.name} ({product.quantity}) — {product.formattedValue}
            </li>
          ))}
        </ul>

        <p>
          <strong>Total Price: {totalPrice()}</strong>
        </p>
        <button
          onClick={handleSubmit}
          sx={{
            bg: 'primary',
            border: 'none',
            borderRadius: 2,
            color: 'nav',
            fontFamily: 'heading',
            fontSize: 2,
            fontWeight: 800,
            gridColumn: '1 / 3',
            p: 2,
            textShadow: `
                  0.05em 0.05em #4F4F4F99,
                  0.05em -0.05em #4F4F4F99,
                  -0.05em 0.05em #4F4F4F99,
                  -0.05em -0.05em #4F4F4F99
                `,
            textTransform: 'uppercase',
          }}
        >
          Check Out
        </button>
        <p>A $3.50 shipping and handling charge will be applied at checkout.</p>
      </details>
    </Fragment>
  );
};

export default Cart;
