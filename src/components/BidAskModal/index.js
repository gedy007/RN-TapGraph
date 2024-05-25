import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {COLORS, images} from '../../constants';

const {height} = Dimensions.get('window');

const BidAskModal = ({isVisible, onClose}) => {
  const slideAnim = useRef(
    new Animated.Value(height),
  ).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none">
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                {translateY: slideAnim},
              ],
            },
          ]}>
          <Text style={styles.modalTitle}>
            Fitur Jual/Beli Akan Segera Hadir!
          </Text>
          <View style={{alignItems: 'center'}}>
            <Image
              source={images.jualBeliComingSoon}
              style={styles.jualBeliComingSoon}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              Close
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  jualBeliComingSoon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 300,
  },
});

export default BidAskModal;
