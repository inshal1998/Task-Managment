import {createSlice, createAsyncThunk,PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {DEFAULT_API_CONFIG} from '../utils/api-config';
import {Alert} from 'react-native';

export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Pending' | 'In Progress' | 'Completed';

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
  selectedTask: Task | null;
  filteredTasks: any[];
}

const initialState: TaskState = {
  tasks: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  selectedTask: null,
  filteredTasks: [],
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
  async (taskId: string, {rejectWithValue}) => {
    try {
      await axios.delete(`${DEFAULT_API_CONFIG.base_url}/delete/${taskId}`);
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: any, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${DEFAULT_API_CONFIG.base_url}/create`,
        task,
      );
      console.log(JSON.stringify(response.data, undefined, 4), 'Response');
      return response.status;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTaskById = createAsyncThunk(
  'tasks/getTaskById',
  async (taskId: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${DEFAULT_API_CONFIG.base_url}/tasks/${taskId}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    { id, updatedFields }: { id: string; updatedFields: Task },
    { rejectWithValue },
  ) => {
    try {
      console.log(
        JSON.stringify({ id, updatedFields }, undefined, 4),
        'Slice Record',
      );
      const response = await axios.put(
        `${DEFAULT_API_CONFIG.base_url}/update/${id}`,
        updatedFields,
      );

      console.log(
        JSON.stringify(response, undefined, 4),
        'Response',
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  },
);


const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<any[]>) {
      state.tasks = action.payload;
    },
    setFilteredTasks(state, action: PayloadAction<any[]>) {
      state.filteredTasks = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
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
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })

      .addCase(createTask.pending, state => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getTaskById.pending, state => {
        state.loading = true;
        state.selectedTask = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
        state.loading = false;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(updateTask.pending, state => {
        state.loading = true;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTasks, setFilteredTasks, setLoading, setError, setCurrentPage, setTotalPages } = taskSlice.actions;

export default taskSlice.reducer;
