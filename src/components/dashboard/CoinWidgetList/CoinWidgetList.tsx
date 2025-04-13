import React from "react";
import styles from "./CoinWidgetList.module.scss";
import { CoinWidget } from "../CoinWidget/CoinWidget";
import { CoinWidgetListProps } from "./CoinWidgetList.types";
import { Loader } from "@/components/core/Loader/Loader";
import { CoinWidgetProps } from "../CoinWidget/CoinWidget.types";
import { useRouter } from "next/navigation"; 

export const CoinWidgetList: React.FC<CoinWidgetListProps> = ({
    coins,
    id,
    hideChart
}) => {
    const router = useRouter();

    function widgetClicked(coin: CoinWidgetProps) {
        if (!hideChart) return;
        localStorage.setItem("selectedCoin", JSON.stringify(coin));
        router.push(`/coin/${coin.productId}`);
    }
    
    if (!coins.length) {
        return <div className="w-100 h-100 relative"><Loader type="section" loadingMessage="Loading table data..." /></div>
    }

    return (
        <div role="list" className={`${styles.coinWidgetList}${hideChart ? ` ${styles.hideChart}` : ""}`}>
            {coins.map((coin, index) => (  
                <CoinWidget 
                    onClick={() => widgetClicked(coin)}
                    key={`Widget-${id}-${coin.id}-${index}`}
                    productId={coin.productId}
                    name={coin.name}
                    hideChart={hideChart}
                    symbol={coin.symbol}
                    image={coin.image}
                    currentPrice={coin.currentPrice}
                    priceChangePercentage24h={coin.priceChangePercentage24h}
                    sparkline={coin.sparkline} // Pass the sparkline data
                />
            ))}
        </div>
    )
};