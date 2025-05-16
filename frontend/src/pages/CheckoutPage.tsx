import React from 'react';
import { useSelector } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons, FUNDING } from '@paypal/react-paypal-js';
import { reactPayPalClientId } from '../config';
import type { RootState } from '../redux/store';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

function CheckoutPage() {
  const cart = useSelector((state: RootState) => state.cart) as CartItem[];
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  console.log("Total amount to be paid: ", total);
  console.log("Cart items: ", cart);
  console.log("PayPal Client ID: ", reactPayPalClientId);

  return (
    <div>
      <h1>Checkout</h1>
      <PayPalScriptProvider options={{ clientId: reactPayPalClientId }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            console.log("Creating order...");
            console.log("Total amount: ", total);
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [{
                amount: {
                  currency_code: "USD",
                  value: total,
                }
              }]

            });
          }}
      onApprove={(data, actions) => {
        console.log("Order approved...");
        console.log("Order data: ", data);

        if (actions.order) {
          return actions.order.capture().then(details => {
            alert('Transaction completed');
          });
        } else {
          console.error('actions.order is undefined');
          return Promise.reject('Unable to capture order: actions.order is undefined');
        }
      }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default CheckoutPage;
