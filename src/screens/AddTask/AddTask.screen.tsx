import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAddTask} from './AddTask.hook';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {Colors} from '../../utils/constants';

const AddTaskScreen = () => {
  const {
    name,
    desc,
    priority,
    status,
    openPriority,
    openStatus,
    priorityItems,
    statusItems,
    setName,
    setDesc,
    setPriority,
    setStatus,
    handleSave,
    setOpenPriority,
    setOpenStatus,
  } = useAddTask();

  const {theme} = useSelector((state: RootState) => state.themeReducer);

  const handleSaveTask = () => {
    handleSave();
  };

  const backgroundColor = theme === 'dark' ? Colors.grey_333 : Colors.white;
  const textColor = theme === 'dark' ? Colors.white : Colors.black;
  const buttonColor = theme === 'dark' ? Colors.purple : Colors.blue_007bff;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>Add New Task</Text>

      <TextInput
        style={[styles.input, {borderColor: textColor, color: textColor}]}
        placeholder="Task Name"
        placeholderTextColor={
          theme === 'dark' ? Colors.grey_ccc : Colors.grey_888
        }
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, {borderColor: textColor, color: textColor}]}
        placeholder="Task Description"
        placeholderTextColor={
          theme === 'dark' ? Colors.grey_ccc : Colors.grey_888
        }
        value={desc}
        onChangeText={setDesc}
      />

      <DropDownPicker
        open={openPriority}
        value={priority}
        items={priorityItems}
        setOpen={setOpenPriority}
        setValue={setPriority}
        setItems={() => {}}
        placeholder="Select Priority"
        containerStyle={styles.dropdownContainer}
        onChangeValue={(value: any) => setPriority(value)}
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
        value={status}
        items={statusItems}
        setOpen={setOpenStatus}
        setValue={setStatus}
        setItems={() => {}}
        placeholder="Select Status"
        containerStyle={styles.dropdownContainer}
        onChangeValue={(value: any) => setStatus(value)}
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

      <Button title="Save Task" onPress={handleSaveTask} color={buttonColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 4,
  },
  dropdownContainer: {
    marginBottom: 20,
    zIndex: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
  },
  dropdownList: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey_333,
    borderWidth: 1,
    marginTop: 5,
  },
});

export default AddTaskScreen;
