import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
const Paypalbutton = ({ amount, onSuccess, onError }) => {
  const validAmount = parseFloat(amount).toFixed(2);
  const navigate=useNavigate()

  if (isNaN(validAmount)) {
    console.error("Invalid amount provided to Paypalbutton");
    return <div>Error: Invalid payment amount</div>;
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id":"AXcs5rlPZaW6OlcnhVyCce-ERrJctAhm2fdC7KyXa-M0MsCw21XxDyIueF4KZO5eTk4JoeecBt6mBGSz",
        
        // "client-id": "AXcs5rlPZaW6OlcnhVyCce-ERrJctAhm2fdC7KyXa-M0MsCw21XxDyIueF4KZO5eTk4JoeecBt6mBGSz",
        currency: "USD" // ✅ FIXED HERE
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "black",
          shape: "rect",
          label: "paypal",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD", // ✅ MATCHES script currency
                  value: "1.00",
                },
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details);
            navigate("/order-confirmation")
            
          });
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          onError(err);
        }}
        onCancel={(data) => {
          toast.error("payemnt cancel")
        }}
      />
    </PayPalScriptProvider>
  );
};

export default Paypalbutton;
