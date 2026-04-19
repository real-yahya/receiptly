import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./pages/auth.tsx";
import {SignUp,LogIn} from "./pages/auth.tsx";
import Dashboard from "./pages/dashboard.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route index element={<Navigate to="signin"/>}/>
          <Route path="signin" element={<LogIn/>}/>
          <Route path="signup" element={<SignUp/>}/>
        </Route>  
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
