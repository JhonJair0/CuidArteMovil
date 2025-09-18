import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../theme/styleHome';
import { loginStyles } from '../theme/styleLogin';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationStack';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

type NavProps = StackNavigationProp<RootStackParams, 'Login'>;

export const LoginScreen = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('NavBar debe ser usado dentro de un AuthProvider');
  }

  const navigation = useNavigation<NavProps>();

  const { login } = context;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const HomePress = () => {
    navigation.navigate('Home');
  };

  const RecoverPasswordPress = () => {
    navigation.navigate('RecoverPassword');
  };

  const handleLogin = async () => {
    const success = await login(email, password); // Llamar a la función del contexto
    if (success) {
      navigation.navigate('Home');
      Alert.alert('Inicio de sesión exitoso');
    } else {
      Alert.alert('Error', 'Correo o contraseña equivocados.');
    }
  };

  return (
    <View
      style={[
        styles.fondo,
        { flex: 1, justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <View style={loginStyles.contentLogin}>
        <Image
          source={require('../img/Logo-cuidarte.png')}
          style={loginStyles.LogoLogin}
          resizeMode="contain"
        />

        <Pressable onPress={HomePress} style={loginStyles.leftArrowContainer}>
          <Image
            source={require('../icon/flecha-izquierda.png')}
            style={loginStyles.leftArrow}
            resizeMode="contain"
          />
        </Pressable>

        <Text>Usuario de acceso</Text>
        <TextInput
          style={loginStyles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Correo"
          placeholderTextColor="#888"
        />

        <Text>Contraseña</Text>
        <View style={loginStyles.passwordContainer}>
          <TextInput
            style={loginStyles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#666"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        <Pressable onPress={handleLogin} style={loginStyles.buttonLogin}>
          <Text style={loginStyles.loginText}>Iniciar sesión</Text>
        </Pressable>

        <Pressable>
          <Text onPress={RecoverPasswordPress} style={loginStyles.linkText}>
            ¿Olvidaste la contraseña?
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
