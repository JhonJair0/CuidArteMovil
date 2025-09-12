import React, { useState } from 'react';
import { View, Text, Image, Pressable, TextInput, Alert } from 'react-native';
import { RegisterPatientStyles } from '../theme/styleRegisterPatient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationStack';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

type NavProps = StackNavigationProp<RootStackParams, 'RegisterPatient'>;

export const RegisterPatientScreen = () => {
  const navigation = useNavigation<NavProps>();

  // Estados separados para cada campo
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    idCard: '',
    department: '',
    city: '',
    password: '',
  });
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData, // Mantenemos los valores de los otros campos
      [name]: value, // Actualizamos solo el campo que cambió
    });
  };

  const HomePress = () => {
    navigation.navigate('Home');
  };

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          console.log('El usuario canceló la selección');
        } else if (response.errorCode) {
          console.log('Error: ', response.errorMessage);
        } else {
          const uri = response.assets?.[0]?.uri ?? null;
          setImageUri(uri); // Guarda la URI de la imagen seleccionada
        }
      },
    );
  };

  const handleRegister = async () => {
    const dataToSend = new FormData();

    // Añadimos todos los campos del objeto al FormData
    Object.keys(formData).forEach(key => {
      dataToSend.append(key, formData[key as keyof typeof formData]);
    });

    if (imageUri) {
      dataToSend.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profile_image.jpg',
      });
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/insert`, dataToSend, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      Alert.alert('Éxito', '¡Paciente registrado correctamente!');
      navigation.navigate('Home');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error del servidor:', error.response.data);
          Alert.alert(
            'Error en el servidor',
            'Hubo un error al procesar tu solicitud. Por favor, revisa tus datos.',
          );
        } else if (error.request) {
          // Si la petición se hizo pero no se recibió respuesta (ej. el servidor no está corriendo)
          console.log('No se recibió respuesta del servidor:', error.request);
          Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
      } else {
        const errorMessage =
          error instanceof Error ? error.message : 'Error desconocido';
        console.log('algo paso', errorMessage);
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      }
    }
  };

  return (
    <View style={RegisterPatientStyles.bodyRegister}>
      <View style={RegisterPatientStyles.contentRegister}>
        <Image
          source={require('../img/Logo-cuidarte.png')}
          style={RegisterPatientStyles.LogoRegister}
          resizeMode="contain"
        />

        <Pressable
          onPress={HomePress}
          style={RegisterPatientStyles.leftArrowContainer}
        >
          <Image
            source={require('../icon/flecha-izquierda.png')}
            style={RegisterPatientStyles.leftArrow}
            resizeMode="contain"
          />
        </Pressable>

        <View style={RegisterPatientStyles.inputContainer}>
          <View style={RegisterPatientStyles.inputColumn}>
            <Text>Nombre completo</Text>
            <TextInput
              style={RegisterPatientStyles.input}
              value={formData.fullName}
              onChangeText={text => handleChange('fullName', text)}
            />

            <Text>Teléfono</Text>
            <TextInput
              style={RegisterPatientStyles.input}
              value={formData.phone}
              onChangeText={text => handleChange('phone', text)}
            />

            <Text>Correo electrónico</Text>
            <TextInput
              style={RegisterPatientStyles.input}
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
            />

            <Text>Dirección</Text>
            <TextInput
              style={RegisterPatientStyles.input}
              value={formData.address}
              onChangeText={text => handleChange('address', text)}
            />
          </View>

          <View style={RegisterPatientStyles.inputColumn}>
            <Text>Cédula</Text>
            <TextInput
              style={RegisterPatientStyles.input}
              value={formData.idCard}
              onChangeText={text => handleChange('idCard', text)}
            />

            <Text>Departamento</Text>
            <TextInput
              style={RegisterPatientStyles.input}
              value={formData.department}
              onChangeText={text => handleChange('department', text)}
            />

            <Text>Ciudad</Text>
            <TextInput
              style={RegisterPatientStyles.input}
              value={formData.city}
              onChangeText={text => handleChange('city', text)}
            />

            <Text>Contraseña</Text>
            <TextInput
              style={RegisterPatientStyles.input}
              secureTextEntry
              value={formData.password}
              onChangeText={text => handleChange('password', text)}
            />
          </View>

          <View>
            <Text>Foto de perfil</Text>
            <Pressable
              onPress={handleSelectImage}
              style={[RegisterPatientStyles.input, { width: '370%' }]}
            >
              <Image
                source={require('../icon/upload.png')}
                style={RegisterPatientStyles.upload}
                resizeMode="contain"
              />
            </Pressable>

            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={RegisterPatientStyles.imageSelect}
                resizeMode="cover"
              />
            )}
          </View>

          <View style={RegisterPatientStyles.contentbuttonRegister}>
            <Pressable
              style={RegisterPatientStyles.buttonRegister}
              onPress={handleRegister}
            >
              <Text style={RegisterPatientStyles.RegisterText}>
                Registrar datos
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
