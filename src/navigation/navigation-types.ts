import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import { Task } from '../store/task-Slice';

export type RootStackParamList = {
  AddTask: undefined;
  TaskLists: undefined;
  UpdateTask: {task:Task};
};

export type StackNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;

export type StackRouteProps = RouteProp<RootStackParamList>;
