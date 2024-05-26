import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorageMiddleware = store => next => action => {
  const result = next(action);
  const { selectedCoin } = store.getState().marketReducer;

  if (selectedCoin) {
    AsyncStorage.setItem('selectedCoin', JSON.stringify(selectedCoin))
      .then(() =>
        console.log(
          'Selected coin saved to AsyncStorage:',
          JSON.stringify(selectedCoin.symbol)
        )
      )
      .catch(error => console.error('Error saving selected coin:', error));
  } else {
    AsyncStorage.removeItem('selectedCoin')
      .then(() => console.log('Selected coin removed from AsyncStorage'))
      .catch(error => console.error('Error removing selected coin:', error));
  }

  return result;
};

export default asyncStorageMiddleware;
