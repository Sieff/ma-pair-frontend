import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import Button, {ButtonVariant} from "../atom/Button";
import styles from "./ResetConversation.module.css";
import FocusTrap from "focus-trap-react";
import CefQueryService from "../../service/CefQueryService";
import {BundleContext, MessageCode} from "../../context/BundleContext";
import IconButton from "../atom/IconButton";

const ResetConversation: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <IconButton onClick={() => {setShowModal(true)}} icon={"delete"} variant={ButtonVariant.REGULAR}/>
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