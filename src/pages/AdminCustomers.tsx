import "../styles/AdminProducts.css";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import { db } from "../firebase";

type Customer = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: Timestamp;
};

function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadCustomers() {
    try {
      const snapshot = await getDocs(
        collection(db, "users")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Customer, "id">),
      }));

      setCustomers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <section className="admin-products">

      <div className="admin-header">

        <div>
          <h1>Customers Management</h1>

          <p>
            Manage registered customers
          </p>
        </div>

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            minWidth: "250px",
          }}
        />

      </div>

      <table className="products-table">

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Role</th>

            <th>Created</th>

          </tr>

        </thead>

        <tbody>

          {loading ? (

            <tr>

              <td
                colSpan={4}
                style={{
                  textAlign: "center",
                }}
              >
                Loading...
              </td>

            </tr>

          ) : filteredCustomers.length === 0 ? (

            <tr>

              <td
                colSpan={4}
                style={{
                  textAlign: "center",
                }}
              >
                No Customers Found
              </td>

            </tr>

          ) : (

            filteredCustomers.map((customer) => (

              <tr key={customer.id}>

                <td>{customer.name}</td>

                <td>{customer.email}</td>

                <td>

                  <span
                    style={{
                      color:
                        customer.role === "admin"
                          ? "#16A34A"
                          : "#555",
                      fontWeight: "bold",
                    }}
                  >
                    {customer.role}
                  </span>

                </td>

                <td>

                  {customer.createdAt
                    ? customer.createdAt
                        .toDate()
                        .toLocaleDateString()
                    : "-"}

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </section>
  );
}

export default AdminCustomers;