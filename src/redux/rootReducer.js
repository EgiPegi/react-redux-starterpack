import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
 
//import reducer
import counterReducer from "./Counter/counter.reducer";
import authReducer from "./Auth/auth.reducer";
import messageReducer from "./Message/message.reducer";
import counterPersistReducer from "./CounterPersist/counterPersist.reducer";
 
//persistConfig 
const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['counterPersist']//reducer yang diaktifkan persistnya --> persist otomatis masuk ke localStorage
}

//Reducer di combine
const rootReducer = combineReducers({
  counter: counterReducer,
  counterPersist: counterPersistReducer,
  auth: authReducer,
  message: messageReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
