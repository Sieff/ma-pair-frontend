import React, {useContext} from "react";
import Divider from "../../atom/Divider";
import styles from "./TopBar.module.css";
import ResetConversation from "../ResetConversation";
import {LogStatusContext} from "../../../context/LogStatusContext";
import {BundleContext, MessageCode} from "../../../context/BundleContext";

const TopBar: React.FC = () => {
    const {success} = useContext(LogStatusContext);

    const {messages} = useContext(BundleContext);

    return (
        <>
            <Divider />

            <div className={styles.topBar}>
                {success ? (
                    <div />
                ) : (
                    <div className={styles.error}>
                        {messages[MessageCode.log_deactivated]}
                    </div>
                )}
                <ResetConversation />
            </div>

            <Divider />
        </>
    )
}

export default TopBar