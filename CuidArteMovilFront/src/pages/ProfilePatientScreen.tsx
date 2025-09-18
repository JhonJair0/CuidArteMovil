import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ProfilePatientStyles } from '../theme/styleProfilePatient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationStack';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { RouteProp } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../../config/api';
import { RegisterPatientStyles } from '../theme/styleRegisterPatient';
import { pick, types } from '@react-native-documents/picker';
import axios from 'axios';

type NavProps = StackNavigationProp<RootStackParams, 'ProfilePatientScreen'>;

type ProfilePatientScreenRouteProp = RouteProp<
  RootStackParams,
  'ProfilePatientScreen'
>;
type Props = {
  route: ProfilePatientScreenRouteProp;
};

export const ProfilePatientScreen = ({ route }: Props) => {
  const navigation = useNavigation<NavProps>();
  const context = useContext(AuthContext);
  //sirve para obtener una nueva imagen y almacenar los datos
  const selectNewPhoto = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      handleChange('fotoPerfil', uri || '');
    }
  };

  if (!context) {
    throw new Error(
      'ProfilePatientScreen debe ser usado dentro de un AuthProvider',
    );
  }
  const { user, loading, setUser } = context;

  const HomePress = () => {
    navigation.navigate('Home');
  };

  const [newDataUser, setNewDataUser] = useState({
    nombre: '',
    correo: '',
    ciudad: '',
    departamento: '',
    cedula: '',
    anosExperiencia: '',
    edad: '',
    direccion: '',
    telefono: '',
    hojaVida: '',
    fotoPerfil: '',
    credenciales: '',
  });

  useEffect(() => {
    if (user) {
      setNewDataUser({
        nombre: user.nombre || '',
        correo: user.correo || '',
        ciudad: user.ciudad || '',
        departamento: user.departamento || '',
        cedula: user.cedula || '',
        anosExperiencia: user.anosExperiencia || '',
        edad: user.edad || '',
        direccion: user.direccion || '',
        telefono: user.telefono || '',
        hojaVida: user.hojaVida || '',
        fotoPerfil: user.fotoPerfil || '',
        credenciales: user.credenciales || '',
      });
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setNewDataUser({ ...newDataUser, [field]: value });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando perfil...</Text>
      </View>
    );
  }
  const handleUpdateData = async () => {
    try {
      const formData = new FormData();

      // Agregar todos los campos de texto
      Object.keys(newDataUser).forEach(key => {
        if (
          key !== 'fotoPerfil' &&
          key !== 'hojaVida' &&
          key !== 'credenciales'
        ) {
          formData.append(key, (newDataUser as any)[key]);
        }
      });

      // Agregar archivos solo si cambiaron
      if (
        newDataUser.fotoPerfil &&
        newDataUser.fotoPerfil !== user?.fotoPerfil
      ) {
        formData.append('fotoPerfil', {
          uri: newDataUser.fotoPerfil,
          type: 'image/png',
          name: 'fotoPerfil.png',
        } as any);
      }

      if (newDataUser.hojaVida && newDataUser.hojaVida !== user?.hojaVida) {
        formData.append('hojaVida', {
          uri: newDataUser.hojaVida,
          type: 'application/pdf',
          name: 'hojaVida.pdf',
        } as any);
      }

      if (
        newDataUser.credenciales &&
        newDataUser.credenciales !== user?.credenciales
      ) {
        formData.append('credenciales', {
          uri: newDataUser.credenciales,
          type: 'application/pdf',
          name: 'credenciales.pdf',
        } as any);
      }

      // 🔥 Aquí usamos axios
      const response = await axios.post(
        `${BASE_URL}/api/updateUser/${user?.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      // axios ya da directamente los datos en response.data
      setUser(response.data);
      Alert.alert('Éxito', 'Usuario actualizado correctamente');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  const selectNewPdf = async (field: 'hojaVida' | 'credenciales') => {
    try {
      const res = await pick({
        type: [types.pdf],
      });

      if (res && res[0]) {
        handleChange(field, res[0].uri);
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        if (error.code === 'CANCEL') {
          console.log('Selección de documento cancelada');
        } else {
          console.log('Error al seleccionar documento:', error);
        }
      }
    }
  };

  return (
    <View style={ProfilePatientStyles.body}>
      <View style={ProfilePatientStyles.content}>
        <Pressable
          onPress={HomePress}
          style={ProfilePatientStyles.leftArrowContainer}
        >
          <Image
            source={require('../icon/flecha-izquierda.png')}
            style={ProfilePatientStyles.leftArrow}
            resizeMode="contain"
          />
        </Pressable>

        <Image
          source={{ uri: user?.fotoPerfil }}
          style={ProfilePatientStyles.Logo}
          resizeMode="cover"
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={ProfilePatientStyles.conteiner}>
            <View>
              <Text>Correo:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={newDataUser.correo}
                onChangeText={text => handleChange('correo', text)}
              ></TextInput>
            </View>
            <View>
              <Text>Ciudad:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={newDataUser.ciudad}
                onChangeText={text => handleChange('ciudad', text)}
              ></TextInput>
            </View>
            <View>
              <Text>Departamento:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={newDataUser.departamento}
                onChangeText={text => handleChange('departamento', text)}
              ></TextInput>
            </View>
            <View>
              <Text>Cedula:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={newDataUser.cedula}
                onChangeText={text => handleChange('cedula', text)}
              ></TextInput>
            </View>
            {user?.idRol === 3 && (
              <View>
                <Text>Hoja de vida:</Text>
                <Pressable
                  onPress={() => selectNewPdf('hojaVida')}
                  style={RegisterPatientStyles.input}
                >
                  <Image
                    source={require('../icon/upload.png')}
                    style={[RegisterPatientStyles.upload]}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            )}

            {user?.idRol === 3 && (
              <View>
                <Text>Años de experiencia</Text>
                <TextInput
                  style={ProfilePatientStyles.input}
                  value={user?.anosExperiencia}
                  onChangeText={text => handleChange('anosExperiencia', text)}
                ></TextInput>
              </View>
            )}
          </View>
          <View style={ProfilePatientStyles.conteiner}>
            <View>
              <Text>Nombre:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={newDataUser.nombre}
                onChangeText={text => handleChange('nombre', text)}
              ></TextInput>
            </View>
            {user?.idRol === 3 && (
              <View>
                <Text>Edad:</Text>
                <TextInput
                  style={ProfilePatientStyles.input}
                  value={newDataUser.edad}
                  onChangeText={text => handleChange('edad', text)}
                ></TextInput>
              </View>
            )}
            <View>
              <Text>Dirección:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={newDataUser.direccion}
                onChangeText={text => handleChange('direccion', text)}
              ></TextInput>
            </View>
            <View>
              <Text>Telefono:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={newDataUser.telefono}
                onChangeText={text => handleChange('telefono', text)}
              ></TextInput>
            </View>
            <View>
              <Text>Foto de perfil</Text>
              <Pressable
                onPress={selectNewPhoto}
                style={[RegisterPatientStyles.input, { width: '100%' }]}
              >
                <Image
                  source={require('../icon/upload.png')}
                  style={RegisterPatientStyles.upload}
                  resizeMode="contain"
                />
              </Pressable>
            </View>

            {user?.idRol === 3 && (
              <View>
                <Text>Credenciales:</Text>
                <Pressable
                  onPress={() => selectNewPdf('credenciales')}
                  style={RegisterPatientStyles.input}
                >
                  <Image
                    source={require('../icon/upload.png')}
                    style={[RegisterPatientStyles.upload]}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            )}
          </View>
        </View>

        <View style={ProfilePatientStyles.contentbutton}>
          <Pressable
            style={ProfilePatientStyles.button}
            onPress={handleUpdateData}
          >
            <Text style={ProfilePatientStyles.editText}>Editar Perfil</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
