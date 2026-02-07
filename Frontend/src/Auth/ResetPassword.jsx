import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const submit = async (e) => {
    e.preventDefault();

    // basic validations
    if (!password.trim()) {
      toast.error("Password cannot be empty");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/account/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      // always read as text first (HTML-safe)
      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data.message || "Reset password failed");
      }

      toast.success(data.message || "Password reset successful");

      // optional: redirect to login after success
      // setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="authContainer">
      <h1>Reset Password</h1>

      <form onSubmit={submit}>
        <div className="fillForm">
          <div className="labelsAndFields">
            <div className="labels">
              <label>New Password</label>
              <label>Confirm New Password</label>
            </div>

            <div className="fields">
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
