import "../styles/Login.css";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const {
    login,
    user,
    loading,
  } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    const success = await login(
      email,
      password
    );

    if (!success) {
      setError("Invalid Email or Password");
    }
  }

  useEffect(() => {
    if (loading) return;

    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [user, loading, navigate]);

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
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError("");
          }}
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