import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Users from './pages/Users';
import Accounts from './pages/Accounts';
import Sources from './pages/Sources';
import Transactions from './pages/Transactions';
import Cabinets from './pages/Cabinets';


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected */}
                <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
                <Route path="/sources" element={<ProtectedRoute><Sources /></ProtectedRoute>} />
                <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                <Route path="/cabinets" element={<ProtectedRoute><Cabinets /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;