import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './navigation/NavigationStack';
import { AuthProvider } from './context/AuthContext';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </AuthProvider>
  );
};
