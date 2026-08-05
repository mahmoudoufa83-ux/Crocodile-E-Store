import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useOrders } from "../../../context/OrderContext";

type CustomerRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
};

function CustomersTable() {
  const navigate = useNavigate();

  const { orders, loading } = useOrders();

  const [search, setSearch] = useState("");

  const customers = useMemo(() => {
    const map = new Map<string, CustomerRow>();

    orders.forEach((order) => {
      const key = order.userId || order.email;

      if (!map.has(key)) {
        map.set(key, {
          id: key,
          name: order.customerName,
          email: order.email,
          phone: order.phone,
          city: order.city,
          orders: 1,
          totalSpent: order.total,
          lastOrder: order.date,
        });
      } else {
        const customer = map.get(key)!;

        customer.orders += 1;
        customer.totalSpent += order.total;

        if (
          new Date(order.date) >
          new Date(customer.lastOrder)
        ) {
          customer.lastOrder = order.date;
        }
      }
    });

    return Array.from(map.values()).filter(
      (customer) =>
        customer.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.phone.includes(search)
    );
  }, [orders, search]);

  return (
    <section className="admin-products">

      <div className="admin-header">

        <div>
          <h1>Customers</h1>
          <p>Customers extracted from orders</p>
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
            border: "1px solid #ddd",
            borderRadius: "8px",
            minWidth: "260px",
          }}
        />

      </div>

      <table className="products-table">

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Phone</th>

            <th>City</th>

            <th>Orders</th>

            <th>Total Spent</th>

            <th>Last Order</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {loading ? (

            <tr>

              <td
                colSpan={8}
                style={{ textAlign: "center" }}
              >
                Loading...
              </td>

            </tr>

          ) : customers.length === 0 ? (

            <tr>

              <td
                colSpan={8}
                style={{ textAlign: "center" }}
              >
                No Customers Found
              </td>

            </tr>

          ) : (

            customers.map((customer) => (

              <tr key={customer.id}>

                <td>{customer.name}</td>

                <td>{customer.email}</td>

                <td>{customer.phone}</td>

                <td>{customer.city}</td>

                <td>{customer.orders}</td>

                <td>
                  {customer.totalSpent.toLocaleString()} EGP
                </td>

                <td>
                  {new Date(
                    customer.lastOrder
                  ).toLocaleDateString()}
                </td>

                <td>

                  <button
                    onClick={() =>
                      navigate(
                        `/admin/customers/${customer.id}`
                      )
                    }
                  >
                    View Details
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </section>
  );
}

export default CustomersTable;