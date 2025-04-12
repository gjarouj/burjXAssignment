"use client";
import React, { forwardRef } from "react";
import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.types";

// Forward the ref to the <button> element
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "primary",
      onClick = () => {},
      onBlur = () => {},
      label,
      disabled,
      icon,
      ariaLabel,
      isDropdownToggle = false,
      role = "button",
      tabIndex,
      className
    },
    ref
  ) => {
    return (
      <button
        tabIndex={tabIndex}
        role={role}
        ref={ref}
        aria-label={ariaLabel}
        className={`${styles.button} ${styles[type]} ${className === 'selected' ? styles.selected : ''} ${className === 'cancel' ? styles.cancel : ''}`}
        onClick={onClick}
        onBlur={onBlur}
        disabled={disabled}
      >
        {icon && icon?.position === "left" && (
          <span
            className={styles.icon}
            style={{
              width: `${icon.width}px`,
              height: `${icon.height}px`,
              backgroundImage: `url(${icon.url})`,
              backgroundSize: "cover",
            }}
            aria-hidden="true"
          ></span>
        )}
        {label && <span>{label}</span>}
        {isDropdownToggle && (
          <span
            className={styles.icon}
            aria-hidden="true"
            style={{
              width: "22px",
              height: "22px",
              backgroundImage: `url('/icons/22px/icon-down.svg')`,
              backgroundSize: "cover",
            }}
          ></span>
        )}
        {icon && icon?.position === "right" && (
          <span
            aria-hidden="true"
            className={styles.icon}
            style={{
              width: `${icon.width}px`,
              height: `${icon.height}px`,
              backgroundImage: `url(${icon.url})`,
              backgroundSize: "cover",
            }}
          ></span>
        )}
      </button>
    );
  }
);

// Optional: for better DX (debugging), name the component
Button.displayName = "Button";
