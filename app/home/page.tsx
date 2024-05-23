"use client";

// React
import React from "react";

// Redux
import store from "../store/store";
import { Provider } from "react-redux";

// In-Project
import PatientDashboard from "../ui/home/PatientDashboard";

// This functions only as Context Provider
export default function Page() {
  return (
    <Provider store={store}>
      <PatientDashboard />
    </Provider>
  );
}