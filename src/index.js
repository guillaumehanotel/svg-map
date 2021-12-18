import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from './App';
import Map from "./Components/Map";
import Layout from "./Layout";

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<App />} />
                    <Route path="maps/:mapSlug" element={<Map />} />
                </Route>
            </Routes>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);

