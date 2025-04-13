'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.scss';
import { Tabs } from '@/components/core/Tabs/Tabs';
import { TabPanel } from '@/components/core/Tabs/TabPanel';
import { Tab } from '@/components/core/Tabs/Tab';
import { CoinWidgetList } from '@/components/dashboard/CoinWidgetList/CoinWidgetList';
import { useEffect, useRef, useState } from 'react';
import { CoinWidgetProps } from '@/components/dashboard/CoinWidget/CoinWidget.types';
import { Table } from '@/components/core/Table/Table';
import { CoinAvatar } from '@/components/dashboard/CoinAvatar/CoinAvatar';
import { Badge } from '@/components/core/Badge/Badge';
import { Button } from '@/components/core/Button/Button';
import { formatNumberCompact } from '@/utils/formatNumberCompact';
import { Chart } from '@/components/core/Chart/Chart';
import Link from 'next/link';
import { Loader } from '@/components/core/Loader/Loader';

const pageSize = 20;
const REFRESH_INTERVAL = 30000;

export default function Home() {
  const router = useRouter();
  const [widgetCoins, setWidgetCoins] = useState<CoinWidgetProps[]>([]);
  const [tableCoins, setTableCoins] = useState<CoinWidgetProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Fetch coins for CoinWidgetList
  useEffect(() => {
    const fetchWidgetCoins = async () => {
      try {
        const res = await fetch('https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=20');
        const data = await res.json();
        setWidgetCoins(data.data);
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch widget coins', error);
      }
    };

    fetchWidgetCoins();

    const interval = setInterval(fetchWidgetCoins, REFRESH_INTERVAL); // Increased refresh interval
    return () => clearInterval(interval);
  }, []);

  // Fetch coins for the table
  const fetchCoins = async (currentPage: number) => {
    if (loading || !hasMore) return;
  
    setLoading(true);
    try {
      const res = await fetch(
        `https://coingeko.burjx.com/coin-prices-all?currency=usd&page=${currentPage}&pageSize=${pageSize}`
      );
      const data = await res.json();
  
      setTableCoins((prev) => {
        const newCoins = [...prev, ...data.data];
        if (newCoins.length >= 100 || data.data.length < pageSize) {
          setHasMore(false);
          return newCoins.slice(0, 100);
        }
        return newCoins;
      });
    } catch (error) {
      console.error('Failed to load table coins:', error);
    } finally {
      setLoading(false);
      setTableLoading(false);
    }
  };
  
  

  // Lazy load on scroll for the table
  useEffect(() => {
    fetchCoins(page);
  }, [page, fetchCoins]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore) {
          setTableLoading(true);
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: '40px',
        threshold: 1.0,
      }
    );

    const currentRef = loaderRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading, hasMore]);

  if (pageLoading) return <Loader loadingMessage="Loading coin data" type="page" />;

  return (
    <div className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image fill src="/logo/Logo.svg" alt="BurjX logo" />
        </Link>
      </nav>

      <h1 className={styles.header}>Markets</h1>

      <Tabs defaultTab="one">
        <Tab label="Featured" value="one" imgSrc="/icons/48px/fire.svg" />
        <Tab label="Top Gainers" value="two" imgSrc="/icons/22px/Rocket.svg" />
        <Tab label="Top Losers" value="three" imgSrc="/icons/48px/alarm-icon.svg" />

        <TabPanel value="one">
          <CoinWidgetList id="featured" loading={false} coins={widgetCoins} />
        </TabPanel>
        <TabPanel value="two">
          <CoinWidgetList id="gainers"
            loading={false}
            coins={[...widgetCoins].sort(
              (a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h
            )}
          />
        </TabPanel>
        <TabPanel value="three">
          <CoinWidgetList id="losers"
            loading={false}
            coins={[...widgetCoins].sort(
              (a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h
            )}
          />
        </TabPanel>
      </Tabs>

      <h2 className={styles.header}>All Coins</h2>

      <Table
        caption="Table list of coins"
        loading={tableLoading}
        columns={[
          { title: "Market Name" },
          { title: "Market Cap", information: "Some information" },
          { title: "Trading Volume", information: "Some information" },
          { title: "24hr Chart" },
          { title: "Price" },
          { title: "24hr Change" },
        ]}
      >
        {tableCoins.map((coin, index) => (
          <tr key={`${coin.id}-${index}`}  onClick={() => {
            localStorage.setItem("selectedCoin", JSON.stringify(coin));
            localStorage.setItem("allCoins", JSON.stringify(tableCoins));
            setPageLoading(true);
            router.push(`/coin/${coin.productId}`);
          }}>
            <td>
              <CoinAvatar
                name={coin.name}
                imgUrl={coin.image}
                symbol={coin.symbol}
              />
            </td>
            <td>{formatNumberCompact(coin.marketCap)}</td>
            <td>{formatNumberCompact(coin.tradingVolume)}</td>
            <td>
              <div className={styles.graphContainer}>
                <Chart type="line" data={coin.sparkline} color={coin.priceChangePercentage24h > 0 ? '#CDFF00' : '#FF3440'} />
              </div>
            </td>
            <td>
              $ {formatNumberCompact(coin.currentPrice)}
            </td>
            <td>
              <Badge
                color={coin.priceChangePercentage24h >= 0 ? "green" : "red"}
                label={`${
                  coin.priceChangePercentage24h >= 0 ? "+" : ""
                } ${coin.priceChangePercentage24h.toFixed(2)}`}
              >
                <span className="symbol">%</span>
              </Badge>
              <Button type="primary" label="Trade" />
            </td>
          </tr>
        ))}
      </Table>
      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
}
