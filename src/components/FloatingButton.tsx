import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface FloatingButtonProps {
  onFilterPress: () => void;
  onAddPress: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onFilterPress, onAddPress }) => {
  const { theme } = useSelector((state: RootState) => state.themeReducer);

  const buttonBackgroundColor = theme === 'dark' ? '#333' : '#007bff';

  return (
    <View style={[styles.container, { backgroundColor: buttonBackgroundColor }]}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onFilterPress}
      >
        <MaterialCommunityIcons name="filter" size={24} color="#fff" />
      </TouchableOpacity>
      
      <View style={styles.divider} />
      
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onAddPress}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: '66%',
    transform: [{ translateX: -120 }],
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
});

export default FloatingButton;
