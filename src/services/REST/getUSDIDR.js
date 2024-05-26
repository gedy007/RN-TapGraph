import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUSDIDR = () => {
  const [usdIdrRate, setUsdIdrRate] = useState(16000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const savedRate = await AsyncStorage.getItem('usdIdrRate');
        if (savedRate) {
          setUsdIdrRate(parseFloat(savedRate));
          setLoading(false);
        } else {
          const response = await fetch(
            'https://query1.finance.yahoo.com/v8/finance/chart/USDIDR=X'
          );
          const data = await response.json();
          const rate = data?.chart?.result[0]?.meta?.regularMarketPrice;
          if (rate) {
            setUsdIdrRate(rate);
            await AsyncStorage.setItem('usdIdrRate', String(rate));
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching USD to IDR rate:', error);
        setLoading(false);
      }
    };

    fetchRate();
  }, []);

  return { usdIdrRate, loading };
};
