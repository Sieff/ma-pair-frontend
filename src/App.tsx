import React from 'react';
import ChatWindow from "./components/domain/ChatWindow";
import {MessagesContextProvider} from "./context/MessagesContext";


function App() {
  return (
      <MessagesContextProvider>
          <ChatWindow />
      </MessagesContextProvider>
);
}

export default App;
