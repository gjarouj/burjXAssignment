import React from 'react';
import styles from './Loader.module.scss';
import { LoaderProps } from './Loader.types';

export const Loader: React.FC<LoaderProps> = ({
    type = 'page',
    loadingMessage
}) => {
    return (<div aria-live="polite" role="status" className={`${styles.overlay} ${type === 'section' ? styles.inline : ''}`}>
        <span aria-hidden="true" className={styles.spinner}></span>
        <span className="sr-only">{loadingMessage}</span>
    </div>)
  };           