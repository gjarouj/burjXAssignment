export type CardProps = {
    children: React.ReactNode;
    onClick?: () => void;
    width?: string;
    role?: string;
    tabIndex?: number;
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}