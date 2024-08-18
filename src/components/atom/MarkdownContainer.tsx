import React, {forwardRef} from "react";
import styles from "./MarkdownContainer.module.css";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import {cls} from "../../cls";

interface MarkdownContainerProps {
    text: string,
    lowlight?: boolean
}

const MarkdownContainer: React.ForwardRefExoticComponent<MarkdownContainerProps & React.RefAttributes<HTMLDivElement>> =
    forwardRef<HTMLDivElement, MarkdownContainerProps>(({text, lowlight}, ref) => {
        return (
            <div className={cls(styles.markdownContainer, lowlight && styles.lowlight)} ref={ref}>
                <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
            </div>
        )
})

export default MarkdownContainer