import React from "react";
import styles from "./CoinAvatar.module.scss";
import { CoinAvatarProps } from "./CoinAvatar.types";
import Image from "next/image";

export const CoinAvatar: React.FC<CoinAvatarProps> = ({
    name,
    imgUrl,
    symbol
}) => {
    return (<div className={styles.coinAvatarContainer}>
            <Image src={imgUrl}
                    alt={name}
                    width={40}
                    height={40}/>
                <div>
                    <p className={
                        styles.coinSymbol
                    }> {symbol}</p>
                    <p className={
                        styles.coinName
                    }> {name}</p>
                </div>
    </div>)
  };           