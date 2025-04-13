import React from 'react';
import styles from './Card.module.scss';
import { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({
    children,
    onClick = () => {}, 
    width = '230px',
    role,
    tabIndex,
    onKeyDown = () => {}
}) => {
    return (<div tabIndex={tabIndex} role={role} className={styles.card} onKeyDown={onKeyDown} onClick={onClick} style={{ width: width }}>
        {children}
    </div>)
  };           