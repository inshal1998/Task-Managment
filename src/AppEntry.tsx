import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import RootStackNavigator from './navigation/root-stack-navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from './store/store';
import {useThemeColors} from './hooks/useThemeColors';

const AppEntry: React.FC = () => {
  const colors = useThemeColors();
  const theme = useSelector((state: RootState) => state.themeReducer.theme);

  const barStyle = theme === 'light' ? 'dark-content' : 'light-content';

  return (
    <SafeAreaView
      style={[styles.safeAreaViewStyle, {backgroundColor: colors.background}]}>
      <GestureHandlerRootView style={styles.safeAreaViewStyle}>
        <StatusBar backgroundColor={colors.background} barStyle={barStyle} />
        <RootStackNavigator />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default AppEntry;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
  },
});
