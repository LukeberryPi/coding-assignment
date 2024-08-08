import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import favoriteMoviesReducer from "../modules/favoriteMovies/favoriteMoviesSlice";
import popularMoviesReducer from "../modules/popularMovies/popularMoviesSlice";
import watchLaterMoviesReducer from "../modules/watchLaterMovies/watchLaterMoviesSlice";
import searchMoviesReducer from "../modules/searchMovies/searchMoviesSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["searchedMovies"],
};

const rootReducer = combineReducers({
  popularMovies: popularMoviesReducer,
  favoriteMovies: favoriteMoviesReducer,
  watchLaterMovies: watchLaterMoviesReducer,
  searchedMovies: searchMoviesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);

export default store;
