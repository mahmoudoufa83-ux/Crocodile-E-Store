import "../../styles/Brands.css";

const brands = [
  "HP",
  "Canon",
  "Brother",
  "Epson",
  "Xerox",
  "Pantum",
];

function Brands() {
  return (
    <section className="brands">

      <div className="section-title">

        <span>OUR BRANDS</span>

        <h2>Trusted By The Biggest Brands</h2>

        <p>
          We proudly supply original products from the world's leading printing companies.
        </p>

      </div>

      <div className="brands-grid">

        {brands.map((brand) => (

          <div className="brand-card" key={brand}>

            <h3>{brand}</h3>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Brands;