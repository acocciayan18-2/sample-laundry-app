import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Reports from "./Reports";
import NewOrder from "./NewOrder";
import Customers from "./Customers";
import Services from "./Services";
import "../style/main-app.css"

export default function MainApp() {
  return (
    <div className="flex h-screen mainapp-con">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto mainapp-pages-con">
        <Routes>
          <Route path="/" element={<Navigate to="/main/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/neworder" element={<NewOrder />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>
    </div>
  );
}
