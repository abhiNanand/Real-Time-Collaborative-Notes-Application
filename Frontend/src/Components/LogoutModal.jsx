import { useDispatch } from "react-redux";
import { logout } from "../Store/authSlice";

export default function LogoutModal({ closeModal }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/account/logout`, {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(logout());
      closeModal();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Are you sure?</h3>
        <p>You want to logout?</p>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={handleLogout}>
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}
