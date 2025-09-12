import React, { useState } from 'react';
import { View, Text, Image, Pressable } from "react-native"
import { RecoverPasswordStyles } from "../theme/styleRecoverPassword"
import { TextInput } from "react-native-gesture-handler"
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationStack';

type NavProps = StackNavigationProp<RootStackParams, 'RegisterCaregiver'>;

export const RecoverPassword = () => {
    const navigation = useNavigation<NavProps>();
    const [email, setEmail] = useState('');

    const LoginPress = () => {
        navigation.navigate('Login');
    };
    
  return (
    <View style={RecoverPasswordStyles.body}>
      <View style={RecoverPasswordStyles.content}>
        <Image
            source={require('../img/Logo-cuidarte.png')}
            style={RecoverPasswordStyles.Logo}
            resizeMode="contain"
        />

        <Pressable
            onPress={LoginPress}
            style={RecoverPasswordStyles.leftArrowContainer}
        >
            <Image
            source={require('../icon/flecha-izquierda.png')}
            style={RecoverPasswordStyles.leftArrow}
            resizeMode="contain"
            />
        </Pressable>

        <View>
            <Text>Correo electrónico</Text>
            <TextInput
            style={RecoverPasswordStyles.input}
            value={email}
            onChangeText={setEmail}
            />
        </View>

        <View style={RecoverPasswordStyles.contentbutton}>
            <Pressable style={RecoverPasswordStyles.buttonSend}>
                <Text style={RecoverPasswordStyles.sendText}>Enviar código</Text>
            </Pressable>
        </View>
      </View>
    </View>
  )
}

