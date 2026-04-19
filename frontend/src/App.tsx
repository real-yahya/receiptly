import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth.tsx";
import Dashboard from "./pages/dashboard.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
