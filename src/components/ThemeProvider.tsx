import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useThemeColors} from '../hooks/useThemeColors';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const colors = useThemeColors();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThemeProvider;
