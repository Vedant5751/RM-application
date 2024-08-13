// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Clients from './Clients';
import Projects from './Projects'
import Employee from './Employee';
import Login from './Login';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;
