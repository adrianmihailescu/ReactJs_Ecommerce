import { useSelector } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {reactPayPalClientId} from '../config';

function CheckoutPage() {
  const cart = useSelector(state => state.cart);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  console.log("Total amount to be paid: ", total);
  console.log("Cart items: ", cart);
  console.log("PayPal Client ID: ", reactPayPalClientId);

  return (
    <div>
      <h1>Checkout</h1>
      <PayPalScriptProvider options={{ "client-id": reactPayPalClientId}}>
        <PayPalButtons
          createOrder={(data, actions) => {
            console.log("Creating order...");
            console.log("Total amount: ", total);
            console.log("Client ID: ", process.env.REACT_APP_PAYPAL_CLIENT_ID);
            return actions.order.create({
              purchase_units: [{
                amount: { value: total }
              }]
            });
          }}
          onApprove={(data, actions) => {
            console.log("Order approved...");
            console.log("Order data: ", data);
            return actions.order.capture().then(details => {
              alert('Transaction completed by ' + details.payer.name.given_name);
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default CheckoutPage;
