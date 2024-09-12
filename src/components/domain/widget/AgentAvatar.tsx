import React, {useMemo} from "react";
import styles from './AgentAvatar.module.css';
import {Emotion} from "../../../model/Message";

interface AgentAvatarProps {
    emotion?: Emotion
}

const AgentAvatar: React.FC<AgentAvatarProps> = ({emotion}) => {
    const imageMap: {[key in Emotion]: string} = useMemo(() => {
        return {
            ANGRY: "/avatar-full-angry.png",
            ANNOYED: "/avatar-full-annoyed.png",
            ANTICIPATING: "/avatar-full-anticipating.png",
            BORED: "/avatar-full-bored.png",
            CONCENTRATED: "/avatar-full-concentrated.png",
            CONFUSED: "/avatar-full-confused.png",
            DEPRESSED: "/avatar-full-depressed.png",
            DISGUST: "/avatar-full-disgust.png",
            FEARFUL: "/avatar-full-fearful.png",
            HAPPY: "/avatar-full-happy.png",
            PERPLEXED: "/avatar-full-perplexed.png",
            SURPRISED: "/avatar-full-surprised.png",
            SAD: "/avatar-full-sad.png"
        }
    }, [])


    const imageSrc = useMemo(() => {
        if (emotion) {
            return imageMap[emotion];
        } else {
            return imageMap[Emotion.HAPPY]
        }
    }, [emotion, imageMap]);

    return (
        <img className={styles.avatar} src={imageSrc} alt={"Avatar of the assistant"} />
    )
}

export default AgentAvatar;