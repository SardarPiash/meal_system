import BazarList from "./component/BazarList";
import Dashboad from "./component/Dashboad";
import EmailVerification from "./component/EmailVerification";
import SignUp from "./component/SignUp";
import Login from "./Login";
import SavePersonalInfo from "./SavePersonalInfo";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboad />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/emailverification" element={<EmailVerification />} />

        </Routes>
    </BrowserRouter>
  )
}