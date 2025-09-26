import React, { useContext, useState } from 'react';
import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import { navBarStyles } from '../theme/styleNavBar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/NavigationStack';
import { colors } from '../theme/styleHome';
import { AuthContext } from '../context/AuthContext';

type NavProps = StackNavigationProp<RootStackParams, 'Login'>;

export const NavBar = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('NavBar debe ser usado dentro de un AuthProvider');
  }

  const { isLoggedIn, user, logout, loading } = context;

  const navigation = useNavigation<NavProps>();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  if (loading) {
    return (
      <View style={navBarStyles.navBar}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const LoginPress = () => {
    navigation.navigate('Login');
  };

  const HomePress = () => {
    navigation.navigate('Home');
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const RegisterPacientePress = () => {
    console.log('RegisterPatient');
    navigation.navigate('RegisterPatient');
  };

  const RegisterCuidadorPress = () => {
    console.log('RegisterCaregiver');
    navigation.navigate('RegisterCaregiver');
  };

  const ProfilePatientPress = () => {
    console.log('RegisterCaregiver');
    navigation.navigate('ProfilePatientScreen');
  };

  const ProfileCarevigerPress = () => {
    console.log('RegisterCaregiver');
    navigation.navigate('ProfileCarevigerScreen');
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <View style={navBarStyles.navBar}>
      <Pressable onPress={HomePress}>
        <Image
          source={require('../img/Logo-cuidarte.png')}
          style={navBarStyles.imgLogo}
          resizeMode="contain"
        />
      </Pressable>
      {!isLoggedIn && (
        <>
          <Pressable style={navBarStyles.button} onPress={LoginPress}>
            <Text style={navBarStyles.buttonText}>Iniciar sesión</Text>
          </Pressable>

          <Pressable style={navBarStyles.button} onPress={toggleDropdown}>
            <Text style={navBarStyles.buttonText}>Crear cuenta</Text>
          </Pressable>
        </>
      )}

      {isLoggedIn && (
        <>
          <Text style={navBarStyles.text}>
            {user ? user.nombre : 'Usuario'}
          </Text>
          <Pressable style={navBarStyles.button} onPress={logout}>
            <Text style={navBarStyles.buttonText}>Cerrar sesión</Text>
          </Pressable>
        </>
      )}

      {isDropdownVisible && (
        <View style={navBarStyles.dropdownMenu}>
          <Pressable
            style={navBarStyles.dropdownButton}
            onPress={RegisterCuidadorPress}
          >
            <Text style={navBarStyles.dropdownText}>Cuidador</Text>
          </Pressable>
          <Pressable
            style={navBarStyles.dropdownButton}
            onPress={RegisterPacientePress}
          >
            <Text style={navBarStyles.dropdownText}>Paciente</Text>
          </Pressable>
        </View>
      )}

      <TouchableOpacity onPress={toggleSidebar}>
        <Image
          source={require('../icon/menu.png')}
          style={navBarStyles.imgMenu}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {isSidebarVisible && (
        <View style={navBarStyles.sidebar}>
          <TouchableOpacity onPress={closeSidebar}>
            <Image
              source={require('../icon/X.png')}
              style={navBarStyles.cerrarSidebar}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text
            style={[
              {
                fontSize: 25,
                color: colors.botton,
                marginBottom: 30,
                borderTopWidth: 1,
                borderTopColor: 'black',
                paddingTop: 10,
              },
            ]}
          >
            Menú
          </Text>

          {isLoggedIn && (
            <>
              <Pressable
                onPress={ProfilePatientPress}
                style={navBarStyles.sidebarItem}
              >
                <Image
                  source={require('../icon/persona.png')}
                  style={navBarStyles.sidebarItemIcon}
                  resizeMode="contain"
                />
                <Text style={navBarStyles.sidebarText}>Perfil</Text>
              </Pressable>
              <Pressable onPress={logout} style={navBarStyles.sidebarItem}>
                <Image
                  source={require('../icon/X.png')}
                  style={navBarStyles.sidebarItemIcon}
                  resizeMode="contain"
                />
                <Text style={navBarStyles.sidebarText}>Cerrar Sesión</Text>
              </Pressable>
              <Pressable
                onPress={HomePress}
                style={[
                  navBarStyles.sidebarItem,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    paddingBottom: 10,
                  },
                ]}
              >
                <Image
                  source={require('../icon/flecha-izquierda.png')}
                  style={navBarStyles.sidebarItemIcon}
                  resizeMode="contain"
                />
                <Text style={navBarStyles.sidebarText}>Inicio</Text>
              </Pressable>

              <Pressable
                onPress={ProfileCarevigerPress}
                style={[navBarStyles.sidebarItem, { top: 10 }]}
              >
                <Image
                  source={require('../icon/ajustes.png')}
                  style={navBarStyles.sidebarItemIcon}
                  resizeMode="contain"
                />
                <Text style={navBarStyles.sidebarText}>Configuración</Text>
              </Pressable>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Pressable onPress={HomePress} style={navBarStyles.sidebarItem}>
                <Text style={navBarStyles.sidebarText}>Inicio</Text>
              </Pressable>
              <Pressable
                style={navBarStyles.sidebarItem}
                onPress={RegisterPacientePress}
              >
                <Text style={navBarStyles.sidebarText}>Registrar paciente</Text>
              </Pressable>

              <Pressable
                style={navBarStyles.sidebarItem}
                onPress={RegisterCuidadorPress}
              >
                <Text style={navBarStyles.sidebarText}>Registrar Cuidador</Text>
              </Pressable>
              {/* Aquí puedes añadir otras opciones públicas */}
            </>
          )}
        </View>
      )}
    </View>
  );
};
