import "../../styles/Brands.css";

const brands = [
  {
    name: "HP",
    desc: "Printers & Toners",
  },
  {
    name: "Canon",
    desc: "Printers & Ink",
  },
  {
    name: "Brother",
    desc: "Laser Printers",
  },
  {
    name: "Epson",
    desc: "EcoTank Series",
  },
  {
    name: "Xerox",
    desc: "Business Printing",
  },
  {
    name: "Pantum",
    desc: "Laser Solutions",
  },
];

function Brands() {

  return (

    <section className="brands">

      <div className="section-title">

        <span>TOP BRANDS</span>

        <h2>Official Brand Partners</h2>

        <p>

          We proudly provide genuine products from the world's leading printing companies.

        </p>

      </div>

      <div className="brands-grid">

        {brands.map((brand) => (

          <div
            className="brand-card"
            key={brand.name}
          >

            <h2>{brand.name}</h2>

            <span>{brand.desc}</span>

          </div>

        ))}

      </div>

    </section>

  );

}

export default Brands;