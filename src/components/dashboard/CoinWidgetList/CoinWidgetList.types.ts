import { CoinWidgetProps } from "../CoinWidget/CoinWidget.types";

export type CoinWidgetListProps = {
    loading: boolean;
    coins: CoinWidgetProps[];
    id: string;
    hideChart?: boolean;
    onClick?: (coin: CoinWidgetProps) => void;
}