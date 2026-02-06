import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import ForgetPassword from "./ForgetPassword";
import {useDispatch} from 'react-redux';
import {login} from '../Store/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openForgetPage, setOpenForgetPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const validateForm = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (password.length === 0) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const Submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Login Failed");
      }
      dispatch(login({
        token:data.accessToken,
        userName:data.user.name,
        email:data.user.email,
      }));
      toast.success(`Welcome ${data.name}`);
      
      // Clear form on success
      setEmail('');
      setPassword('');
      
      // Navigate after a short delay
      setTimeout(() => navigate('/'), 1600);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false); // Re-enable form on error
    }
    // Don't set isLoading to false on success since we're navigating away
  };

  return (
    <div className="authContainer">
      <h1>Login</h1>
      <form onSubmit={Submit}>
        <div className="fillForm">
          <div className="labelsAndFields">
            <div className="labels">
              <label htmlFor="email">Email</label>
              <label htmlFor="password">Password</label>
            </div>
            <div className="fields">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setOpenForgetPage(true)}
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>

          <div className="moveTo">
            <p>Don't have an account?</p>
            <Link to="/signup">Signup</Link>
          </div>

          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
      {openForgetPage && <ForgetPassword close={() => setOpenForgetPage(false)} />}
    </div>
  );
}