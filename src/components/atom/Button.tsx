import React, {forwardRef, useMemo} from "react";
import styles from "./Button.module.css";
import {cls} from "../../cls";

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    variant?: ButtonVariant;
}

export enum ButtonVariant {
    REGULAR,
    DEFAULT
}

const Button: React.ForwardRefExoticComponent<React.PropsWithChildren<ButtonProps> & React.RefAttributes<HTMLButtonElement>> =
    forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(({onClick, variant, disabled, children}: React.PropsWithChildren<ButtonProps>, ref) => {
        const className = useMemo(() => {
            if (disabled) {
                return styles.disabled
            }
            switch (variant) {
                case ButtonVariant.REGULAR:
                    return styles.regular
                case ButtonVariant.DEFAULT:
                    return styles.default
                default:
                    return styles.default
            }
        }, [variant, disabled]);


        return (
            <>
                <button className={cls(className, styles.button)} onClick={onClick} disabled={disabled} ref={ref}>{children}</button>
            </>
        )
})

export default Button;