import React, { useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useTaskList } from './TaskList.hook';
import { TaskListItem } from '../../components/TaskListItem';
import { FloatingButton, Header } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Colors } from '../../utils/constants';
import Modal from 'react-native-modal';

const TaskListScreen: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  const containerStyle = [
    styles.container,
    { backgroundColor: theme === 'dark' ? Colors.dark_grey_121212 : Colors.white },
  ];

  const textStyle = {
    color: theme === 'dark' ? Colors.white : Colors.black,
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
    setSearchQuery,
    onSortTasks,
    isModalVisible,
    onModalClose,
    onClearFilter,
  } = useTaskList();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={containerStyle}>
      <Header title="Task Management" onBackPress={() => {}} />

      <TextInput
        style={[styles.searchBar, { borderColor: textStyle.color, color: textStyle.color }]}
        placeholder="Search tasks by name"
        placeholderTextColor={textStyle.color}
        onChangeText={handleSearch}
      />

      {loading && currentPage === 1 && <ActivityIndicator size="large" />}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        renderItem={({ item }) => (
          <TaskListItem task={item} onDelete={onDelete} />
        )}
        onEndReached={loadMoreTasks}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching && currentPage > 1 ? <ActivityIndicator size="small" color="gray" /> : null}
        ListEmptyComponent={() => (
          <Text style={[styles.emptyText, textStyle]}>No tasks available.</Text>
        )}
      />
      <FloatingButton onFilterPress={onFilterPress} onAddPress={onAddPress} />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={onModalClose}
        onBackButtonPress={onModalClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{
          justifyContent:'flex-end'
        }}
      >
        <View style={[styles.modalContent , { backgroundColor: theme === 'dark' ? Colors.dark_grey_121212 : Colors.white },]}>
          <Text style={styles.modalTitle}>Filter Tasks</Text>
          <View style={styles.modalButtons}>
            <Text style={styles.modalButton} onPress={() => onSortTasks()}>
              Sort by Date (Old to New)
            </Text>
            <Text style={styles.modalButton} onPress={onClearFilter}>
              Clear Filter
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    fontFamily: 'Poppins-Regular',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalButton: {
    fontSize: 16,
    color: Colors.blue_007bff,
    paddingVertical: 10,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});

export default TaskListScreen;
