export type ButtonProps = {
    type: 'primary' | 'secondary' | 'tertiary' | 'icon',
    onClick?: () => void,
    onBlur?: () => void,
    label?: string,
    disabled?: boolean,
    isDropdownToggle?: boolean,
    icon?: {
        url: string,
        width: number,
        height: number,
        position?: 'left' | 'right'
    },
    ariaLabel?: string,
    role?: string,
    tabIndex?: number,
    className?: string
}