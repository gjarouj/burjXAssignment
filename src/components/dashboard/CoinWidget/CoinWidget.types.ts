export type CoinWidgetProps = {
    image: string;
    id?: string;
    productId: string;
    name: string;
    symbol: string;
    sparkline: number[];
    currentPrice: number;
    priceChangePercentage24h: number;
    marketCap?: number;
    tradingVolume?: number;
    hideChart?: boolean;
    onClick?: () => void;
}