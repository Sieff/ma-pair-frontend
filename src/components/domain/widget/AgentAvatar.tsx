import React, {useMemo} from "react";
import styles from './AgentAvatar.module.css';
import {Emotion} from "../../../model/Message";

interface AgentAvatarProps {
    emotion?: Emotion
}

const AgentAvatar: React.FC<AgentAvatarProps> = ({emotion}) => {
    const imageMap: {[key in Emotion]: string} = useMemo(() => {
        return {
            ANGRY: "/ma-pair-frontend/avatar-full-angry.png",
            ANNOYED: "/ma-pair-frontend/avatar-full-annoyed.png",
            ANTICIPATING: "/ma-pair-frontend/avatar-full-anticipating.png",
            BORED: "/ma-pair-frontend/avatar-full-bored.png",
            CONCENTRATED: "/ma-pair-frontend/avatar-full-concentrated.png",
            CONFUSED: "/ma-pair-frontend/avatar-full-confused.png",
            DEPRESSED: "/ma-pair-frontend/avatar-full-depressed.png",
            DISGUST: "/ma-pair-frontend/avatar-full-disgust.png",
            FEARFUL: "/ma-pair-frontend/avatar-full-fearful.png",
            HAPPY: "/ma-pair-frontend/avatar-full-happy.png",
            PERPLEXED: "/ma-pair-frontend/avatar-full-perplexed.png",
            SURPRISED: "/ma-pair-frontend/avatar-full-surprised.png",
            SAD: "/ma-pair-frontend/avatar-full-sad.png"
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