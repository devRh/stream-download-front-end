import { SUCCESS_FETCH_TAXI_TRIP, FAILED_FETCH_TAXI_TRIP } from './types';
import axios from 'axios';

const apiUrl = 'https://stream-download-back-end.herokuapp.com/taxiTrips';
//const apiUrl = 'http://localhost:5555/taxiTrips';


const fetchTaxiTrips = (taxiTrips) => {
  return {
    type: SUCCESS_FETCH_TAXI_TRIP,
    taxiTrips
  }
};



export const fetchAllTaxiTrip = (page, sizePerPage) => {
  return (dispatch) => {
    axios.get(apiUrl, {
      params: { pageNo: page, size: sizePerPage }
    })
      .then(response => {
        dispatch(fetchTaxiTrips(response.data))
      })
      .catch(err => {
        dispatch({
          type: FAILED_FETCH_TAXI_TRIP,
          payload: { 'error': err }
        })
      });
  };
};