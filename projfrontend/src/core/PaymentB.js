import React, {useEffect, useState} from "react"
import {Redirect} from "react-router-dom"
import {cartEmpty} from "./helper/cartHelper"
import {getmeToken, processPayment} from "./helper/paymentHelper"
import {createOrder} from "./helper/orderHelper"
import {isAuthenticated, signout} from "../auth/helper"

import DropIn from "braintree-web-drop-in-react"

const PaymentB = ({
  products,
  reload = undefined,
  setReload = (f) => f,

}) => {

  const [info, setInfo] = useState({
    loading:false,
    success:false,
    clientToken:null,
    error:"",
    instance:{}
  });

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token)
    .then((info) => {
      if (!info.success) {
        setInfo({
          ...info,
          error:"unable to generate payment token"
        });
        signout(() => {
          return <Redirect to="/" />;
        });
      } else{
        const clientToken = info.client_token;

        setInfo({clientToken});
      }

    })
    .catch(err => {console.log(err);})
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    products.map( prod => {
      amount = amount + parseFloat(prod.price)
    })
    return amount;
  }

  const onPurchase = () => {
    setInfo({loading:true});
    let nonce;
    let getNonce = info.instance.requestPaymentMethod()
    .then( (data) => {
      console.log("MYDATA", data);
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce : nonce,
        amount : getAmount()
      };

      processPayment(userId, token, paymentData)
      .then((response) => {
        console.log("POINT-1", response);
        console.log("POINT-1", response.error);
        if (response.error) {
          if (response.code==='1'){
            console.log("Payment Failed");
            signout(() => {
              return <Redirect to="/" />;
            });
          }
        } else {
          setInfo({
            ...info,
            success:response.success,
            loading:false
          });
          console.log("Payment successful!!!!");

          let product_names = "";
          products.forEach(function(item){
            product_names += item.name + ", ";
          });

          const orderData = {
            products : product_names,
            transaction_id : response.transaction.id,
            amount:response.transaction.amount
          };

          console.log(userId, token, orderData);

          createOrder(userId, token, orderData)
          .then((response) => {
            console.log("PB", response);
            if (response.error) {
              if (response.code==="500") {
                console.log("order failed");
              }
              signout(() => {
                return <Redirect to="/" />;
              });
            } else {
              if (response.success === true){
                console.log("order placed");
              }
            }
          })
          .catch((error) => {
            setInfo({loading:false, success:false});
            console.log("order failed", error);
          })
          .finally( () => {
            console.log("finally");
          });

          cartEmpty(() => {
            console.log("cart emptied");
          });
          setReload(!reload);
        }
      })
      .catch(err => {
        setInfo({loading:false, success:false});
        console.log("Noncee",err);
      });
    })
    .catch(err => console.log("Nonce",err))
  };

  const showbtnDropIn = () => {
    return (
      <div>{

        info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{authorization : info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
              >

              </DropIn>

            <button onClick={onPurchase}
              className="btn btn-block btn-success">Buy</button>

          </div>
        ) : (
          <h3>Please Login first or add something to your cart</h3>
        )

      }</div>
    );
  };

  return(
    <div>
      <h3>Total payable amount : <span className="bg-danger px-5">₹ {getAmount()}</span></h3>
      {showbtnDropIn()}
    </div>
  )
}

export default PaymentB;
