import React, {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import Button, {ButtonVariant} from "../atom/Button";
import {MaterialSymbol} from "react-material-symbols";
import styles from "./DeleteConversation.module.css";
import FocusTrap from "focus-trap-react";

const DeleteConversation: React.FC = () => {
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

interface DeleteConversationModalProps {
    onClose: () => void
}

const DeleteConversationModal: React.FC<DeleteConversationModalProps> = ({onClose}) => {
    const ref = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        ref.current?.focus()
    }, []);
    
    return (
        <>
            <FocusTrap>
                <div className={styles.modal}>
                    <div className={styles.content}>
                        Möchtest du wirklich den gesamten Nachrichtenverlauf löschen?
                        <div className={styles.buttons}>
                            <Button onClick={onClose} ref={ref}>OK</Button>
                            <Button onClick={onClose} variant={ButtonVariant.REGULAR}>Abbrechen</Button>
                        </div>
                    </div>
                </div>
            </FocusTrap>
        </>
    )
}

export default DeleteConversation