import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserRole } from "./firebase";

import Login from "./Components/Login";
import Register from "./Components/Register";
import CustomerDashboard from "./Components/CustomerDashboard";
import VendorDashboard from "./Components/VendorDashboard";
import AdminDashboard from "./Components/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userRole = await getUserRole(currentUser.uid);
          setUser(currentUser);
          setRole(userRole || "customer"); 
        } catch (error) {
          console.error("Error fetching role:", error);
          setUser(currentUser);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={`/${role}-dashboard`} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={`/${role}-dashboard`} />}
        />
        <Route
          path="/admin-dashboard"
          element={user && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/customer-dashboard"
          element={user && role === "customer" ? <CustomerDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/vendor-dashboard"
          element={user && role === "vendor" ? <VendorDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
