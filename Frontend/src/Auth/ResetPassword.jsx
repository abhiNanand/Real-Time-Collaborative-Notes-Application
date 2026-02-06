import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  console.log(token);

  const submit = async (e) => {
    e.preventDefault();
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
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "reset password failed");
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <div className="authContainer">
      <h1>Reset Password Form</h1>

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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type="text"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
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
