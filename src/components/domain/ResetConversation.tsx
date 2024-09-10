import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import Button, {ButtonVariant} from "../atom/Button";
import styles from "./ResetConversation.module.css";
import FocusTrap from "focus-trap-react";
import CefQueryService from "../../service/CefQueryService";
import {MaterialSymbol} from "react-material-symbols";
import {BundleContext, MessageCode} from "../../context/BundleContext";

const ResetConversation: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Button onClick={() => {setShowModal(true)}} variant={ButtonVariant.REGULAR}>
                <MaterialSymbol icon={"delete"} size={16} color={"white"} />
            </Button>
            {showModal && createPortal(
                <DeleteConversationModal onClose={() => setShowModal(false)} />,
                document.body
            )}
        </>
    )
}

interface ResetConversationModalProps {
    onClose: () => void
}

const DeleteConversationModal: React.FC<ResetConversationModalProps> = ({onClose}) => {
    const cefQueryService = useRef(CefQueryService.instance);
    const ref = useRef<HTMLButtonElement | null>(null)
    const {messages} = useContext(BundleContext);

    useEffect(() => {
        ref.current?.focus()
    }, []);
    
    const onConfirm = useCallback(
        () => {
            cefQueryService.current.resetConversation()
            onClose()
        },
        [onClose],
    );
    
    
    return (
        <>
            <FocusTrap>
                <div className={styles.modal}>
                    <div className={styles.content}>
                        {messages[MessageCode.reset_conversation]}
                        <div className={styles.buttons}>
                            <Button onClick={onConfirm} ref={ref}>
                                {messages[MessageCode.confirm]}
                            </Button>
                            <Button onClick={onClose} variant={ButtonVariant.REGULAR}>
                                {messages[MessageCode.cancel]}
                            </Button>
                        </div>
                    </div>
                </div>
            </FocusTrap>
        </>
    )
}

export default ResetConversation