import "../../styles/ProductPage.css";

const products = [
  {
    id: 1,
    name: "HP LaserJet Printer",
    price: "$299",
    image: "https://picsum.photos/400?1",
  },
  {
    id: 2,
    name: "Canon Ink Cartridge",
    price: "$35",
    image: "https://picsum.photos/400?2",
  },
  {
    id: 3,
    name: "Brother Toner",
    price: "$59",
    image: "https://picsum.photos/400?3",
  },
  {
    id: 4,
    name: "Office Paper A4",
    price: "$12",
    image: "https://picsum.photos/400?4",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: "$18",
    image: "https://picsum.photos/400?5",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: "$55",
    image: "https://picsum.photos/400?6",
  },
];

function ProductPage() {
  return (
    <section className="products-page">

      <div className="section-title">

        <span>STORE</span>

        <h2>All Products</h2>

      </div>

      <div className="products-grid">

        {products.map((product) => (

          <div className="product-item" key={product.id}>

            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <span>{product.price}</span>

            <button>View Details</button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default ProductPage;