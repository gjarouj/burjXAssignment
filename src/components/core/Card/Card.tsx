import React from "react";
import styles from "./Card.module.scss";
import { CardProps } from "./Card.types";

export const Card: React.FC<CardProps> = ({
    children,
    onClick = () => {}, 
    width = '230px'
}) => {
    return (<div className={styles.card} onClick={onClick} style={{ width: width }}>
        {children}
    </div>)
  };           