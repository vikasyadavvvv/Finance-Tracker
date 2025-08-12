import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Toaster } from 'react-hot-toast';
import { GiMoneyStack } from "react-icons/gi";

export default function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
        <GiMoneyStack className="text-5xl text-emerald-600 animate-pulse" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
        {/* Mobile Navigation */}
        {auth && (
          <nav className="md:hidden fixed bottom-0 w-full bg-white shadow-lg border-t border-emerald-100 z-10">
            <div className="flex justify-around py-3">
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="flex flex-col items-center text-emerald-600"
              > 
              </button>
            </div>
          </nav>
        )}

        <Routes>
          <Route 
            path="/" 
            element={auth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={
              <div className="pb-16 md:pb-0">
                <Login setAuth={setAuth} />
              </div>
            } 
          />
          <Route 
            path="/register" 
            element={
              <div className="pb-16 md:pb-0">
                <Register />
              </div>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              auth ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
        </Routes>

        {/* Toast notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#059669', // emerald-600
              color: '#fff',
            },
            success: {
              style: {
                background: '#059669', // emerald-600
              },
            },
            error: {
              style: {
                background: '#D97706', // amber-600
              },
            },
          }}
        />
      </div>
    </Router>
  );
}