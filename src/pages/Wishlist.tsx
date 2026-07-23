import { useWishlist } from "../context/WishlistContext";

import "../styles/Cart.css";

function Wishlist() {

  const { wishlist, removeFromWishlist } = useWishlist();

  return (

    <section className="cart-page">

      <div className="section-title">

        <span>WISHLIST</span>

        <h2>Your Favourite Products</h2>

      </div>

      <div className="cart-items">

        {

          wishlist.map((item)=>(

            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>

                <h3>{item.name}</h3>

                <p>{item.price} EGP</p>

              </div>

              <button
                className="remove-btn"
                onClick={()=>removeFromWishlist(item.id)}
              >

                Remove

              </button>

            </div>

          ))

        }

        {

          wishlist.length===0 && (

            <h2>

              Wishlist Is Empty

            </h2>

          )

        }

      </div>

    </section>

  );

}

export default Wishlist;