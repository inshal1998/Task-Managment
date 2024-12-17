import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DEFAULT_API_CONFIG } from '../utils/api-config';
import { Alert } from 'react-native';

type Priority = 'High' | 'Medium' | 'Low';
type Status = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  _id: string;
  name: string;
  desc: string;
  priority: Priority;
  status: Status;
  dueDate: string;
}

export interface TaskState {
  tasks: Task[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (page: number, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${DEFAULT_API_CONFIG.base_url}/get?page=${page}&limit=10`,
      );
      const {data, total, limit} = response.data;
      const totalPages = Math.ceil(total / limit);
      return {
        data,
        totalPages,
        currentPage: page,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);



export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${DEFAULT_API_CONFIG.base_url}/delete/${taskId}`);
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const markComplete = createAsyncThunk(
  'tasks/markComplete',
  async (taskId: string, { rejectWithValue }) => {
    try {
      await axios.patch(`${DEFAULT_API_CONFIG.base_url}/tasks/${taskId}`, {
        status: 'Completed',
      });
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${DEFAULT_API_CONFIG.base_url}/create`,
        task
      );
      console.log(JSON.stringify(response.data , undefined ,4) , "Response")
      return response.status;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = [...state.tasks, ...action.payload.data]; 
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
            })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })

      .addCase(markComplete.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t._id === action.payload);
        if (task) {
          task.status = 'Completed';
        }
      })

      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
