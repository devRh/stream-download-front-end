import { SUCCESS_FETCH_TAXI_TRIP, FAILED_FETCH_TAXI_TRIP } from './types';
import axios from 'axios';

const apiUrl = 'https://stream-download-back-end.herokuapp.com/taxiTrips';


export const fetchTaxiTrips = (taxiTrips) => {
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
            console.log('')
        })
        .catch(err => {
          dispatch({
            type: FAILED_FETCH_TAXI_TRIP,
            payload:{'error':err}
          })
        });
    };
  };