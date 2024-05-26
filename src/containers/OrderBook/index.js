import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MainLayout from '../../components/MainLayout';
import { useFocusEffect } from '@react-navigation/native';
import { useOrderBookStream } from '../../services/useWebSocket';
import Loading from '../../components/Loading';
import BidAskModal from '../../components/BidAskModal';
import CandleChart from '../../components/CandleChart';
import { styles } from './components';

export default OrderBook = () => {
  const { selectedCoin } = useSelector(state => state.market);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const symbol = !selectedCoin ? 'ethusdt' : `${selectedCoin?.symbol}usdt`;

  const {
    orderBook: { bids, asks },
    startOrderBookStream,
    stopOrderBookStream,
    isLoading,
  } = useOrderBookStream(symbol);

  useFocusEffect(
    useCallback(() => {
      startOrderBookStream();
      return () => stopOrderBookStream();
    }, [symbol])
  );

  const renderItem = useCallback(
    ({ item, type }) => (
      <View style={[styles.row, type === 'ask' ? styles.ask : styles.bid]}>
        <Text style={styles.price}>{item[0]}</Text>
        <Text style={styles.volume}>{item[1]}</Text>
      </View>
    ),
    []
  );

  const renderAskItem = useCallback(
    ({ item }) => renderItem({ item, type: 'ask' }),
    [renderItem]
  );
  const renderBidItem = useCallback(
    ({ item }) => renderItem({ item, type: 'bid' }),
    [renderItem]
  );

  const keyExtractor = useCallback((item, index) => `${item[0]}-${index}`, []);

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
          <CandleChart symbol={symbol} />
          <View style={styles.bookContainer}>
            <View style={styles.orderList}>
              <Text style={styles.sectionHeader}>Market Jual</Text>
              <FlatList
                data={asks}
                renderItem={renderAskItem}
                keyExtractor={keyExtractor}
                removeClippedSubviews={true}
                initialNumToRender={20}
                maxToRenderPerBatch={10}
                windowSize={10}
                ListHeaderComponent={flatListHeader}
                scrollEnabled={false}
              />
            </View>
            <View style={styles.orderList}>
              <Text style={styles.sectionHeader}>Market Beli</Text>
              <FlatList
                data={bids}
                renderItem={renderBidItem}
                keyExtractor={keyExtractor}
                removeClippedSubviews={true}
                initialNumToRender={20}
                maxToRenderPerBatch={10}
                windowSize={10}
                ListHeaderComponent={flatListHeader}
                scrollEnabled={false}
                flexGrow={1}
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
