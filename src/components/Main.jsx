import React from "react";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Dashboard/HomePage";
import CreateProject from "./Create Project/CreateProject";
import DataTable from "./DataTable/DataTable";

export default function Main() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/dashboard/createProject" element={<CreateProject />} />
          <Route path="/dashboard/projectData" element={<DataTable />} />
        </Route>
      </Routes>
    </>
  );
}
