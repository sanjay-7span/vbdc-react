import { configureStore } from "@reduxjs/toolkit";
import agencyReducer from './reducers/agencyReducer'
import messageReducer from "./reducers/messageReducer";
import zoneReducer from "./reducers/zoneReducer";
import profileReducer from "./reducers/profileReducer";

export default configureStore({
  reducer: {
    agency:agencyReducer,
    error:messageReducer,
    zone:zoneReducer,
    profile:profileReducer
  },
});