import {useSelector} from 'react-redux';
import {lightColors, darkColors} from '../utils/constants';
import {RootState} from '../store/store';

export const useThemeColors = () => {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);

  return theme === 'light' ? lightColors : darkColors;
};
