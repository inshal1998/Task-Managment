import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  AddTask,
  TaskLists,
} from '../screens';
import {RootStackParamList} from './navigation-types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
          <Stack.Group
            screenOptions={({route}) => ({
              headerShown: false,
            })}>
            <Stack.Screen name="AddTask" component={AddTask} />
            <Stack.Screen name="TaskLists" component={TaskLists} />
          </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;