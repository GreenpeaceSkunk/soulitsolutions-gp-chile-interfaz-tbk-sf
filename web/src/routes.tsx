import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import TipoMensual from "./components/views/TipoMensual";
import TipoUnica from "./components/views/TipoUnica";
const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<TipoMensual />} />
        <Route path="/unica" element={<TipoUnica />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
