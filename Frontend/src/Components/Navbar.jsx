import { useState } from "react";
import { useSelector } from "react-redux";
import LogoutModal from "./LogoutModal";
import "./Navbar.css";


export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const name = useSelector((state) => state.auth.userName);

  return (
    <>
      <nav className="navbar">
        <h2>My App</h2>
         <p>Welcome, {name}</p>
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
