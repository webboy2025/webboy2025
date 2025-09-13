import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import React from "react";
import UpdatePassword from "./UpdatePassword";
import UpdateEmail from "./UpdateEmail";
import ListEmails from "./ListEmails";
import DeleteUser from "./DeleteUser";
export default function router() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/update-email" element={<UpdateEmail />} />

          <Route path="/delete-user" element={<DeleteUser />} />

          <Route path="/list-emails" element={<ListEmails />} />
        </Routes>
      </Router>
    </div>
  );
}
