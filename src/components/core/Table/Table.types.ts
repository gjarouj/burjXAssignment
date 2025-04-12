type ColumnHeader = {
    title: string;
    information?: string;
}
export type TableProps = {
    loading: boolean;
    columns: ColumnHeader[];
    children: React.ReactNode;
    caption?: string;
}