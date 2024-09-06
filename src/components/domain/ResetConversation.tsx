import React, {useCallback, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import Button, {ButtonVariant} from "../atom/Button";
import styles from "./DeleteConversation.module.css";
import FocusTrap from "focus-trap-react";
import CefQueryService from "../../service/CefQueryService";
import {MaterialSymbol} from "react-material-symbols";

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
                        Möchtest du wirklich den gesamten Nachrichtenverlauf löschen?
                        <div className={styles.buttons}>
                            <Button onClick={onConfirm} ref={ref}>OK</Button>
                            <Button onClick={onClose} variant={ButtonVariant.REGULAR}>Abbrechen</Button>
                        </div>
                    </div>
                </div>
            </FocusTrap>
        </>
    )
}

export default ResetConversation