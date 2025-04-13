'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/core/Button/Button';
import styles from './DualSwitch.module.scss';
import { DualSwitchProps } from './DualSwitch.types';

export const DualSwitch: React.FC<DualSwitchProps> = ({
  options,
  default: defaultOption,
  onChange,
  label = 'Toggle option',
  className = '',
}) => {
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState(defaultOption);

  useEffect(() => {
    const index = options.findIndex((option) => option.label === selected.label);
    if (index !== -1) {
      optionRefs.current[index]?.focus();
    }
  }, [selected, options]);

  const updateSelection = (option: typeof selected) => {
    setSelected(option);
    onChange(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = options.findIndex((option) => option.label === selected.label);
    const current = currentIndex === -1 ? 0 : currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const direction = e.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (current + direction + options.length) % options.length;
      updateSelection(options[nextIndex]);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={`${styles.dualSwitchContainer} ${className}`}
    >
      {options.map((option, index) => {
        const isSelected = selected.label === option.label;

        return (
          <Button
            key={option.label}
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            role="radio"
            type="icon"
            className={isSelected ? "selected" : ""}
            icon={option.icon}
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => updateSelection(option)}
            ariaLabel={`${option.label} option`}
          />
        );
      })}
    </div>
  );
}
