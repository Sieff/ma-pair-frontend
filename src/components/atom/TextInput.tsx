import styles from "./TextInput.module.css";
import React, {ChangeEvent, useCallback} from "react";
import TextareaAutosize from 'react-textarea-autosize';

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    onEnter: () => void;
    placeholder: string;
    maxRows?: number;
}

export const TextInput: React.FC<TextInputProps> = ({value, placeholder, onChange, onEnter, maxRows}: TextInputProps) => {
    const onInput = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            onChange(event.target.value)
        },
        [onChange],
    );

    const onEnterPress = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if(event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onEnter()
            }
        },
        [onEnter],
    );

    return (
        <>
            <TextareaAutosize value={value} className={styles.inputField} onChange={onInput} placeholder={placeholder} maxRows={maxRows ?? 10} onKeyDown={onEnterPress} />
        </>
    )
}