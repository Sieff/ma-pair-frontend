import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ChatWindow from "./components/domain/chat/ChatWindow";
import Widget from "./components/domain/widget/Widget";
import {MessagesContextProvider} from "./context/MessagesContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <ChatWindow />,
    },
    {
        path: "/chat",
        element: <ChatWindow />,
    },
    {
        path: "/widget",
        element: <Widget />,
    },
]);


root.render(
  <React.StrictMode>
    <MessagesContextProvider>
        <RouterProvider router={router} />
    </MessagesContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
