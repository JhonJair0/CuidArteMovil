import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { RegisterCarevigerStyles } from '../theme/styleRegisterCareviger';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationStack';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import axios from 'axios';
import { BASE_URL } from '../../config/api';
import { Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type NavProps = StackNavigationProp<RootStackParams, 'RegisterCaregiver'>;

type PickedFile = {
  uri: string | null;
  name: string | null;
  type?: string | null;
  size?: number;
};

export const RegisterCarevigerScreen = () => {
  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData, // Mantenemos los valores de los otros campos
      [name]: value, // Actualizamos solo el campo que cambió
    });
  };
  const navigation = useNavigation<NavProps>();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    idCard: '',
    department: '',
    tipoCuidador: '',
    city: '',
    password: '',
    age: '',
    experience: '',
    studies: '',
    description: '',
  });
  const [certificate, setCertificate] = useState<DocumentPickerResponse | null>(
    null,
  );
  const [sheetLife, setSheetLife] = useState<DocumentPickerResponse | null>(
    null,
  );
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [showSecondForm, setShowSecondForm] = useState(false);

  const HomePress = () => {
    navigation.navigate('Home');
  };

  const handleSelectPdf = async (fileType: string) => {
    try {
      const res = await pick({
        type: [types.pdf],

        multiple: false,
      });

      const selectedFile = res[0];

      if (fileType === 'sheetLife') {
        setSheetLife(selectedFile);
      } else if (fileType === 'certificate') {
        setCertificate(selectedFile);
      }
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'code' in err) {
        if (err.code === 'CANCEL') {
          console.log('Selección de documento cancelada');
        } else {
          console.log('Error al seleccionar documento:', err);
        }
      }
    }
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
        console.log('Respuesta de la galería:', response);

        if (response.didCancel) {
          console.log('El usuario canceló la selección');
        } else if (response.errorCode) {
          console.log('Error: ', response.errorMessage);
        } else {
          const uri = response.assets?.[0]?.uri ?? null;
          setImageUri(uri);
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
        name: imageUri.split('/').pop() || 'profile_image.jpg',
      });
    }
    if (sheetLife) {
      dataToSend.append('sheetLife', {
        uri: sheetLife.uri,
        type: sheetLife.type || 'application/pdf',
        name: sheetLife.name,
      });
    }
    if (certificate) {
      dataToSend.append('certificate', {
        uri: certificate.uri,
        type: certificate.type || 'application/pdf',
        name: certificate.name,
      });
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/insertCaregiver`,
        dataToSend,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      );
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

  const handleContinue = () => {
    setShowSecondForm(true);
  };

  return (
    <View style={RegisterCarevigerStyles.bodyRegister}>
      <View
        style={[
          RegisterCarevigerStyles.contentRegister,
          { height: showSecondForm ? 570 : 670 },
        ]}
      >
        {/* Logo */}
        <Image
          source={require('../img/Logo-cuidarte.png')}
          style={RegisterCarevigerStyles.LogoRegister}
          resizeMode="contain"
        />

        <Pressable
          onPress={HomePress}
          style={RegisterCarevigerStyles.leftArrowContainer}
        >
          <Image
            source={require('../icon/flecha-izquierda.png')}
            style={RegisterCarevigerStyles.leftArrow}
            resizeMode="contain"
          />
        </Pressable>

        {!showSecondForm && (
          <>
            <Text>Foto de perfil</Text>
            <Pressable
              onPress={handleSelectImage}
              style={RegisterCarevigerStyles.input}
            >
              <Image
                source={require('../icon/upload.png')}
                style={RegisterCarevigerStyles.upload}
                resizeMode="contain"
              />
            </Pressable>

            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={RegisterCarevigerStyles.imageSelect}
                resizeMode="cover"
              />
            )}
          </>
        )}

        {/* Primer formulario */}
        {!showSecondForm && (
          <View style={RegisterCarevigerStyles.inputContainer}>
            <View style={RegisterCarevigerStyles.inputColumn}>
              <Text>Nombre completo</Text>
              <TextInput
                style={RegisterCarevigerStyles.input}
                value={formData.fullName}
                onChangeText={text => handleChange('fullName', text)}
              />

              <Text>Teléfono</Text>
              <TextInput
                style={RegisterCarevigerStyles.input}
                value={formData.phone}
                onChangeText={text => handleChange('phone', text)}
              />

              <Text>Correo electrónico</Text>
              <TextInput
                style={RegisterCarevigerStyles.input}
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
              />

              <Text>Dirección</Text>
              <TextInput
                style={RegisterCarevigerStyles.input}
                value={formData.address}
                onChangeText={text => handleChange('address', text)}
              />
            </View>

            <View style={RegisterCarevigerStyles.inputColumn}>
              <Text>Cédula</Text>
              <TextInput
                style={RegisterCarevigerStyles.input}
                value={formData.idCard}
                onChangeText={text => handleChange('idCard', text)}
              />

              <Text>Departamento</Text>
              <TextInput
                style={RegisterCarevigerStyles.input}
                value={formData.department}
                onChangeText={text => handleChange('department', text)}
              />

              <Text>Ciudad</Text>
              <TextInput
                style={RegisterCarevigerStyles.input}
                value={formData.city}
                onChangeText={text => handleChange('city', text)}
              />
              <Text>Contraseña</Text>
              <TextInput
                style={RegisterCarevigerStyles.input}
                secureTextEntry
                value={formData.password}
                onChangeText={text => handleChange('password', text)}
              />
            </View>
            <View style={{ width: '100%' }}>
              <Text>Tipo de Cuidador </Text>
              <View style={RegisterCarevigerStyles.input}>
                <Picker
                  selectedValue={formData.tipoCuidador}
                  onValueChange={(itemValue, itemIndex) =>
                    handleChange('tipoCuidador', itemValue)
                  }
                >
                  <Picker.Item label="Seleccione un tipo..." value="" />
                  <Picker.Item label="Mascotas" value="Mascotas" />
                  <Picker.Item label="Infantes" value="Infantes" />
                  <Picker.Item label="Adultos" value="Adultos" />
                </Picker>
              </View>
            </View>
          </View>
        )}

        {/* Segundo formulario */}
        {showSecondForm && (
          <View style={RegisterCarevigerStyles.inputContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <View style={{ width: '48%' }}>
                <Text>Edad</Text>
                <TextInput
                  style={RegisterCarevigerStyles.input}
                  value={formData.age}
                  onChangeText={text => handleChange('age', text)}
                />
              </View>

              <View style={{ width: '48%' }}>
                <Text>Años de experiencia</Text>
                <TextInput
                  style={RegisterCarevigerStyles.input}
                  value={formData.experience}
                  onChangeText={text => handleChange('experience', text)}
                />
              </View>
            </View>

            {/* Segunda fila de campos */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <View style={{ width: '48%' }}>
                <Text>Estudios realizados</Text>
                <TextInput
                  style={RegisterCarevigerStyles.input}
                  value={formData.studies}
                  onChangeText={text => handleChange('studies', text)}
                />
              </View>

              <View style={{ width: '48%' }}>
                <Text>Descripción</Text>
                <TextInput
                  style={RegisterCarevigerStyles.input}
                  value={formData.description}
                  onChangeText={text => handleChange('description', text)}
                />
              </View>
            </View>

            <View style={{ width: '100%' }}>
              <Text>Adjuntar hoja de vida (PDF)</Text>
              <Pressable
                onPress={() => handleSelectPdf('sheetLife')}
                style={RegisterCarevigerStyles.input}
              >
                <Image
                  source={require('../icon/upload.png')}
                  style={[RegisterCarevigerStyles.upload]}
                  resizeMode="contain"
                />
              </Pressable>

              <Text>Adjuntar diplomas o certificados</Text>

              <Pressable
                onPress={() => handleSelectPdf('certificate')}
                style={RegisterCarevigerStyles.input}
              >
                <Image
                  source={require('../icon/upload.png')}
                  style={[RegisterCarevigerStyles.upload]}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          </View>
        )}

        {/* Foto de perfil */}

        {/* Solo mostrar el botón de continuar en el primer formulario */}
        {!showSecondForm && (
          <View style={RegisterCarevigerStyles.contentbuttonRegister}>
            <Pressable
              onPress={handleContinue}
              style={RegisterCarevigerStyles.buttonRegister}
            >
              <Text style={RegisterCarevigerStyles.RegisterText}>
                Continuar
              </Text>
            </Pressable>
          </View>
        )}

        {/* Mostrar botón de "Registrar datos" cuando se está en el segundo formulario */}
        {showSecondForm && (
          <View style={RegisterCarevigerStyles.contentbuttonRegister}>
            <Pressable
              onPress={handleRegister}
              style={RegisterCarevigerStyles.buttonRegister}
            >
              <Text style={RegisterCarevigerStyles.RegisterText}>
                Registrar datos
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};
