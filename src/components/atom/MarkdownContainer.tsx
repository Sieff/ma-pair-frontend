import React from "react";
import styles from "./MarkdownContainer.module.css";
import Markdown from "react-markdown";

interface MarkdownContainerProps {
    text: string
}

const MarkdownContainer: React.FC<MarkdownContainerProps> = ({text}) => {
    return (
        <div className={styles.markdownContainer}>
            <Markdown>{text}</Markdown>
        </div>
    )
}

export default MarkdownContainer