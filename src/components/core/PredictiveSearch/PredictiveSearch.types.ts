export type PredictiveSearchProps = {
  coins: { name: string; symbol: string }[];
  onSelect: (search: string) => void;
}