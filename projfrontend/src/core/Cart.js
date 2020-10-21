import React, {useState, useEffect} from 'react'
import Base from './Base'
import Card from './Card'
import {loadCart} from './helper/cartHelper'
import PaymentB from './PaymentB'

const Cart = () => {

  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h1>Products</h1>
        <hr/>

        {products.map((product, index) => (
          <div className="col-6 offset-md-3 justify-content-right" key={index}>
            <br/>
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              reload={reload}
              setReload={setReload}
            />
          </div>
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h1>Checkout</h1>
      </div>
    );
  };

  return (
    <Base title="Cart" description="Here's your cart. All ready to checkout.">
      <div className="row text-center">
        <div className="col-6">
        { products.length > 0 ? (
          loadAllProducts(products)
        ) : (
          <h3>No products</h3>
        )}
        </div>
        <div className="col-6">
          { products.length > 0 ? (
            <PaymentB products={products} setReload={setReload} />
          ) : (
            <h3>Please add something to cart</h3>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
