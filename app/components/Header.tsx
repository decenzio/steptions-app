"use client";

import { useState, useEffect } from "react";
import { login, signup, logout } from "../services/passkeys";
import { isLoggedIn } from "../services/storage";

import Logo from './Logo'

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await login();
      if (result.success) {
        setIsAuthenticated(true);
        console.log("Login successful:", result.contractId);
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("Login failed");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signup();
      if (result.success) {
        setIsAuthenticated(true);
        console.log("Signup successful:", result.contractId);
      } else {
        setError(result.error || "Signup failed");
      }
    } catch (err) {
      setError("Signup failed");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <header className="header border-b border-gray-300 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Logo />
          <span className="text-2xl font-bold text-white">STEPTIONS</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-end space-y-2">
          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="btn-secondary px-8 py-3 disabled:opacity-50"
              >
                LOGOUT
              </button>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="btn-secondary px-8 py-3 disabled:opacity-50"
                >
                  {isLoading ? "CONNECTING..." : "LOGIN"}
                </button>
                <button
                  onClick={handleSignup}
                  disabled={isLoading}
                  className="btn-primary px-8 py-3 disabled:opacity-50"
                >
                  {isLoading ? "CREATING..." : "REGISTER"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
