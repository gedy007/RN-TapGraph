import { useRef, useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { getUSDIDR } from '../REST/getUSDIDR';
import axios from 'axios';

export const useOrderBookStream = symbol => {
  const { usdIdrRate } = getUSDIDR();

  const [orderBook, setOrderBook] = useState({
    bids: [],
    asks: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const clientRef = useRef(null);

  const startOrderBookStream = () => {
    if (clientRef.current) return;

    const client = new W3CWebSocket(
      `wss://fstream.binance.com/ws/${symbol}@depth20@500ms`
    );
    clientRef.current = client;

    client.onopen = () => {
      console.log('OrderBookStream Client Connected');
    };

    client.onclose = () => {
      console.log('OrderBookStream Client Disconnected');
      clientRef.current = null;
      setIsLoading(true);
    };

    client.onmessage = message => {
      const data = JSON.parse(message.data);
      const { b: bids, a: asks } = data;

      const sortedBids = bids.sort(
        (a, b) => parseFloat(b[0]) - parseFloat(a[0])
      );

      const convertedBids = sortedBids.map(bid => {
        const usdPrice = parseFloat(bid[0]);
        const idrPrice = (usdPrice * usdIdrRate).toFixed(0);
        const formattedPrice = idrPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return [formattedPrice, bid[1]];
      });

      const sortedAsks = asks.sort(
        (a, b) => parseFloat(a[0]) - parseFloat(b[0])
      );

      const convertedAsks = sortedAsks.map(ask => {
        const usdPrice = parseFloat(ask[0]);
        const idrPrice = (usdPrice * usdIdrRate).toFixed(0);
        const formattedPrice = idrPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return [formattedPrice, ask[1]];
      });

      setOrderBook({
        bids: convertedBids.slice(0, 6),
        asks: convertedAsks.slice(0, 6),
      }); // Limit data to 6 items
      setIsLoading(false);
    };

    client.onerror = error => {
      console.error('OrderBookStream Error:', error);
    };
  };

  const stopOrderBookStream = () => {
    if (clientRef.current) {
      clientRef.current.close();
      clientRef.current = null;
    }
  };

  return {
    orderBook,
    startOrderBookStream,
    stopOrderBookStream,
    isLoading,
  };
};

export const useCandlestickStream = symbol => {
  const { usdIdrRate } = getUSDIDR();
  const [candlestickData, setCandlestickData] = useState([]);
  const clientRef = useRef(null);

  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get(
        'https://api.binance.com/api/v3/klines',
        {
          params: {
            symbol: symbol.toUpperCase(),
            interval: '1m',
            limit: 15,
          },
        }
      );
      const historicalData = response.data.map(candle => ({
        timestamp: candle[0],
        open: parseFloat(candle[1] * usdIdrRate),
        high: parseFloat(candle[2] * usdIdrRate),
        low: parseFloat(candle[3] * usdIdrRate),
        close: parseFloat(candle[4] * usdIdrRate),
      }));
      setCandlestickData(historicalData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  const startCandlestickStream = () => {
    if (clientRef.current) return;

    const client = new W3CWebSocket(
      `wss://fstream.binance.com/ws/${symbol.toLowerCase()}@kline_1m`
    );
    clientRef.current = client;

    client.onopen = () => {
      console.log('CandlestickStream Client Connected');
    };

    client.onclose = () => {
      console.log('CandlestickStream Client Disconnected');
      clientRef.current = null;
    };

    client.onmessage = event => {
      const message = JSON.parse(event.data);
      const candlestick = message.k;

      const formattedCandlestick = {
        timestamp: candlestick.t,
        open: parseFloat(candlestick.o * usdIdrRate),
        high: parseFloat(candlestick.h * usdIdrRate),
        low: parseFloat(candlestick.l * usdIdrRate),
        close: parseFloat(candlestick.c * usdIdrRate),
        closed: candlestick.x,
      };

      setCandlestickData(prevData => {
        const existingIndex = prevData.findIndex(
          data => data.timestamp === formattedCandlestick.timestamp
        );

        if (existingIndex >= 0) {
          // Update the existing candlestick
          const newData = [...prevData];
          newData[existingIndex] = formattedCandlestick;
          return newData;
        } else {
          // Add new candlestick and remove the oldest if length exceeds 15
          const newData = [...prevData, formattedCandlestick].slice(-16);
          return newData;
        }
      });
    };

    client.onerror = error => {
      console.error('CandlestickStream error:', error);
    };
  };

  const stopCandlestickStream = () => {
    if (clientRef.current) {
      clientRef.current.close();
      clientRef.current = null;
    }
  };

  useEffect(() => {
    fetchHistoricalData();
    return () => {
      stopCandlestickStream();
    };
  }, [symbol]);

  return {
    candlestickData,
    startCandlestickStream,
    stopCandlestickStream,
  };
};
