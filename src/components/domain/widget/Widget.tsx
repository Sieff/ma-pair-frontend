import React from "react";
import {MessagesContextProvider} from "../../../context/MessagesContext";

const Widget: React.FC = () => {
    return (
        <MessagesContextProvider>
            <div>
                hi
            </div>
        </MessagesContextProvider>
    )
}

export default Widget;