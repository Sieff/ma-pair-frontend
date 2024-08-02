import styles from "./TextInput.module.css";
import React, {ChangeEvent, useCallback, useState} from "react";

interface TextInputProps {
    onChange: (value: string) => void;
    placeholder: string;
}

export const TextInput: React.FC<TextInputProps> = ({placeholder, onChange}: TextInputProps) => {
    const [rows, setRows] = useState(1);
    const onInput = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            const rows = Math.min(event.target.value.split("\n").length, 5)
            setRows(rows)
            onChange(event.target.value)
        },
        [onChange],
    );

    return (
        <>
            <textarea className={styles.inputField} onChange={onInput} placeholder={placeholder} rows={rows} />
        </>
    )
}