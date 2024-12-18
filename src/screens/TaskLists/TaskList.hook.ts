import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTasks } from '../../store/task-Slice'; 
import { RootState, AppDispatch } from '../../store/store'; 
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/navigation-types';

export const useTaskList = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tasks, currentPage, totalPages, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  const [hasMoreTasks, setHasMoreTasks] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const loadMoreTasks = () => {
    if (currentPage < totalPages && !isFetching) {
      setIsFetching(true);
      dispatch(fetchTasks(currentPage + 1))
        .finally(() => setIsFetching(false));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsFetching(true);
      dispatch(fetchTasks(currentPage))
        .finally(() => setIsFetching(false));
    }, [currentPage, dispatch])
  );

  useEffect(() => {
    if (currentPage === 1) {
      setIsFetching(true);
      dispatch(fetchTasks(1))
        .finally(() => setIsFetching(false));
    }
  }, [currentPage, dispatch]);

  const onComplete = (taskId: string) => {
  };

  const onDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  useEffect(() => {
    if (currentPage >= totalPages) {
      setHasMoreTasks(false);
    }
  }, [currentPage, totalPages]);

  const onFilterPress = () => {
    console.log('Filter pressed');
  };

  const onAddPress = () => {
    console.log('Add pressed');
    navigation.navigate('AddTask');
  };

  return {
    tasks,
    currentPage,
    loadMoreTasks,
    loading,
    isFetching,
    onComplete,
    onDelete,
    hasMoreTasks,
    error,
    navigation,
    onFilterPress,
    onAddPress,
  };
};

