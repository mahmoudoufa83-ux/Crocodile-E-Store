import "../styles/Cart.css";

import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

function Cart() {

  const {

    cart,

    removeFromCart,

    increaseQuantity,

    decreaseQuantity,

    clearCart,

    totalItems,

    totalPrice,

  } = useCart();

  return (

    <section className="cart-page">

      <div className="section-title">

        <span>SHOPPING CART</span>

        <h2>Your Cart</h2>

      </div>

      {

        cart.length === 0 ? (

          <div className="empty-cart">

            <FaShoppingCart size={55} />

            <h2>Your Cart Is Empty</h2>

            <p>

              Add some products to start shopping.

            </p>

          </div>

        ) : (

          <>

            <div className="cart-items">

              {

                cart.map((item)=>(

                  <div

                    className="cart-item"

                    key={item.id}

                  >

                    <img

                      src={item.image}

                      alt={item.name}

                    />

                    <div className="cart-info">

                      <h3>

                        {item.name}

                      </h3>

                      <p>

                        {item.brand}

                      </p>

                      <h4>

                        {item.price} EGP

                      </h4>

                    </div>

                    <div className="quantity-controller">

                      <button

                        onClick={()=>

                          decreaseQuantity(item.id)

                        }

                      >

                        <FaMinus />

                      </button>

                      <span>

                        {item.quantity}

                      </span>

                      <button

                        onClick={()=>

                          increaseQuantity(item.id)

                        }

                      >

                        <FaPlus />

                      </button>

                    </div>

                    <div className="item-total">

                      {(item.price * item.quantity).toLocaleString()} EGP

                    </div>

                    <button

                      className="remove-btn"

                      onClick={()=>

                        removeFromCart(item.id)

                      }

                    >

                      <FaTrash />

                    </button>

                  </div>

                ))

              }

            </div>

            <div className="cart-summary">

              <h3>

                Cart Summary

              </h3>

              <div className="summary-row">

                <span>Total Items</span>

                <strong>{totalItems}</strong>

              </div>

              <div className="summary-row">

                <span>Total Price</span>

                <strong>

                  {totalPrice.toLocaleString()} EGP

                </strong>

              </div>

              <button

                className="clear-btn"

                onClick={clearCart}

              >

                Clear Cart

              </button>

              <Link
                to="/checkout"
                className="checkout-btn"
              >

                Proceed To Checkout

              </Link>

            </div>

          </>

        )

      }

    </section>

  );

}

export default Cart;