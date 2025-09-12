import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';
import { styles } from '../theme/styleHome';
import { loginStyles } from '../theme/styleLogin';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationStack';
import { AuthContext } from '../context/AuthContext';

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
        />

        <Text>Contraseña</Text>

        <TextInput
          style={loginStyles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

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
