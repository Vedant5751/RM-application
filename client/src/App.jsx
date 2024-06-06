import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Client from "./pages/Client";
import Employee from "./pages/Employee";
import FeedbackForm from './pages/FeedbackForm';

export default function () {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/project" element={<Project/>} />
      <Route path="/employee" element={<Employee/>} />
      <Route path="/client" element={<Client/>} />
      <Route path="/account" element={<Account/>} />
      <Route path="/feedback" element={<FeedbackForm/>} />
      </Routes>
    </Router>
    </>
  )
}
