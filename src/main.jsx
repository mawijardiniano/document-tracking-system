import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

// const warningStyles = [
//   "color: #ff3040",
//   "font-size: 18px",
//   "font-weight: bold",
//   "text-shadow: 1px 1px 2px rgba(0,0,0,0.2)",
//   "padding: 10px",
// ].join(";");

// const messageStyles = ["color: #444", "font-size: 14px", "padding: 10px"].join(
//   ";"
// );

// // ASCII art warning
// const asciiWarning = `
// %c
// ██╗    ██╗ █████╗ ██████╗ ███╗   ██╗██╗███╗   ██╗ ██████╗ ██╗
// ██║    ██║██╔══██╗██╔══██╗████╗  ██║██║████╗  ██║██╔════╝ ██║
// ██║ █╗ ██║███████║██████╔╝██╔██╗ ██║██║██╔██╗ ██║██║  ███╗██║
// ██║███╗██║██╔══██║██╔══██╗██║╚██╗██║██║██║╚██╗██║██║   ██║╚═╝
// ╚███╔███╔╝██║  ██║██║  ██║██║ ╚████║██║██║ ╚████║╚██████╔╝██╗
//  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝
// `;

// const asciiStyles = [
//   "color: #ff3040",
//   "font-family: monospace",
//   "font-size: 12px",
//   "font-weight: bold",
//   "line-height: 12px",
// ].join(";");

// // Display ASCII art and warning messages
// console.log(asciiWarning, asciiStyles);
// console.log("%cStop!", warningStyles);
// console.log(
//   '%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or "hack" the system, it is a scam and will give them access to your account.',
//   messageStyles
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
