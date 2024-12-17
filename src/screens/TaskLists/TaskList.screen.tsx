import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useTaskList} from './TaskList.hook';
import {TaskListItem} from '../../components/TaskListItem';
import {FloatingButton, Header} from '../../components';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const TaskListScreen: React.FC = () => {
  const {theme} = useSelector((state: RootState) => state.themeReducer);
  const containerStyle = [
    styles.container,
    {backgroundColor: theme === 'dark' ? '#121212' : '#ffffff'},
  ];

  const textStyle = {
    color: theme === 'dark' ? '#ffffff' : '#000000',
  };

  const {
    tasks,
    currentPage,
    loadMoreTasks,
    loading,
    isFetching,
    onComplete,
    onDelete,
    navigation,
    onAddPress,
    onFilterPress,
  } = useTaskList();

  return (
    <View style={containerStyle}>
      <Header title="Task Management" onBackPress={() => navigation.goBack()} />
      {loading && currentPage === 1 && <ActivityIndicator size="large" />}
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        renderItem={({item}) => (
          <TaskListItem
            task={item}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        )}
        onEndReached={loadMoreTasks}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="small" color="gray" /> : null
        }
        ListEmptyComponent={() => (
          <Text style={[styles.emptyText, textStyle]}>No tasks available.</Text>
        )}
      />
      <FloatingButton onFilterPress={onFilterPress} onAddPress={onAddPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  noMoreTasks: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default TaskListScreen;
