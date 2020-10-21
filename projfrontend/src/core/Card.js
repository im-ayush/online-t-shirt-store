import React, {useState} from 'react';
import ImageHelper from './helper/ImageHelper';
import {Redirect} from 'react-router-dom';
import {addItemToCart, removeItemFromCart} from './helper/cartHelper';
import {isAuthenticated} from '../auth/helper';


const Card = ({product,
              addtoCart = true,
              removeFromCart = false,
              reload = undefined,
              setReload = (f) => f
            }) => {

    const [redirect, setRedirect] = useState(false);

    const cardTitle = product ? product.name : "No product";
    const cardDescription = product ? product.description : "No product description";
    const cardPrice = product ? product.price : "0.00";

    const addToCart = () => {
      if(isAuthenticated){
        addItemToCart(product, () => setRedirect(true));
        console.log("Added to cart");
      } else{
        console.log("Login required");
        // TODO: redirect to signin page
      }
    };

    const getRedirect = redirect => {
      if (redirect){
        return <Redirect to="/cart" />
      }
    }

    const showAddToCart = addToCart => {
      return (
        addtoCart && (
          <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        )
      );
    };

    const showRemoveFromCart = removeFromCart => {
      return (
        removeFromCart && (
          <button
            onClick={() => { // TODO:
              removeItemFromCart(product.id);
              setReload(! reload);
              console.log("Product removed from cart");
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        )
      );
    };

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
          {getRedirect(redirect)}
          <ImageHelper product={product} />
          <br/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">₹ {cardPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Card;
