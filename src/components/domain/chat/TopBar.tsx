import React, {useContext} from "react";
import Divider from "../../atom/Divider";
import styles from "./TopBar.module.css";
import ResetConversation from "../ResetConversation";
import {PluginStatusContext} from "../../../context/PluginStatusContext";

const TopBar: React.FC = () => {
    const {status} = useContext(PluginStatusContext);

    return (
        <>
            <Divider />

            <div className={styles.topBar}>
                {!status ? (
                    <div />
                ) : (
                    <div className={styles.error}>
                        {status}
                    </div>
                )}
                <ResetConversation />
            </div>

            <Divider />
        </>
    )
}

export default TopBar