import React from "react";
import styles from "./MarkdownContainer.module.css";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'

interface MarkdownContainerProps {
    text: string
}

const MarkdownContainer: React.FC<MarkdownContainerProps> = ({text}) => {
    return (
        <div className={styles.markdownContainer}>
            <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
        </div>
    )
}

export default MarkdownContainer