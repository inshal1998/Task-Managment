import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTaskList} from './TaskList.hook';

const TaskList = () => {
  const {} = useTaskList();
  return (
    <View>
      <Text>TaskList</Text>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({});
