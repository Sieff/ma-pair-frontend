import styles from "./TextInput.module.css";
import React, {ChangeEvent, useCallback, useEffect, useRef} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import DataPacketService from "../../service/DataPacketService";
import {DataPacket, DataPacketType} from "../../model/DataPacket";

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    onEnter: () => void;
    placeholder: string;
    maxRows?: number;
}

const TextInput: React.FC<TextInputProps> = ({value, placeholder, onChange, onEnter, maxRows}: TextInputProps) => {
    const dataPacketService = useRef(DataPacketService.instance);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const setRef = (element: HTMLTextAreaElement | null) => {
        textareaRef.current = element;
    };

    const setFocus = useCallback(
        (_: DataPacket) => {
            textareaRef.current?.focus()
        },
        [textareaRef]
    );

    useEffect(() => {
        dataPacketService.current.setCallback(DataPacketType.REQUEST_TEXT_INPUT_FOCUS, setFocus)
    }, [setFocus]);

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
            <TextareaAutosize value={value} className={styles.inputField} onChange={onInput} placeholder={placeholder}
                              maxRows={maxRows ?? 10} onKeyDown={onEnterPress}
                              ref={setRef}
            />
        </>
    )
}

export default TextInput;