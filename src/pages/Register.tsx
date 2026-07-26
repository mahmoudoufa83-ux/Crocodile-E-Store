import "../styles/Login.css";

import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const success = await register(
      name,
      email,
      password
    );

    if (!success) {
      setError("Email already exists");
      return;
    }

    navigate("/");
  }

  return (
    <section className="login-page">
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h2>Create Account</h2>

        <p>Register New Account</p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Register
        </button>

        <span>
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </span>
      </form>
    </section>
  );
}

export default Register;