import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import Navbar from "./common/Navbar";
import { ProfilePage } from "./features/user/pages/ProfilePage";
import UsersListPage from "./features/user/pages/UserListPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/users" element={<UsersListPage />} />
      </Routes>
    </>
  );
}

export default App;
