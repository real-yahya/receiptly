import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthLayout, {SignUp,LogIn} from "./pages/auth";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/auth" element={<AuthLayout/>}>
          <Route index element={<Navigate to="signin"/>}/>
          <Route path="signin" element={<LogIn/>}/>
          <Route path="signup" element={<SignUp/>}/>
        </Route>  
        
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
