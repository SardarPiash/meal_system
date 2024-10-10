import BazarList from "./component/BazarList";
import Dashboad from "./pages/Dashboad";
import EmailVerification from "./component/EmailVerification";
import SignUp from "./component/SignUp";
import Login from "./Login";
import SavePersonalInfo from "./SavePersonalInfo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNewMember from "./pages/AddNewMember";

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboad />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/emailverification" element={<EmailVerification />} />
          <Route path="/add-new-member" element={<AddNewMember />} />

        </Routes>
    </BrowserRouter>
  )
}