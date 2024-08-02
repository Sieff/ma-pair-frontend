import React from 'react';
import ChatWindow from "./components/domain/ChatWindow";
import styles from './App.module.css';
import {MessagesContextProvider} from "./context/MessagesContext";


function App() {
  return (
      <MessagesContextProvider>
        <div className={styles.container}>
          <ChatWindow />
        </div>
      </MessagesContextProvider>
);
}

export default App;
