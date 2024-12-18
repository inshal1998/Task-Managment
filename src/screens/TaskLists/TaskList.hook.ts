import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTasks, setFilteredTasks, sortTasksByDate } from '../../store/task-Slice';
import { RootState, AppDispatch } from '../../store/store';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/navigation-types';

export const useTaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tasks, currentPage, totalPages, loading, error, filteredTasks } = useSelector(
    (state: RootState) => state.tasks
  );

  const [hasMoreTasks, setHasMoreTasks] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  useEffect(() => {
    if (searchQuery) {
      const filtered = tasks.filter(task =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      dispatch(setFilteredTasks(filtered));
    } else {
      dispatch(setFilteredTasks(tasks));
    }
  }, [searchQuery, tasks, dispatch]);

  const onComplete = (taskId: string) => {
    // Handle task completion
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
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSortTasks = () => {
    dispatch(sortTasksByDate()); 
    onModalClose();
  };

  const onClearFilter = () => {
    dispatch(setFilteredTasks(tasks));
    onModalClose();
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
    filteredTasks,
    setSearchQuery,
    isModalVisible,
    onModalClose,
    onSortTasks,
    onClearFilter,
  };
};
