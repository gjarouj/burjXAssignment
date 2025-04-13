import React from 'react';
import styles from './Table.module.scss';
import { TableProps } from './Table.types';
import { Tooltip } from '@/components/core/Tooltip/Tooltip';
import { Loader } from '@/components/core/Loader/Loader';

export const Table: React.FC<TableProps> = ({
    loading,
    children,
    columns,
    caption,
  }) => {
    if (loading) return <div className="w-100 h-100 relative"><Loader type="section" loadingMessage="Loading table data..." /></div>;

    return ( <div className={styles.resonsiveTable}>
          <table className={styles.table}>
            {caption && <caption>{caption}</caption>}
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} scope="col">
                    {column.title}
                    {column.information && (
                      <Tooltip position="right">
                        {column.information}
                      </Tooltip>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
          </table>
        </div>);
  };
  
  