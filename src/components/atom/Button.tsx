import React, {useMemo} from "react";
import styles from "./Button.module.css";

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    variant?: ButtonVariant;
}

export enum ButtonVariant {
    REGULAR,
    DEFAULT
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({onClick, variant, disabled, children}: React.PropsWithChildren<ButtonProps>) => {
    const className = useMemo(() => {
        if (disabled) {
            return styles.disabled
        }
        switch (variant) {
            case ButtonVariant.REGULAR: return styles.regular
            case ButtonVariant.DEFAULT: return styles.default
            default: return styles.default
        }
    }, [variant, disabled]);


    return (
        <>
            <button className={className} onClick={onClick} disabled={disabled}>{children}</button>
        </>
    )
}