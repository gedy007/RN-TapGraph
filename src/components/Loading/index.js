import { View, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color={COLORS.lightGray3} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
