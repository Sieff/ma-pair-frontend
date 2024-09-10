import React, {useMemo} from "react";
import Button, {ButtonVariant} from "./Button";
import {MaterialSymbol, SymbolCodepoints} from "react-material-symbols";

interface IconButtonProps {
    onClick: () => void;
    disabled?: boolean;
    variant?: ButtonVariant;
    icon: SymbolCodepoints
}

const IconButton: React.FC<IconButtonProps> = ({onClick, variant, disabled, icon}) => {
    const iconColor = useMemo(() => {
        if (disabled) {
            return "var(--text-disabled)"
        }

        switch (variant) {
            case ButtonVariant.REGULAR: return "var(--text-default)"
            case ButtonVariant.DEFAULT: return "white"
            default: return "white"
        }
    }, [variant, disabled]);

    return (
        <Button onClick={onClick} disabled={disabled} variant={variant}>
            <MaterialSymbol icon={icon} size={16} color={iconColor} />
        </Button>
    )
}

export default IconButton