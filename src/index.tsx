import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createHashRouter, RouterProvider} from "react-router-dom";
import ChatWindow from "./components/domain/chat/ChatWindow";
import WidgetWindow from "./components/domain/widget/WidgetWindow";
import {MessagesContextProvider} from "./context/MessagesContext";
import 'react-material-symbols/rounded';
import {LogStatusContextProvider} from "./context/LogStatusContext";
import {BundleContextProvider} from "./context/BundleContext";
import ColorSchemeManager from "./components/ColorSchemeManager";
import {ProcessingStatusContextProvider} from "./context/ProcessingStatusContext";
import {StudyGroupContextProvider} from "./context/StudyGroupContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createHashRouter([
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
            <ProcessingStatusContextProvider>
                <LogStatusContextProvider>
                    <BundleContextProvider>
                        <StudyGroupContextProvider>
                            <ColorSchemeManager />
                            <RouterProvider router={router} />
                        </StudyGroupContextProvider>
                    </BundleContextProvider>
                </LogStatusContextProvider>
            </ProcessingStatusContextProvider>
        </MessagesContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
