import { useState, useEffect, useCallback } from 'react';

export const useUSDIDR = () => {
  const [usdIdrRate, setUsdIdrRate] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchRate = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://query1.finance.yahoo.com/v8/finance/chart/USDIDR=X'
      );
      const data = await response.json();
      const rate = data?.chart?.result[0]?.meta?.regularMarketPrice;
      if (rate) {
        setUsdIdrRate(rate);
      }
    } catch (error) {
      console.error('Error fetching USD to IDR rate:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  return { usdIdrRate, loading, refetchUsdIdrRate: fetchRate };
};
