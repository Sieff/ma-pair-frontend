import React, {useContext} from "react";
import Divider from "../../atom/Divider";
import styles from "./TopBar.module.css";
import ResetConversation from "../ResetConversation";
import {LogStatusContext} from "../../../context/LogStatusContext";

const TopBar: React.FC = () => {
    const {success} = useContext(LogStatusContext);

    return (
        <>
            <Divider />

            <div className={styles.topBar}>
                {success ? (
                    <div />
                ) : (
                    <div className={styles.error}>Fehler beim erstellen des Logs</div>
                )}
                <ResetConversation />
            </div>

            <Divider />
        </>
    )
}

export default TopBar