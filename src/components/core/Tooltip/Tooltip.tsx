import React from "react";
import styles from "./Tooltip.module.scss";
import { TooltipProps } from "./Tooltip.types";
import { Button } from "../Button/Button";

export const Tooltip: React.FC<TooltipProps> = ({
    children,
    position = "top"
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    const handleOnBlur = () => {
        setIsOpen(false);
    }; 
    return (<div className={styles.tooltipContainer}>
        <Button onClick={handleClick} onBlur={handleOnBlur} type="icon" ariaLabel="Click for more information"
        icon={{
            url: "/icons/22px/icon-info.svg",
            width: 16,
            height: 16,
            position: "right"
        }}></Button>
        {isOpen && <div className={`${styles.tooltipContent} ${styles[position]}`}>
            {children}  </div>}
    </div>)
  };           