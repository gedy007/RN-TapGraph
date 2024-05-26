import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCoinMarket = createAsyncThunk(
  'market/getCoinMarket',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&category=smart-contract-platform&order=market_cap_rank&per_page=15&page=1&sparkline=true&price_change_percentage=24h%2C7d'
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  coins: [],
  selectedCoin: null,
  error: null,
  loading: false,
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCoinMarket.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoinMarket.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(getCoinMarket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCoin } = marketSlice.actions;
export default marketSlice.reducer;
