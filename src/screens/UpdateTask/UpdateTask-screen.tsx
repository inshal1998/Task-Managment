import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import {useUpdateTask} from './UpdateTask.hook';
import {RootState} from '../../store/store';
import {Colors} from '../../utils/constants';

const UpdateTaskScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {theme} = useSelector((state: RootState) => state.themeReducer);

  const {task} = route.params as {task: any};
  const {taskDetails, setTaskDetails, updateTaskDetails, loading} =
    useUpdateTask(task);

  const [openPriority, setOpenPriority] = useState(false);
  const [priorityItems] = useState([
    {label: 'High', value: 'High'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Low', value: 'Low'},
  ]);

  const [openStatus, setOpenStatus] = useState(false);
  const [statusItems] = useState([
    {label: 'Pending', value: 'Pending'},
    {label: 'In Progress', value: 'In Progress'},
    {label: 'Completed', value: 'Completed'},
  ]);

  const textColor = theme === 'dark' ? Colors.white : Colors.black;
  const containerStyle = [
    styles.container,
    {
      backgroundColor:
        theme === 'dark' ? Colors.dark_grey_121212 : Colors.white,
    },
  ];

  return (
    <View style={containerStyle}>
      <Text style={[styles.header, {color: textColor}]}>Update Task</Text>

      <TextInput
        style={[styles.input, {borderColor: textColor, color: textColor}]}
        placeholder="Task Name"
        placeholderTextColor={textColor}
        value={taskDetails.name}
        onChangeText={text => setTaskDetails({...taskDetails, name: text})}
      />

      <TextInput
        style={[styles.input, {borderColor: textColor, color: textColor}]}
        placeholder="Description"
        placeholderTextColor={textColor}
        value={taskDetails.desc}
        onChangeText={text => setTaskDetails({...taskDetails, desc: text})}
        multiline
      />

      <DropDownPicker
        open={openPriority}
        value={taskDetails.priority}
        items={priorityItems}
        setOpen={setOpenPriority}
        setValue={value =>
          setTaskDetails({...taskDetails, priority: value as any})
        }
        placeholder="Select Priority"
        containerStyle={styles.dropdownContainer}
        style={[
          styles.dropdown,
          {
            borderColor: textColor,
            backgroundColor: theme === 'dark' ? Colors.grey_444 : Colors.white,
          },
        ]}
        dropDownContainerStyle={[
          styles.dropdownList,
          {backgroundColor: theme === 'dark' ? Colors.grey_444 : Colors.white},
        ]}
        zIndex={1000}
      />

      <DropDownPicker
        open={openStatus}
        value={taskDetails.status}
        items={statusItems}
        setOpen={setOpenStatus}
        setValue={value =>
          setTaskDetails({...taskDetails, status: value as any})
        }
        placeholder="Select Status"
        containerStyle={styles.dropdownContainer}
        style={[
          styles.dropdown,
          {
            borderColor: textColor,
            backgroundColor: theme === 'dark' ? Colors.grey_444 : Colors.white,
          },
        ]}
        dropDownContainerStyle={[
          styles.dropdownList,
          {backgroundColor: theme === 'dark' ? Colors.grey_444 : Colors.white},
        ]}
        zIndex={999}
      />

      <TextInput
        style={[styles.input, {borderColor: textColor, color: textColor}]}
        placeholder="Due Date"
        editable={false}
        placeholderTextColor={textColor}
        value={new Date(taskDetails.dueDate).toLocaleDateString()}
        onChangeText={text => setTaskDetails({...taskDetails, dueDate: text})}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button
          title="Save Changes"
          onPress={() => {
            updateTaskDetails();
            navigation.goBack();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownList: {
    borderWidth: 1,
  },
});

export default UpdateTaskScreen;
