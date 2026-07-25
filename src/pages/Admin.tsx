import "../styles/Admin.css";

import { useState } from "react";

import DashboardCards from "../components/admin/DashboardCards";

import ProductsTable from "../components/admin/ProductsTable";
import OrdersTable from "../components/admin/OrdersTable";
import CustomersTable from "../components/admin/CustomersTable";
import SettingsPanel from "../components/admin/SettingsPanel";

function Admin() {

  const [tab, setTab] = useState("dashboard");

  return (

    <div className="admin-page">

      <div className="admin-header">

        <h1>Crocodile Admin Panel</h1>

        <p>

          Manage your store professionally.

        </p>

      </div>

      <DashboardCards

        products={125}

        orders={41}

        customers={86}

        revenue={58250}

      />

      <div className="admin-content">

        <div className="admin-tabs">

          <button

            className={`admin-tab ${tab==="dashboard"?"active":""}`}

            onClick={()=>setTab("dashboard")}

          >

            Dashboard

          </button>

          <button

            className={`admin-tab ${tab==="products"?"active":""}`}

            onClick={()=>setTab("products")}

          >

            Products

          </button>

          <button

            className={`admin-tab ${tab==="orders"?"active":""}`}

            onClick={()=>setTab("orders")}

          >

            Orders

          </button>

          <button

            className={`admin-tab ${tab==="customers"?"active":""}`}

            onClick={()=>setTab("customers")}

          >

            Customers

          </button>

          <button

            className={`admin-tab ${tab==="settings"?"active":""}`}

            onClick={()=>setTab("settings")}

          >

            Settings

          </button>

        </div>

        {tab==="dashboard" && (

          <h2>

            Welcome to Crocodile Admin Dashboard 👋

          </h2>

        )}

        {tab==="products" && <ProductsTable />}

        {tab==="orders" && <OrdersTable />}

        {tab==="customers" && <CustomersTable />}

        {tab==="settings" && <SettingsPanel />}

      </div>

    </div>

  );

}

export default Admin;