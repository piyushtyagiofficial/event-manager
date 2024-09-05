import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import Home from './Home.jsx'
import Update from './Update.jsx'
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<App />} />
                <Route path="/update/:id" element={<Update />} />
            </Routes>
        </React.StrictMode>
    </BrowserRouter>
)
