export type SwitchBtnOptions = {
    label: string;
    icon: {
        url: string,
        width: number,
        height: number,
        position?: 'left' | 'right'
    }
}

export type DualSwitchProps = {
    options: SwitchBtnOptions[];
    default: SwitchBtnOptions;
    onChange: (value: SwitchBtnOptions) => void;
    label?: string;
    className?: string;
  };
  