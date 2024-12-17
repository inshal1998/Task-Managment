import {combineReducers} from '@reduxjs/toolkit';
import themeReducer from './theme-slice';
import taskReducer from './task-Slice';

const rootReducer = combineReducers({
    themeReducer,
    tasks: taskReducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;
export default rootReducer;