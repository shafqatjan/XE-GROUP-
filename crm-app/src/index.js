import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from "react-dom/client";

const root = document.getElementById('root'); // Replace with the ID of your root element

const rootElement = createRoot(root);

rootElement.render(<App />);
