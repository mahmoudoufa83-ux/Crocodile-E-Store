import "../styles/Login.css";

import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    const success = login(email, password);

    if (!success) {

      setError("Invalid Email or Password");

      return;

    }

    if (email === "admin@crocodile.com") {

      navigate("/admin");

    } else {

      navigate("/");

    }

  }

  return (

    <section className="login-page">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <h2>Welcome Back</h2>

        <p>Login to your account</p>

        {error && (

          <div className="login-error">

            {error}

          </div>

        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">

          Login

        </button>

        <span>

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </span>

      </form>

    </section>

  );

}

export default Login;