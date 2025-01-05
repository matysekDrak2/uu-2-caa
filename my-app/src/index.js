import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UniversalProvider from "./sites/data/universalProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <UniversalProvider>
            <App />
        </UniversalProvider>
    </StrictMode>
);

// If you want to start measuring performance in your header, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
