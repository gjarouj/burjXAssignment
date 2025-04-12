export interface CandleData {
  date: number;
  usd: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
  aed: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
}
  
export type LineData = number[];

export type ChartProps = {
  type: 'line' | 'candlestick';
  data: CandleData[] | LineData;
  color?: string;
};