// hooks/useThemeColors.ts
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useThemeColors = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);

  return {
    background: theme === 'light' ? '#FFFFFF' : '#121212', 
    text: theme === 'light' ? '#000000' : '#FFFFFF',
  };
};
