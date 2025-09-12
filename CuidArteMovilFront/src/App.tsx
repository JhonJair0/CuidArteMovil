import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './navigation/NavigationStack';
import { AuthProvider } from './context/AuthContext';

export const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </AuthProvider>
  );
};
