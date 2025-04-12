"use client";

import styles from "../../page.module.scss";
import "./page.module.scss";
import { useEffect, useState } from "react";
import { Button } from "@/components/core/Button/Button";
import { CoinWidgetProps } from "@/components/dashboard/CoinWidget/CoinWidget.types";
import { useParams } from "next/navigation";
import { Card } from "@/components/core/Card/Card";
import { formatNumberCompact } from "@/utils/formatNumberCompact";
import { Badge } from "@/components/core/Badge/Badge";
import { DualSwitch } from "@/components/core/DualSwitch/DualSwitch";
import { Chart } from "@/components/core/Chart/Chart";
import { RadioBtnGroup } from "@/components/core/RadioBtnGroup/RadioBtnGroup";
import { Loader } from "@/components/core/Loader/Loader";
import { Modal } from "@/components/core/Modal/Modal";
import { CoinWidgetList } from "@/components/dashboard/CoinWidgetList/CoinWidgetList";
import { CandleData, LineData } from "@/components/core/Chart/Chart.types";

export default function Coin() {
    const { productId } = useParams();
    const [coin, setCoin] = useState<CoinWidgetProps | undefined>(undefined);
    const [coinList, setCoinList] = useState<CoinWidgetProps[]>([]);
    const [timeline, setTimeline] = useState<CandleData[] | LineData>([]);
    const [chartType, setChartType] = useState<'line' | 'candlestick'>('candlestick');
    const [duration, setDuration] = useState<'1' | '7' | '30' | '365' | 'max'>('1');
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("selectedCoin");
        const allCoins = localStorage.getItem("allCoins");
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.productId === Number(productId)) {
                setCoin(parsed);
                setPageLoading(false);
            }
        }

        if (allCoins) setCoinList(JSON.parse(allCoins));
        
    }, [productId]);

    useEffect(() => {
        if (!coin) return;

        setLoading(true);
        const fetchCoinData = async () => {
            try {
                const res = await fetch(`https://coingeko.burjx.com/coin-ohlc?productId=${coin.productId}&days=${duration}`);
                const data = await res.json();
                setTimeline(data);
            } catch (error) {
                console.error("Failed to fetch widget coins:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoinData();
    }, [coin, duration]);

    if (pageLoading) return <Loader loadingMessage="Loading coin data" type="page" />;

    if (!coin) return <div>Loading coin data...</div>;

    return (
        <div className={styles.main}>
            <div className="coinDetails">
                <Button
                    label={`${coin.name} (${coin.symbol})`}
                    type="secondary"
                    isDropdownToggle={true}
                    onClick={() => setShowDropdown(true)}
                    icon={{
                        url: coin.image,
                        width: 40,
                        height: 40,
                        position: "left",
                    }}
                />
            </div>
            <div className={styles.cardContainer}>
                <Card width="inherit">
                    <div className="flex items-start">
                        <div className="mr-[18px] flex flex-col items-start">
                            <p className="text-[28px]">${formatNumberCompact(coin?.currentPrice)}</p>
                            <Badge
                                color={coin.priceChangePercentage24h >= 0 ? 'green' : 'red'}
                                label={`${
                                    coin.priceChangePercentage24h >= 0 ? '+' : '-'
                                } ${formatNumberCompact(coin.priceChangePercentage24h)}`}
                            >
                                <span className="symbol">%</span>
                            </Badge>
                        </div>
                        <DualSwitch
                            options={[
                                {
                                    label: "line",
                                    icon: {
                                        url: "/icons/line.svg",
                                        width: 13,
                                        height: 13,
                                        position: "left",
                                    },
                                },
                                {
                                    label: "candlestick",
                                    icon: {
                                        url: "/icons/candleStick.svg",
                                        width: 18,
                                        height: 18,
                                        position: "right",
                                    },
                                },
                            ]}
                            default={{
                                label: "candlestick",
                                icon: {
                                    url: "/icons/candleStick.svg",
                                    width: 18,
                                    height: 18,
                                    position: "right",
                                },
                            }}
                            onChange={(obj) => setChartType(obj.label as 'line' | 'candlestick')}
                        />
                    </div>
                    <div className="w-full h-[350px] relative">
                        {loading ? <Loader loadingMessage="Loading coin data" type="section" /> : <Chart type={chartType} data={timeline} />}
                    </div>
                    <div className="w-full flex items-center mt-[60px]">
                    <RadioBtnGroup
    default={{ label: '1D', value: '1' }}
    onChange={(obj) => setDuration(obj.value as '1' | '7' | '30' | '365' | 'max')}
    label="select duration period"
    options={[
        { label: '1D', value: '1' },
        { label: '1W', value: '7' },
        { label: '1M', value: '30' },
        { label: '1Y', value: '365' },
        { label: 'ALL', value: 'max' }, // <-- fixed here
    ]}
/>

                    </div>
                </Card>
            </div>
            <Modal isOpen={showDropdown} onClose={() => setShowDropdown(false)} title="Search crypto">
                <div className={styles.coinListContainer}>
                    <CoinWidgetList hideChart={true} id="modalCoins" loading={false} coins={coinList} />
                </div>
            </Modal>
        </div>
    );
}
