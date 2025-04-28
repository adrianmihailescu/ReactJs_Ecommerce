import { useSelector } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function CheckoutPage() {
  const cart = useSelector(state => state.cart);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div>
      <h1>Checkout</h1>
      <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: { value: total }
              }]
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(details => {
              alert('Transaction completed by ' + details.payer.name.given_name);
              // Here you can call backend to save the order
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default CheckoutPage;
