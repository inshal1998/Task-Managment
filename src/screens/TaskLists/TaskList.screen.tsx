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
import { Colors } from '../../utils/constants';

const TaskListScreen: React.FC = () => {
  const {theme} = useSelector((state: RootState) => state.themeReducer);
  const containerStyle = [
    styles.container,
    {backgroundColor: theme === 'dark' ? Colors.dark_grey_121212 : Colors.white},
  ];

  const textStyle = {
    color: theme === 'dark' ? Colors.white :Colors.black,
  };

  const {
    currentPage,
    loadMoreTasks,
    loading,
    isFetching,
    onDelete,
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
      <Header title="Task Management" onBackPress={() => {}} />
      
      <TextInput
        style={[styles.searchBar, {borderColor: textStyle.color , color:textStyle.color}]}
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
    backgroundColor:Colors.white,
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
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
