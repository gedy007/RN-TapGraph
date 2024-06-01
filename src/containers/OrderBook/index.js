import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import MainLayout from '../../components/MainLayout';
import { useOrderBookStream } from '../../services/useWebSocket';
import Loading from '../../components/Loading';
import BidAskModal from '../../components/BidAskModal';
import CandleChart from '../../components/CandleChart';
import { useUSDIDR } from '../../services/rest/useUSDIDR';
import { styles } from './components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default OrderBook = () => {
  const isFocused = useIsFocused();
  const { usdIdrRate } = useUSDIDR();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');
  const [symbol, setSymbol] = useState('ethusdt');
  const [isCoinRetrieved, setIsCoinRetrieved] = useState(false);

  const {
    orderBook: { bids, asks },
    startOrderBookStream,
    stopOrderBookStream,
    isLoading,
  } = useOrderBookStream(symbol, usdIdrRate);

  useEffect(() => {
    const initialize = async () => {
      setIsCoinRetrieved(false);
      await handleSelectedCoin();
    };

    if (isFocused) {
      initialize();
    }

    return () => {
      stopOrderBookStream();
      setIsCoinRetrieved(false);
    };
  }, [isFocused]);

  useEffect(() => {
    if (isCoinRetrieved && usdIdrRate) {
      startOrderBookStream();
    }
  }, [isCoinRetrieved, symbol, usdIdrRate]);

  const handleSelectedCoin = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('selectedCoin');
      if (jsonValue !== null) {
        const parsedCoin = JSON.parse(jsonValue);
        setSelectedCoin(parsedCoin);
        setSymbol(`${parsedCoin.symbol}usdt`);
      } else {
        setSelectedCoin(null);
        setSymbol('ethusdt');
      }
      setIsCoinRetrieved(true);
    } catch (e) {
      console.error(e);
    }
  };

  const renderItem = ({ item, type }) => (
    <View style={[styles.row, type === 'ask' ? styles.ask : styles.bid]}>
      <Text style={styles.price}>{item[0]}</Text>
      <Text style={styles.volume}>{item[1]}</Text>
    </View>
  );

  const renderAskItem = ({ item }) => renderItem({ item, type: 'ask' });
  const renderBidItem = ({ item }) => renderItem({ item, type: 'bid' });

  const keyExtractor = (item, index) => `${item[0]}-${index}`;

  const flatListHeader = () => (
    <View style={styles.flatListHeaderRow}>
      <Text style={styles.flatListHeaderTextPrice}>Harga</Text>
      <Text style={styles.flatListHeaderTextVol}>Vol</Text>
    </View>
  );

  const handlePress = type => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <MainLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>
            Order Book (
            {!selectedCoin ? 'ETH' : selectedCoin?.symbol.toUpperCase()})
          </Text>
          <CandleChart symbol={symbol} usdIdrRate={usdIdrRate} />
          <View style={styles.bookContainer}>
            <View style={styles.orderList}>
              <Text style={styles.sectionHeader}>Market Jual</Text>
              <FlatList
                key={`${symbol}-asks`}
                data={asks}
                renderItem={renderAskItem}
                keyExtractor={keyExtractor}
                removeClippedSubviews={true}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={10}
                ListHeaderComponent={flatListHeader}
                scrollEnabled={false}
              />
            </View>
            <View style={styles.orderList}>
              <Text style={styles.sectionHeader}>Market Beli</Text>
              <FlatList
                key={`${symbol}-bids`}
                data={bids}
                renderItem={renderBidItem}
                keyExtractor={keyExtractor}
                removeClippedSubviews={true}
                initialNumToRender={20}
                maxToRenderPerBatch={10}
                windowSize={10}
                ListHeaderComponent={flatListHeader}
                scrollEnabled={false}
              />
            </View>
          </View>
          <View style={styles.rowButton}>
            <TouchableOpacity
              style={styles.buttonAsk}
              onPress={() => handlePress('Ask')}
            >
              <Text style={styles.buttonText}>JUAL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonBid}
              onPress={() => handlePress('Bid')}
            >
              <Text style={styles.buttonText}>BELI</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <BidAskModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={() => {}}
        type={modalType}
      />
    </MainLayout>
  );
};
