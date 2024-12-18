import React, { useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  TextInput,
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
    filteredTasks,
    setSearchQuery
  } = useTaskList();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={containerStyle}>
      <Header title="Task Management" onBackPress={() => navigation.goBack()} />
      
      <TextInput
        style={[styles.searchBar, {borderColor: textStyle.color}]}
        placeholder="Search tasks by name"
        placeholderTextColor={textStyle.color}
        onChangeText={handleSearch}
      />

      {loading && currentPage === 1 && <ActivityIndicator size="large" />}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        renderItem={({item}) => (
          <TaskListItem task={item} onDelete={onDelete} />
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
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color:"#000"
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
