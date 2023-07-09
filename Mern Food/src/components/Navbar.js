import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./Contextreducer";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);

  let data = useCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 active">
              <li className="nav-item active">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myorders"
                >
                  My Orders
                </Link>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="nav-link btn bg-white text-success mx-1"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="nav-link  btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-3"
                  onClick={() => setCartView(true)}
                >
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {" "}
                    {data.length}{" "}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className="btn bg-white text-danger mx-3"
                  onClick={handleLogout}
                >
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
