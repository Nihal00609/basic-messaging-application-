import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/Register";
import LoginForm from "./components/Login";
import UserManagement from "./components/UserManagement";
import MessageList from "./components/MessageList";
import EditUser from "./components/EditUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/messages" element={<MessageList />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
