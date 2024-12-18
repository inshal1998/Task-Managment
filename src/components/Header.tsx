import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { useThemeColors } from '../hooks/useThemeColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { toggleTheme } from '../store/theme-slice';

interface HeaderProps {
  title: string;
  onBackPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const colors = useThemeColors();

  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color={colors.text} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
          <Icon
            name={theme === 'light' ? 'weather-sunny' : 'moon-waning-crescent'}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    elevation: 4,
    marginBottom:20
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    flex: 1,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 12,
  },
});
