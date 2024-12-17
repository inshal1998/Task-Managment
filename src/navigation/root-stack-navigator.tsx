import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './navigation-types';
import TaskListScreen from '../screens/TaskLists/TaskList.screen';
import AddTask from '../screens/AddTask/AddTask.screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
          <Stack.Group
            screenOptions={({route}) => ({
              headerShown: false,
            })}>
            <Stack.Screen name="TaskLists" component={TaskListScreen} />
            <Stack.Screen name="AddTask" component={AddTask} />
          </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;