import { useEffect, useState, useCallback } from 'react';

const useCoinMarket = (
  currency = 'idr',
  category = 'smart-contract-platform',
  order = 'market_cap_desc',
  priceChangePercentage = '24h,7d',
  perPage = 15
) => {
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCoinMarket = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&category=${category}&order=${order}&per_page=${perPage}&page=1&sparkline=true&price_change_percentage=${priceChangePercentage}`
      );

      if (response.ok) {
        const data = await response.json();
        setCoinMarketData(data);
      } else {
        console.error('Error fetching market price', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching market price', error);
    } finally {
      setLoading(false);
    }
  }, [currency, category, order, priceChangePercentage, perPage]);

  useEffect(() => {
    fetchCoinMarket();
  }, [fetchCoinMarket]);

  return { coinMarketData, loading, refetchCoinMarket: fetchCoinMarket };
};

export default useCoinMarket;
