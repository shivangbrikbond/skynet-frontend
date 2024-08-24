import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  search: [],
  sector: '',
  expirence: '',
  jobtitle: '',
  status: 'idle',
  error: null,
  message: ''
};

const baseUrl = process.env.REACT_APP_API_URL

export const featchSearch = createAsyncThunk('search/featchSearch', async (name, { getState, dispatch }) => {
  console.log("ok")
  const sector = getState().search.sector;
  const experience = getState().search.expirence;

  const user_id = localStorage.getItem('skyn_userId')



  const response = await axios.get(`${baseUrl}/get/filter/${user_id}?name=${name}&sector=${sector}&experience=${experience}&jobTitle`, {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
      'Content-Type': 'application/json'
    }
  })
  //console.log(response.data.body)
  return response.data;
});


const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSector: (state, action) => {
      if (action.payload === "all") {
        state.sector = '';
        console.log(state.sector)
      } else {
        state.sector = action.payload;
      }

    },

    setexpirence: (state, action) => {
      if (action.payload === "any") {
        console.log("any")
        state.expirence = '';
        console.log(state.expirence)
      } else {
        state.expirence = action.payload;
        console.log(state.expirence)
      }
    }
  },
  extraReducers: (builder) => {

    builder


      // Fetch posts cases
      .addCase(featchSearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(featchSearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.search = action.payload.body;
      })
      .addCase(featchSearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

  }
});

export const { setSector, setexpirence } = searchSlice.actions;
export default searchSlice.reducer;