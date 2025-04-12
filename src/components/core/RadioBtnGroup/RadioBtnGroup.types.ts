export type RadioBtnOption = {
    label: string,
    value: string
}
export type RadioBtnGroupProps = {
    options: RadioBtnOption[],
    default: RadioBtnOption;
    onChange: (value: RadioBtnOption) => void;
    label?: string;
    className?: string;
}