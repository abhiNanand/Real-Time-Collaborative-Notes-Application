import { useState } from "react";
import { useDispatch } from "react-redux";
import LogoutModal from "./LogoutModal";
import "./Navbar.css";


export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="navbar">
        <h2>My App</h2>

        <button className="logout-btn" onClick={() => setShowModal(true)}>
          Logout
        </button>
      </nav>

      {showModal && (
        <LogoutModal closeModal={() => setShowModal(false)} />
      )}
    </>
  );
}
