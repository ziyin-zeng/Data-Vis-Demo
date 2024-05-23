"use client";

import PatientProfil from "../ui/home/PatientProfil";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PatientType from "@/app/type/PatientType";

import store from "../store/store";
import { Provider } from "react-redux";

export default function Page() {
  const [patients, setPatients] = useState<PatientType[] | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await axios.get(
        "https://664e4e1afafad45dfadfbc58.mockapi.io/api/patients",
      );
      setPatients(response.data);
    };

    fetchPatients();
  }, []);

  return (
    <Provider store={store}>
      <div className="w-1/2 mx-auto text-center">
        {patients &&
          patients.map((p) => <PatientProfil key={p.id} patient={p} />)}
      </div>
    </Provider>
  );
}
