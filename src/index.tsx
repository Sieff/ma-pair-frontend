import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ChatWindow from "./components/domain/chat/ChatWindow";
import WidgetWindow from "./components/domain/widget/WidgetWindow";
import {MessagesContextProvider} from "./context/MessagesContext";
import 'react-material-symbols/rounded';
import {LogStatusContextProvider} from "./context/LogStatusContext";
import {BundleContextProvider} from "./context/BundleContext";

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
        element: <WidgetWindow />,
    },
]);

document.addEventListener('click', (event: MouseEvent) => {
    let target = event.target as HTMLElement;

    if (target && target.tagName === 'A') {
        event.preventDefault();
    }
});

root.render(
    <React.StrictMode>
        <MessagesContextProvider>
            <LogStatusContextProvider>
                <BundleContextProvider>
                    <RouterProvider router={router} />
                </BundleContextProvider>
            </LogStatusContextProvider>
        </MessagesContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
