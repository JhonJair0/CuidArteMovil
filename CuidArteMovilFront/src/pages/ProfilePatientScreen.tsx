import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ProfilePatientStyles } from '../theme/styleProfilePatient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationStack';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { RouteProp } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

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

  if (!context) {
    throw new Error(
      'ProfilePatientScreen debe ser usado dentro de un AuthProvider',
    );
  }
  const { user, loading } = context;

  const HomePress = () => {
    navigation.navigate('Home');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  const imageSource =
    user?.fotoPerfil && user.fotoPerfil.length > 0
      ? { uri: user.fotoPerfil }
      : require('../img/Logo-cuidarte.png');

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
          source={imageSource}
          style={ProfilePatientStyles.Logo}
          resizeMode="cover"
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={ProfilePatientStyles.conteiner}>
            <View>
              <Text>Correo:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={user?.correo}
              ></TextInput>
            </View>
            <View>
              <Text>Ciudad:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={user?.ciudad}
              ></TextInput>
            </View>
            <View>
              <Text>Departamento:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={user?.departamento}
              ></TextInput>
            </View>
            <View>
              <Text>Cedula:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={user?.cedula}
              ></TextInput>
            </View>
            {user?.idRol === 3 && (
              <View>
                <Text>Hoja de vida:</Text>
                <TextInput
                  style={ProfilePatientStyles.input}
                  value={user?.hojaVida}
                ></TextInput>
              </View>
            )}

            {user?.idRol === 3 && (
              <View>
                <Text>Años de experiencia</Text>
                <TextInput
                  style={ProfilePatientStyles.input}
                  value={user?.anosExperiencia}
                ></TextInput>
              </View>
            )}
          </View>
          <View style={ProfilePatientStyles.conteiner}>
            <View>
              <Text>Nombre:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={user?.nombre}
              ></TextInput>
            </View>
            {user?.idRol === 3 && (
              <View>
                <Text>Edad:</Text>
                <TextInput
                  style={ProfilePatientStyles.input}
                  value={user?.edad}
                ></TextInput>
              </View>
            )}
            <View>
              <Text>Dirección:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={user?.direccion}
              ></TextInput>
            </View>
            <View>
              <Text>Telefono:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={user?.telefono}
              ></TextInput>
            </View>
            <View>
              <Text>Foto de perfil:</Text>
              <TextInput
                style={ProfilePatientStyles.input}
                value={user?.fotoPerfil}
              ></TextInput>
            </View>

            {user?.idRol === 3 && (
              <View>
                <Text>Credenciales:</Text>
                <TextInput
                  style={ProfilePatientStyles.input}
                  value={user?.credenciales}
                ></TextInput>
              </View>
            )}
          </View>
        </View>

        <View style={ProfilePatientStyles.contentbutton}>
          <Pressable style={ProfilePatientStyles.button}>
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
