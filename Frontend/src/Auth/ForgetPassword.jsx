import { useState } from "react";
import { toast } from "react-toastify";
import "./auth.css";

export default function ForgetPassword({ close }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const sendForgetPassword = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/account/forget-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      toast.success(data.message);
      setEmail("");
      
      // Close modal after successful submission
      setTimeout(() => close(), 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendForgetPassword();
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  // Close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className="modal-content"
      >
        <button
          onClick={close}
          disabled={isLoading}
          aria-label="Close"
        >
          ×
        </button>

        <h1>Forgot Password</h1>
        <p>
          Enter your email address and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="reset-email" >
              Email Address
            </label>
            <input
              id="reset-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div >
            <button
              type="button"
              onClick={close}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              disabled={isLoading}
             
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}