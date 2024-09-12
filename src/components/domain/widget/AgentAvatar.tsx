import React, {useMemo} from "react";
import styles from './AgentAvatar.module.css';
import {Emotion} from "../../../model/Message";

interface AgentAvatarProps {
    emotion?: Emotion
}

const AgentAvatar: React.FC<AgentAvatarProps> = ({emotion}) => {
    const imageSource = useMemo(() => {
        switch (emotion) {
            case Emotion.HAPPY:
                return "/avatar-full-happy.png"
            case Emotion.SAD:
                return "/avatar-full-sad.png"
            case Emotion.BORED:
                return "/avatar-full-neutral.png"
            case Emotion.PERPLEXED:
                return "/avatar-full-confused.png"
            default:
                return "/avatar-full-happy.png"
        }
    }, [emotion]);

    return (
        <img className={styles.avatar} src={imageSource} alt={"Avatar of the assistant"} />
    )
}

export default AgentAvatar;