import { useCallback, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MainLayout from '../MainLayout';
import { useFocusEffect } from '@react-navigation/native';
import { useOrderBookStream } from '../../services/useWebSocket';
import BidAskModal from '../../components/BidAskModal';
import CandleChart from '../../components/CandleChart';
import { styles } from './components';

const OrderBook = ({ symbol = 'bnbusdt' }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const {
    orderBook: { bids, asks },
    startOrderBookStream,
    stopOrderBookStream,
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

  const keyExtractor = useCallback((item, index) => `${item[0]}-${index}`, []);

  const flatListHeader = () => (
    <View style={styles.flatListHeaderRow}>
      <Text style={styles.flatListHeaderText}>Harga</Text>
      <Text style={styles.flatListHeaderText}>Vol</Text>
    </View>
  );

  const handlePress = type => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = value => {
    console.log(`${modalType} value:`, value);
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.header}>Order Book ({symbol.toUpperCase()})</Text>
        <CandleChart symbol={symbol} />
        <View style={styles.bookContainer}>
          <View style={styles.orderList}>
            <Text style={styles.sectionHeader}>Market Jual</Text>
            <View style={styles.asks}>
              <FlatList
                data={asks}
                renderItem={({ item }) => renderItem({ item, type: 'ask' })}
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
          <View style={styles.orderList}>
            <Text style={styles.sectionHeader}>Market Beli</Text>
            <FlatList
              data={bids}
              renderItem={({ item }) => renderItem({ item, type: 'bid' })}
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
      <BidAskModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        type={modalType}
      />
    </MainLayout>
  );
};

export default OrderBook;
