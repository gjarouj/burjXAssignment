'use client';

import React, { useState } from 'react';
import { PredictiveSearchProps } from './PredictiveSearch.types';
import styles from './PredictiveSearch.module.scss';



export const PredictiveSearch: React.FC<PredictiveSearchProps> = ({ coins, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.predictiveSearch}>
      <label htmlFor="coin-search" className="sr-only">Search coins</label>
      <input
        className={styles.input}
        id="coin-search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)} // delay to allow click
        placeholder="Search for a coin..."
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isFocused}
        aria-controls="coin-search-results"
        aria-haspopup="listbox"
      />
      {isFocused && filteredCoins.length > 0 && (
        <ul
          id="coin-search-results"
          role="listbox"
          className={styles.results}
        >
          {filteredCoins.map((coin, index) => (
            <li
              key={`${coin.symbol}-${index}`}
              role="option"
              tabIndex={0}
              onClick={() => {
                onSelect(coin.name);
                setSearchTerm("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSelect(coin.name);
                  setSearchTerm("");
                }
              }}
            >
              {coin.name} ({coin.symbol.toUpperCase()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
