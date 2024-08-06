import styles from "./TextInput.module.css";
import React, {ChangeEvent, useCallback} from "react";
import TextareaAutosize from 'react-textarea-autosize';

interface TextInputProps {
    onChange: (value: string) => void;
    placeholder: string;
    maxRows?: number;
}

export const TextInput: React.FC<TextInputProps> = ({placeholder, onChange, maxRows}: TextInputProps) => {
    const onInput = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            onChange(event.target.value)
        },
        [onChange],
    );

    return (
        <>
            <TextareaAutosize className={styles.inputField} onChange={onInput} placeholder={placeholder} maxRows={maxRows ?? 5} />
        </>
    )
}