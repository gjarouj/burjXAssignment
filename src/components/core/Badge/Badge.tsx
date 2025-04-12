import React from "react";
import styles from "./Badge.module.scss";
import { BadgeProps } from "./Badge.types";

export const Badge: React.FC<BadgeProps> = ({
    label,
    color,
    children
}) => {
    return (<div className={`${styles.badge} ${color === 'red' ? styles.textRed : styles.textGreen}`}>
        {label} {children && <span>{children}</span>}
    </div>)
  };           