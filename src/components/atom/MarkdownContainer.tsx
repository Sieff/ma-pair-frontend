import React, {forwardRef} from "react";
import styles from "./MarkdownContainer.module.css";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'

interface MarkdownContainerProps {
    text: string
}

const MarkdownContainer: React.ForwardRefExoticComponent<MarkdownContainerProps & React.RefAttributes<HTMLDivElement>> =
    forwardRef<HTMLDivElement, MarkdownContainerProps>(({text}, ref) => {
        return (
            <div className={styles.markdownContainer} ref={ref}>
                <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
            </div>
        )
})

export default MarkdownContainer