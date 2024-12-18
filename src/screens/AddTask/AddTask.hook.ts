import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../store/task-Slice';
import { AppDispatch } from '../../store/store';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/navigation-types';

export const useAddTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setisLoading] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [status, setStatus] = useState<'Pending' | 'In Progress' | 'Completed'>('Pending');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  const [openPriority, setOpenPriority] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const priorityItems = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];

  const statusItems = [
    { label: 'Pending', value: 'Pending' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
  ];

  const toggleDatePicker = () => setDatePickerVisible(!isDatePickerVisible);

  const isValid = () => {
    if (!name) return false;
    return true;
  };

  const handleSave = () => {
    if (!isValid()) {
      Alert.alert('Please fill in all required fields');
      return;
    }
    setisLoading(true)
    const task = {
      name,
      desc,
      priority,
      status,
      dueDate: new Date().toISOString() || '',
    };

    dispatch(createTask(task));
    setName('')
    setDesc('')
    setPriority('Low')
    setStatus('Pending')
    setisLoading(false)
    navigation.goBack()
  };

  return {
    name,
    desc,
    priority,
    status,
    dueDate,
    isDatePickerVisible,
    openPriority,
    openStatus,
    priorityItems,
    statusItems,
    setName,
    setDesc,
    setPriority,
    setStatus,
    setDueDate,
    toggleDatePicker,
    handleSave,
    setOpenPriority,
    setOpenStatus,
    isLoading
  };
};
