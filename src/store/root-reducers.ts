import {combineReducers} from '@reduxjs/toolkit';
import themeReducer from './theme-slice';


const rootReducer = combineReducers({
    themeReducer
});

export type RootReducerState = ReturnType<typeof rootReducer>;
export default rootReducer;