import { SUCCESS_FETCH_TAXI_TRIP, FAILED_FETCH_TAXI_TRIP } from '../actions/types';

const initialState = {'data':[],'count':null}

export default (state = initialState, action) => {
    switch (action.type) {
     case SUCCESS_FETCH_TAXI_TRIP:
      return action.taxiTrips;
     case FAILED_FETCH_TAXI_TRIP:
      return state; 
     default:
      return state
    }
   }