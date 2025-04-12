import React from "react";
import styles from "./CoinWidget.module.scss";
import { Card } from "../../core/Card/Card";
import { CoinWidgetProps } from "./CoinWidget.types";
import { Badge } from "../../core/Badge/Badge";
import { CoinAvatar } from "../CoinAvatar/CoinAvatar";
import { formatNumberCompact } from "@/utils/formatNumberCompact";
import { Chart } from "@/components/core/Chart/Chart";

export const CoinWidget: React.FC<CoinWidgetProps> = ({
  image,
  name,
  symbol,
  sparkline,
  currentPrice,
  priceChangePercentage24h,
  hideChart = false,
  onClick = () => {},
}) => {

  return (
    <Card onClick={onClick} width={hideChart ? '-webkit-fill-available' : '230px'}>
      <div className={`${styles.coinWidget} ${hideChart ? styles.hideChart : ""}`}>
        <CoinAvatar name={name} imgUrl={image} symbol={symbol} />
        {!hideChart && (
          <div className={styles.graphContainer}>
            <Chart
              type="line"
              data={sparkline}
              color={priceChangePercentage24h > 0 ? "#CDFF00" : "#FF3440"}
            />
          </div>
        )}
        <div className={styles.coinPriceContainer}>
          <p className={styles.coinPrice}>
            <span className="symbol">$</span>
            {formatNumberCompact(currentPrice)}
          </p>
          <Badge
            color={priceChangePercentage24h >= 0 ? "green" : "red"}
            label={`${
              priceChangePercentage24h >= 0 ? "+" : ""
            } ${formatNumberCompact(priceChangePercentage24h)}`}
          >
            <span className="symbol">%</span>
          </Badge>
        </div>
      </div>
    </Card>
  );
};
