import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Task} from '../../src/store/task-slice';
import {Colors} from '../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TaskListItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onDelete,
  onComplete,
}) => {
  const setColor = () => {
    let backgroundColor: string;
    let borderColor: string;

    switch (task.priority) {
      case 'High':
        backgroundColor = Colors.light_red;
        borderColor = Colors.dark_red;
        break;
      case 'Low':
        backgroundColor = Colors.light_green;
        borderColor = Colors.dark_green;
        break;
      case 'Medium':
        backgroundColor = Colors.light_yellow;
        borderColor = Colors.dark_yellow;
        break;
      default:
        backgroundColor = '#f0f0f0';
        borderColor = '#d0d0d0';
        break;
    }

    return {borderColor, backgroundColor};
  };

  return (
    <SwipeListView
      data={[task]}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={[styles.item, setColor()]}>
          <Text style={styles.taskName}>{item.name}</Text>
          <Text>{item.desc}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
        </View>
      )}
      renderHiddenItem={({ item }) => (
        <View style={styles.hiddenItem}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(item._id)}>
            <Ionicons name="trash" size={25} color="white" />
          </TouchableOpacity>
        </View>
      )}
      leftOpenValue={75}
      rightOpenValue={-75} 
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderLeftWidth: 10,
  },
  taskName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  hiddenItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight:10,
    alignItems: 'center',
    height: "100%",
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    alignSelf:'center',
    height:50,
    borderRadius:100
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
